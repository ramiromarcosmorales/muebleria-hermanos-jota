const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    precio: {
      type: Number,
      required: true,
    },
    imagenUrl: {
      type: String,
    },
    altValue: {
      type: String,
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    dimensiones: {
      type: String,
    },
    capacidad: {
      type: String,
    },
    estilo: {
      type: String,
    },
    material: {
      type: String,
    },
    garantia: {
      type: String,
    },
    origen: {
      type: String,
    },
    peso: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true } // crea automáticamente createdAt y updatedAt
);

module.exports = mongoose.model("Product", productSchema);
