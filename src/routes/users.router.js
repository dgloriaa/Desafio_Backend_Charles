const express = require("express");
const users = require("../usecases/users.usecase");
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const newUser = await users.create(req.body);
    res.status(201).json({ message: "User created", data: { user: newUser } });
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ message: "Something went wrong", error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await users.getById(id);
    res.json({ message: `User ${user.id}`, data: { user } });
  } catch (error) {
    res.status(error.status || 500).json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = router;
