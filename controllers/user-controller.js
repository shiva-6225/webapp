import sequelize from "../db-connection.js";
import { setResponseWithData, setErrorResponse } from "./response-handler.js";
import { register } from "../services/user-service.js";

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await register(user);
        setResponseWithData(newUser, res);
    }
    catch (err) {
        setErrorResponse(err, res);
    }
}