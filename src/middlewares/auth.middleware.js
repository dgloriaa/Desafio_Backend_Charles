const createError = require("http-errors");
const jwt = require("../lib/jwt");

function auth(request, response, next) {
  const { authorization } = request.headers;

  try {
    if (!authorization) throw new createError(401, "Token required");

    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token);

    if (!payload) throw new createError(401, "Could not verify token");

    next();
  } catch (error) {
    response.status(401).json({ message: "Unauthorized", error: error.message });
  }
}

module.exports = auth;
