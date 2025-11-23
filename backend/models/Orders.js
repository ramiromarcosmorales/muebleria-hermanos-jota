import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        nombre: {
          type: String,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
        imagenUrl: {
          type: String,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    direccionEnvio: {
      calle: {
        type: String,
        required: true,
      },
      numero: {
        type: String,
        required: true,
      },
      ciudad: {
        type: String,
        required: true,
      },
      codigoPostal: {
        type: String,
        required: true,
      },
      provincia: {
        type: String,
        required: true,
      },
    },
    datosContacto: {
      nombre: {
        type: String,
        required: true,
      },
      telefono: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmada", "enviada", "entregada", "cancelada"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
