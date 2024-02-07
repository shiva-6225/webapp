import { setResponseWithData, setErrorResponse } from "./response-handler.js";
import { register, fetchUser, updateUser } from "../services/user-service.js";

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        if (!user || Object.keys(user).length === 0) {
            res.status(400).send();
        } else {
            const newUser = await register(user);
            const data = { ...newUser.toJSON() };
            delete data.password;
            res.status(201).json(data);
        }
    }
    catch (err) {
        setErrorResponse(err, res);
    }
}

export const getUser = async (req, res) => {
    try {
        const user = req.body;
        if (user) {
            const userDetails = await fetchUser(user);
            if (userDetails.success) {
                const userInfo = { ...userDetails.user.toJSON() };
                delete userInfo.password;
                setResponseWithData(userInfo, res);
            } else {
                res.status(204).send() // status code here
            }
        } else {
            res.status(204).send(); // find right status code
        }
    }
    catch (err) {
        setErrorResponse(err, res)
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        const user = req.body;
        if (!user || Object.keys(user).length === 0) {
            res.status(204).send();
        } else {

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

    }
    catch (err) {
        setErrorResponse(err, res);
    }
}