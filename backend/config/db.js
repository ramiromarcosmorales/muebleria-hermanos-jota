import mongoose from "mongoose";

export async function connectToDB() {
  const MONGO_URI = process.env.MONGO_URI;
  const NODE_ENV = process.env.NODE_ENV;

  try {
    if (NODE_ENV !== "test" && MONGO_URI) {
      await mongoose.connect(MONGO_URI);
      console.log("¡Conexión exitosa a MongoDB!");
    }
  } catch (error) {
    console.error(`Error al conectar con la base de datos: ${error.message}`);
    // No DB, no process
    process.exit(1);
  }
}
