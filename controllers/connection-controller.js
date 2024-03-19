const sequelize = require("../db-connection.js");
const { setResponse, setErrorResponse } = require("./response-handler.js");
const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: '/var/log/webapp/test.log',
    }),
  ],
});
exports.connectDB = async (req, res) => {
    logger.info("Attempting to connect to the database...");
    try {
        await sequelize.authenticate();
        logger.info("Database connection was successful.");
        setResponse(req, res);
    }
    catch (err) {
        logger.error("Database connection failed", { error: err.message });
        setErrorResponse(err, res);
    }
}
