const sequelize = require("../db-connection.js");
const { setResponse, setErrorResponse } = require("./response-handler.js");
const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'debug',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: '/var/log/webapp.log',
    }),
  ],
});
exports.connectDB = async (req, res) => {
    logger.info("Attempting to connect to the database...");
    logger.debug("connectDB: Preparing to authenticate database connection.");
    try {
        await sequelize.authenticate();
        logger.debug("connectDB: Database authentication successful.");
        logger.info("Database connection was successful.");
        setResponse(req, res);
    }
    catch (err) {
        logger.debug(`connectDB: Database connection failed with error - ${err.message}`);
        logger.error("Database connection failed", { error: err.message });
        setErrorResponse(err, res);
    }
}
