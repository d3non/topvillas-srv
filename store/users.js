const db = require("../models/user");
const users = [
  {
    id: 1,
    name: "Mosh",
    email: "mosh@domain.com",
    password: "12345",
  },
  {
    id: 2,
    name: "John",
    email: "john@domain.com",
    password: "12345",
  },
];

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByEmail = (email) => users.find((user) => user.email === email);

//const addUser = (user) => db.create(user);

const addUser = (user) => {
  db.create(user)
    .then((response) => {
      return response;
      //res.json({ successful: response });
      //res.status(201).send(user);
    })
    .catch((err) => {
      return err;
      //res.json({ error: err });
    });
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  addUser,
};
