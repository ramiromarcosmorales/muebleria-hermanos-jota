import { Product } from "../models/Products.js";
import { validateProduct } from "../utils/validateProduct.js";

export const getAll = async () => {
  return await Product.find();
};

export const getById = async (id) => {
  return await Product.findById(id);
};

export const create = async (productData) => {
  const errors = validateProduct(productData);
  if (errors.length > 0) {
    const error = new Error("Error de validación");
    error.details = errors;
    throw error;
  }

  const newProduct = new Product(productData);
  return await newProduct.save();
};

export const update = async (id, productData) => {
  const errors = validateProduct(productData);
  if (errors.length > 0) {
    const error = new Error("Error de validación");
    error.details = errors;
    throw error;
  }

  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

export const remove = async (id) => {
  return await Product.findByIdAndDelete(id);
};
