const sequelize = require("../db-connection.js");
const { setResponse, setErrorResponse } = require("./response-handler.js");
const Logger = require('node-json-logger');
const logger = new Logger();
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
