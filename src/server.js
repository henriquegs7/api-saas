const express = require("express")
const cors = require("cors")
const server = express();

require("dotenv").config()

server.use(express.json())
server.use(cors())

const AuthRegisterUserRoutes = require("./routes/authRegisterUserRouter") 
const LoginRoutes = require("./routes/loginRouter")

server.use(AuthRegisterUserRoutes)
server.use(LoginRoutes)

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})

require("./database/connection")