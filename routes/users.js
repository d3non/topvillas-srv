const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Bcrypt = require("bcryptjs");
const usersStore = require("../store/users");
const db = require("../models/user");
const validateWith = require("../middleware/validation");

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), async (req, res) => {
  let { name, email, password } = req.body;

  if (await db.findOne({ email: email }).exec())
    return res
      .status(400)
      .send({ error: "Un usuario con el correo ingresado ya existe" });

  //Hash password before persistance
  password = Bcrypt.hashSync(password, 10);
  const user = { name, email, password };

  //Save user
  try {
    var result = await db.create(user);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", (req, res) => {
  res.send(usersStore.getUsers());
});

module.exports = router;
