import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombreDeUsuario: {
      type: String,
      required: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
    },
    passwordUsuario: {
      type: String,
      required: true,
    },
    esAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
