const createError = require("http-errors");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");
const User = require("../models/users.model");

async function login(email, password) {
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new createError(401, "Invalid Data");
    }
  
    const isValidPassword = bcrypt.verify(user.password, password);
  
    if (!isValidPassword) {
      throw new createError(401, "Invalid Data");
    }
  
    return jwt.sign({ id: user._id });
  }
  
  module.exports = {
    login,
  };
  