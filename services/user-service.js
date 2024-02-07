import User from "../models/user.js";
import bcrypt from 'bcrypt';

// function to fetch the user chat
export const register = async (user) => {
    const { firstname, lastname, username, password } = user;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
        first_name: firstname,
        last_name: lastname,
        username,
        password: hashedPassword
    });
    return newUser;
}

export const fetchUser = async (userDetails) => {
    const { username, password } = userDetails;
    const user = await User.findOne({ where: { username } });
    if (user) {
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (passwordMatched) {
            return { success: true, user };
        } else {
            return { success: false, message: 'Incorrect password' };
        }
    } else {
        return { success: false, message: 'User not found' };
    }
}

export const updateUser = async (userDetails) => {
    const { firstname, lastname, username, password } = userDetails;
    const user = await User.findOne({ where: { username } });
    if (user) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.update({ first_name: firstname, last_name: lastname, username, password: hashedPassword }, { where: { username } });
        const updatedUser = await User.findOne({ where: { username } });
        return { success: true, updatedUser }
    } else {
        return { success: false, message: 'User not found' };
    }
}