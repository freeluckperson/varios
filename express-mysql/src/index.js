require("dotenv").config(); // Cargar variables de entorno desde .env
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { z } = require("zod");
const morgan = require("morgan");
const cors = require("cors");

// Configurar la base de datos usando Sequelize y las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

// Crear una instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Definir el modelo de Producto en Sequelize
const Producto = sequelize.define(
  "Producto",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Esquema Zod para validar los datos
const productoSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  precio: z.number().min(0, "El precio no puede ser negativo"),
});

// Middleware de validación Zod
const validarProducto = (req, res, next) => {
  try {
    // Validar los datos usando Zod
    req.body = productoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error); // Para manejar otros errores
  }
};

// Ruta para crear un producto
app.post("/productos", validarProducto, async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: error.message });
  }
});

// Ruta para obtener todos los productos
app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los productos",
        error: error.message,
      });
  }
});

// Ruta para obtener un producto por ID
app.get("/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el producto", error: error.message });
  }
});

// Ruta para actualizar un producto
app.put("/productos/:id", validarProducto, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await producto.update(req.body);
    res.status(200).json(producto);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el producto",
        error: error.message,
      });
  }
});

// Ruta para eliminar un producto
app.delete("/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await producto.destroy();
    res.status(204).send(); // Respuesta vacía para indicar éxito
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: error.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente");
    await sequelize.sync();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
});
