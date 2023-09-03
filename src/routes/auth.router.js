const express = require("express");
const authUsecase = require("../usecases/auth.usecase");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authUsecase.login(email, password);
    res.json({ message: "You are connected", data: { token } });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = router;
