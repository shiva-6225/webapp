import User from "../models/user.js";
import bcrypt from 'bcrypt';

// function to fetch the user chat
export const register = async (user)=> {
    const {firstname, lastname, username, password} = user;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
        first_name: firstname,
        last_name: lastname,
        username,
        password : hashedPassword
    });
    return newUser;
}
