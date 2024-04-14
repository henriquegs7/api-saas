const router = require("express").Router();
const jwt = require("jsonwebtoken");
const LoginController = require("../controllers/loginController");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

router.post("/auth/login", LoginController.login);
router.get("/user/:id", checkToken, LoginController.getUserById);

module.exports = router;