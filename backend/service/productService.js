const Product = require("../models/Product");

const getAll = async () => {
  return await Product.find();
};

const getById = async (id) => {
  return await Product.findById(id);
};

const create = async (productData) => {
  const errors = validateProduct(productData);
  if (errors.length > 0) {
    const error = new Error("Error de validación");
    error.details = errors;
    throw error;
  }

  const newProduct = new Product(productData);
  return await newProduct.save();
};

const update = async (id, productData) => {
  const errors = validateProduct(productData);
  if (errors.length > 0) {
    const error = new Error("Error de validación");
    error.details = errors;
    throw error;
  }

  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

const remove = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, remove };
