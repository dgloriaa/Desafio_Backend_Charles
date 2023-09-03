const mongoose = require("mongoose");
const User = require("../models/users.model");
const createError = require("http-errors");
const bcrypt = require("../lib/bcrypt");


async function create(userData) {
    const existingUser = await User.findOne({email: userData.email});

    if (existingUser) {
        throw new createError(412, "Email already exist");
    } 


    const passwordRegex = new RegExp(
    // "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.+]).{12,}$"
    );

    if (!passwordRegex.test(userData.password)) {
        throw new createError(400, "Password too weak");
    }
    
    userData.password = bcrypt.encrypt(userData.password);

    const newUSer = await User.create(userData);
    return newUSer;
}

async function getById(id) {
    if (!mongoose. isValidObjectId(id)) {
        throw new createError(400, "invalid");
    }

    const user = await User.findById(id);

    if(!user) {
        throw new createError(404, "This asshole doesn't exist");
    }

    return user

}


module.exports = {
    create,
    getById
}