const express = require("express");
const app = express();
const usersRoutes = require("./authService/routes/userRoutes.js");
const PORT = 3000;

app.use(express.json());

app.use(usersRoutes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));

// genera un auth con express, jwt, bcrypt,  sqlite, sequelize, que acepte solicitudes de cualquir lugar, usa zod como middleware en las rutas. modulariza
