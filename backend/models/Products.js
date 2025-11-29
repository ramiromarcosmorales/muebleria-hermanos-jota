import mongoose from "mongoose";

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
      min: 0,
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
    imagen: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
