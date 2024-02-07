import sequelize from "../db-connection.js";
import { setResponseWithData, setErrorResponse } from "./response-handler.js";
import { register, fetchUser, updateUser } from "../services/user-service.js";

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

export const getUser = async (req, res) => {
    try {
        const user = req.body;
        const userDetails = await fetchUser(user);
        if (userDetails.success) {
            const userInfo = { ...userDetails.user.toJSON() };
            delete userInfo.password;
            setResponseWithData(userInfo, res);
        } else {
            setResponseWithData(userDetails.message, res);
        }
    }
    catch (err) {
        setErrorResponse(err, res);
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        const user = req.body;
        const updateResponse = await updateUser(user);
        if (updateResponse.success) {
            const userInfo = { ...updateResponse.updatedUser.toJSON() };
            delete userInfo.id;
            delete userInfo.account_created;
            delete userInfo.account_updated;
            setResponseWithData(userInfo, res);
        }
        setResponseWithData(updateResponse.message, res);
    }
    catch (err) {
        setErrorResponse(err, res);
    }
}