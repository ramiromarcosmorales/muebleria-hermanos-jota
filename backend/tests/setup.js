// Setup para tests - Mock de mongoose antes de que se importe app.js
import mongoose from "mongoose";

// Mock de los métodos de mongoose que se usan en el código
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();
const mockSave = jest.fn().mockResolvedValue(true);
const mockConnect = jest.fn().mockResolvedValue(true);

// Mock del modelo Product
const mockProduct = function (data) {
  const instance = {
    ...data,
    save: mockSave,
    toObject: jest.fn(() => ({
      ...data,
      _id: data._id || "507f1f77bcf86cd799439011",
    })),
  };
  return instance;
};

// Asignar métodos estáticos al constructor mock
// Estos métodos devuelven directamente las promesas mockeadas
mockProduct.find = jest.fn();
mockProduct.findById = jest.fn();
mockProduct.findByIdAndUpdate = jest.fn();
mockProduct.findByIdAndDelete = jest.fn();

// Mock de mongoose.model - debe retornar el mismo constructor mock siempre
const originalModel = mongoose.model;
mongoose.model = jest.fn((name, schema) => {
  // Si ya existe un mock para este modelo, devolverlo
  if (name === "Product") {
    return mockProduct;
  }
  // Para otros modelos, usar el comportamiento original
  return originalModel.call(mongoose, name, schema);
});

// Mock de mongoose.connect
mongoose.connect = mockConnect;

// Mock de mongoose.Types.ObjectId para crear ObjectIds válidos en tests
mongoose.Types = {
  ObjectId: jest.fn((id) => {
    if (!id) {
      // Generar un ObjectId válido de 24 caracteres
      return "507f1f77bcf86cd799439011";
    }
    // Validar que el id tenga 24 caracteres hexadecimales
    if (typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id)) {
      return id;
    }
    throw new Error("Invalid ObjectId");
  }),
  isValidObjectId: jest.fn((id) => {
    return typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
  }),
};

export {
  mockFind,
  mockFindById,
  mockFindByIdAndUpdate,
  mockFindByIdAndDelete,
  mockSave,
  mockProduct,
};
