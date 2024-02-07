import sequelize from "../db-connection.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

export const connectDB = async (req, res) => {
    try {
        await sequelize.authenticate();
        setResponse(req, res);
    }
    catch (err) {
        setErrorResponse(err, res);
    }
}