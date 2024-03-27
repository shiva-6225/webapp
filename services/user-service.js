const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
        filename: 'webapp.log',
    }),
  ],
});
// function to fetch the user chat
exports.register = async (user) => {
    logger.info("Attempting to register a new user", { username: user.username });
    const token = uuidv4();
    const { firstname, lastname, username, password } = user;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
        first_name: firstname,
        last_name: lastname,
        username,
        password: hashedPassword,
        token
    });
    return newUser;
};

exports.fetchUser = async (username, password) => {
    logger.info("Attempting to fetch user", { username });
    const user = await User.findOne({ where: { username } });
    if (user) {
        if(user.isVerified === false){
            logger.warn("User account not verified", { username });
            return { success: false, message: 'User not verified' };
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (passwordMatched) {
            logger.info("Password matched for user", { username });
            return { success: true, user };
        } else {
            logger.warn("Incorrect password for user", { username });
            return { success: false, message: 'Incorrect password' };
        }
    } else {
        logger.warn("User not found during fetch", { username });
        return { success: false, message: 'User not found' };
    }
};

exports.updateUser = async (username, oldPassword, userDetails) => {
    logger.info("Attempting to update user", { username });
    const { firstname, lastname, password } = userDetails;
    const user = await User.findOne({ where: { username } });
    if (user) {
        if(user.isVerified === false){
            logger.warn("User account not verified", { username });
            return { status: 403 };
        }
        const passwordMatched = await bcrypt.compare(oldPassword, user.password);
        if (passwordMatched) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await User.update({ first_name: firstname, last_name: lastname, password: hashedPassword, account_updated: Date.now() }, { where: { username } });
            logger.info("User updated successfully", { username });
            return { status: 204 };
        } else {
            logger.warn("Incorrect old password for user update", { username });
            return { status: 401 };
        }
    } else {
        logger.warn("User not found during update", { username });
        return { status: 404 };
    }
};


exports.verifyEmail = async (token) => {
    logger.info("Attempting to verify email", { token });

    const user = await User.findOne({ where: { token: token } });

    if (!user) {
        logger.warn("User not found during email verification", { token });
        return {  success: false, status: 404, message: "User not found" };
    }

    // Check if the token is expired
    if (process.env.NODE_ENV === "prod" && new Date(user.verificationSentTime.getTime() + 2 * 60000) < new Date()) {
        logger.warn("Token expired for email verification", { username: user.username, token });
        return {  success: false, status: 400, message: "Token expired" };
    }

    // Update the user as verified and clear the token fields
    await User.update(
        { isVerified: true, token: null, verificationSentTime: null },
        { where: { id: user.id } }
    );

    logger.info("Email verified successfully", { username: user.username });
    return { success: true, status: 200, message: "Email verified successfully" };
};