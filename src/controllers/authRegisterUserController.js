const User = require("../models/user");

const bcrypt = require("bcrypt");

module.exports = class AuthRegisterUserController {
  static async init(req, res) {
    res.send({ message: "Bem vindo a nossa API!" });
  }

  static async registerUser(req, res) {
    const { name, birthday, phone, email, password, confirmPassword } = req.body;

    // validations
    if (!name) {
      return res.status(422).json({ msg: "Name is required!" });
    }

    if (!birthday) {
      return res.status(422).json({ msg: "Birthday is required!" });
    }

    if (!phone) {
      return res.status(422).json({ msg: "Phone is required!" });
    }

    if (!email) {
      return res.status(422).json({ msg: "Email is required!" });
    }

    if (!password) {
      return res.status(422).json({ msg: "Password is required!" });
    }

    if (password !== confirmPassword) {
      return res
        .status(422)
        .json({ msg: "Password and confirmation must match!" });
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ msg: "Please use another email!" });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name,
      birthday,
      phone,
      email,
      password: passwordHash,
    });

    try {
      await user.save();

      res.status(201).json({ msg: "Usuário criado com sucesso!", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
    }
  }
};