const express = require("express");
const app = express();
const usersRoutes = require("./authService/routes/userRoutes.js");

app.use(express.json());

app.use(usersRoutes);

app.listen(3000, () => console.log("Servidor en puerto 3000"));

// genera un auth con express, jwt, bcrypt,  sqlite, sequelize, que acepte solicitudes de cualquir lugar, usa zod como middleware en las rutas. modulariza
