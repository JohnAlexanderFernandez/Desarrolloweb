const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB (local o Atlas)
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/miBaseDeDatos", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar:", err));

// Definir un esquema y modelo en MongoDB
const ItemSchema = new mongoose.Schema({ nombre: String });
const Item = mongoose.model("Item", ItemSchema);

// Ruta para obtener todos los datos
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Ruta para agregar un nuevo dato
app.post("/api/items", async (req, res) => {
  const nuevoItem = new Item({ nombre: req.body.nombre });
  await nuevoItem.save();
  res.json({ mensaje: "Item agregado" });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

