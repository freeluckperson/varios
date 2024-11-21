require("dotenv").config(); // Cargar variables de entorno desde .env
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { z } = require("zod");
const morgan = require("morgan");
const cors = require("cors");

// Configurar la base de datos usando Sequelize y las variables de entorno
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false, // Desactivar los logs de SQL
});

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

// Validación de datos con Zod
const productoSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  precio: z.number().min(0, "El precio no puede ser negativo"),
});

// Ruta para crear un producto
app.post("/productos", async (req, res) => {
  try {
    // Validar los datos usando Zod
    const parsedData = productoSchema.parse(req.body);

    // Crear el producto en la base de datos
    const producto = await Producto.create(parsedData);
    res.status(201).json(producto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Manejo de errores de validación con Zod
      return res.status(400).json({ errors: error.errors });
    }
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
    res.status(500).json({
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
app.put("/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Validar los datos usando Zod
    const parsedData = productoSchema.parse(req.body);

    // Actualizar el producto
    await producto.update(parsedData);
    res.status(200).json(producto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({
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
    // Sincronizar los modelos con la base de datos
    await sequelize.sync();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
});
