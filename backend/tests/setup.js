import mongoose from "mongoose";
import { jest } from "@jest/globals";

const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();
const mockSave = jest.fn().mockResolvedValue(true);
const mockConnect = jest.fn().mockResolvedValue(true);

const createMockInstance = (data) => ({
  ...data,
  save: mockSave,
  toObject: jest.fn(() => ({
    ...data,
    _id: data._id || "507f1f77bcf86cd799439011",
  })),
});

const createQueryMock = (returnValue) => {
  const query = {
    populate: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(returnValue),
    then: (resolve, reject) =>
      Promise.resolve(returnValue).then(resolve, reject),
    catch: (reject) => Promise.resolve(returnValue).catch(reject),
  };
  return query;
};

// Mock del modelo Product
const mockProduct = function (data) {
  return createMockInstance(data);
};
mockProduct.find = jest.fn();
mockProduct.findById = jest.fn();
mockProduct.findByIdAndUpdate = jest.fn();
mockProduct.findByIdAndDelete = jest.fn();

// Mock del modelo User
const mockUser = function (data) {
  return createMockInstance(data);
};
mockUser.find = jest.fn();
mockUser.findOne = jest.fn();
mockUser.findById = jest.fn();
mockUser.findByIdAndUpdate = jest.fn();

// Mock del modelo Order
const mockOrder = function (data) {
  return createMockInstance(data);
};
mockOrder.find = jest.fn();
mockOrder.findOne = jest.fn();
mockOrder.findById = jest.fn();
mockOrder.create = jest.fn();

// Mock de mongoose.model
const originalModel = mongoose.model;
mongoose.model = jest.fn((name, schema) => {
  if (name === "Product") return mockProduct;
  if (name === "User") return mockUser;
  if (name === "Order") return mockOrder;
  return originalModel.call(mongoose, name, schema);
});

// Mock de mongoose.connect
mongoose.connect = mockConnect;

// Mock de mongoose.Types.ObjectId
mongoose.Types = {
  ObjectId: jest.fn((id) => {
    if (!id) return "507f1f77bcf86cd799439011";
    if (typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id)) return id;
    throw new Error("Invalid ObjectId");
  }),
  isValidObjectId: jest.fn((id) => {
    return typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
  }),
};

export {
  mockFind,
  mockFindOne,
  mockFindById,
  mockFindByIdAndUpdate,
  mockFindByIdAndDelete,
  mockSave,
  mockProduct,
  mockUser,
  mockOrder,
  createQueryMock,
};
