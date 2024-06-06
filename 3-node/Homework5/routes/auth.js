const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const path = require("path");

const router = express.Router();

router.post("/api/auth/registration", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    res.status(400).send({ error: "Произошла ошибка при регистрации" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Не введены email и/или пароль" }); //пользователь не авторизован
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Пользователь не зарегистрирован или не был найден" }); //пользователь не найден
  }

  if (!user.validatePassword(password)) {
    return res.status(401).json({ message: "Неправильный логин и/или пароль" });
  }

  const plainUser = user.toObject();
  delete plainUser.password;

  res.status(200).json({
    ...plainUser,
    token: jwt.sign(plainUser, process.env.JWT_SIFN_KEY),
  });
});

module.exports = router;
