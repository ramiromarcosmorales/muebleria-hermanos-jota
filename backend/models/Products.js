const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    imagenUrl: {
      type: String,
      required: true,
    },
    altValue: {
      type: String,
      required: true,
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    dimensiones: {
      type: String,
      required: true,
    },
    capacidad: {
      type: String,
      required: true,
    },
    estilo: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    garantia: {
      type: String,
      required: true,
    },
    origen: {
      type: String,
      required: true,
    },
    peso: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // crea automáticamente createdAt y updatedAt
);

module.exports = mongoose.model("Product", productSchema);
