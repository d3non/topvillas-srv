const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Bcrypt = require("bcryptjs");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");
const db = require("../models/user");

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), (req, res) => {
  let { name, email, password } = req.body;
  let pwdOri = password;

  if (usersStore.getUserByEmail(email))
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  password = Bcrypt.hashSync(password, 10);
  const user = { name, email, password };

  console.log("Saving USER");

  db.create(user)
    .then((response) => {
      user.password = pwdOri;
      //res.json({ successful: response });
      console.log(user);
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.json({ error: err });
    });

  /*var user = new UserModel(request.body);
  var result = await user.save();
  response.send(result);
  
  const user = { name, email, password };
  usersStore.addUser(user);*/
});

router.get("/", (req, res) => {
  res.send(usersStore.getUsers());
});

module.exports = router;
