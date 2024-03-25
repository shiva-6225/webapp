const { setErrorResponse, setUserAPIResponse, setUserAPIResponseWithData } = require("./response-handler.js");
const { register, fetchUser, updateUser, verificationEmailSent } = require("../services/user-service.js");
const { isEmail } = require('../helpers/email-validation.js');
const jwt = require('jsonwebtoken');
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'debug',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
        filename: 'webapp.log',
    }),
  ],
});

// Function to publish a message to the Pub/Sub topic
async function publishVerificationMessage(email, token) {
    const topicName = 'verify_email';
    const dataBuffer = Buffer.from(JSON.stringify({ email, token }));
    const message = {
        data: dataBuffer,
        // Optionally, you can add attributes here if needed
        // attributes: { key: 'value' },
    };

    try {
        await pubsub.topic(topicName).publishMessage(message);
        logger.info(`Message published to topic ${topicName}`);
    } catch (error) {
        logger.error(`Error publishing message to topic ${topicName}`, { error });
    }
}

exports.createUser = async (req, res) => {
    logger.debug("Entering createUser function");
    logger.info("Creating a new user");
    try {
        const user = req.body;
        logger.debug(`createUser: Received user data - ${JSON.stringify(user)}`);
        if (!user || Object.keys(user).length === 0 || user.username === undefined || user.password === undefined) {
            logger.warn("createUser: Missing user information");
            res.status(400).send();
        } else {
            if (!isEmail(user.username)) {
                logger.warn("createUser: Invalid email format", { username: user.username });
                res.status(400).send();
            }
            const existingUser = await fetchUser(user.username, user.password);
            logger.debug(`createUser: Existing user check - ${JSON.stringify(existingUser)}`);
            if (existingUser.success) {
                logger.warn("createUser: User already exists", { username: user.username });
                res.status(400).send();
            }
            const newUser = await register(user);
            logger.info("createUser: User registered successfully", { username: user.username });
            if (newUser) {
                // Generate a JWT for email verification
                const token = jwt.sign({ email: newUser.username }, 'jwt_secret', { expiresIn: '2m' });
        
                // Publish a message to the Pub/Sub topic
                try {
                    await publishVerificationMessage(newUser.username, token);
                    await verificationEmailSent(newUser.username);
                    logger.info(`Verification email sent status updated for ${newUser.username}`);
                } catch (error) {
                    logger.error(`Failed to send verification message for ${newUser.username}`, { error });
                }

                const data = { ...newUser.toJSON() };
                delete data.password;
                setUserAPIResponseWithData(data, req, res, 201);
            }

        }
    }
    catch (err) {
        logger.error("createUser: Error creating user", { error: err });
        setErrorResponse(err, res);
    }
};

exports.getUser = async (req, res) => {
    logger.debug("Entering getUser function");
    logger.info("Fetching user");
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Basic ')) {
            const base64Credentials = req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            logger.debug(`getUser: Decoded credentials - ${credentials}`);
            const [username, password] = credentials.split(':');
            const userDetails = await fetchUser(username, password);
            logger.debug(`getUser: UserDetails fetched - ${JSON.stringify(userDetails)}`);
            if (userDetails.success) {
                logger.info("getUser: User fetched successfully", { username });
                const userInfo = { ...userDetails.user.toJSON() };
                delete userInfo.password;
                setUserAPIResponseWithData(userInfo, req, res, 200);
            } else {
                logger.warn("getUser: Unauthorized access attempt", { username });
                res.status(401).send();
            }
        } else {
            logger.warn("getUser: Missing authorization header");
            res.status(401).send();
        }
    }
    catch (err) {
        logger.error("getUser: Error fetching user", { error: err });
        setErrorResponse(err, res);
    }
};

exports.updateUserInfo = async (req, res) => {
    logger.debug("Entering updateUserInfo function");
    logger.info("Updating user information");
    try {
        const updateInfo = req.body;
        logger.debug(`updateUserInfo: Received update info - ${JSON.stringify(updateInfo)}`);
        const updateOnly = ['firstname', 'lastname', 'password'];
        if (!updateInfo || Object.keys(updateInfo).length === 0 || Object.keys(updateInfo).some(key => !updateOnly.includes(key))) {
            logger.warn("updateUserInfo: Invalid update request");
            res.status(400).send();
        } else {
            if (req.headers.authorization && req.headers.authorization.startsWith('Basic ')) {
                const base64Credentials = req.headers.authorization.split(' ')[1];
                const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
                const [username, password] = credentials.split(':');
                const updateResponse = await updateUser(username, password, updateInfo);
                logger.info("updateUserInfo: User information updated", { username });
                setUserAPIResponse(req, res, updateResponse.status);
            } else {
                logger.warn("updateUserInfo: Unauthorized update attempt");
                res.status(401).send();
            }
        }
    }
    catch (err) {
        logger.error("updateUserInfo: Error updating user info", { error: err });
        setErrorResponse(err, res);
    }
};
