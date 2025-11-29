# Mueblería Hermanos Jota - Ecommerce

## 📌 Descripción

Proyecto académico de desarrollo de un sitio de e-commerce para la Mueblería Hermanos Jota, con el objetivo de crear una vidriera digital y simular la experiencia de compra online. El sistema permite la gestión de usuarios, productos, carrito de compras y órdenes.

## 👥 Integrantes

- Ramiro Marcos Morales ([@ramiromarcosmorales](https://github.com/ramiromarcosmorales))
- Fernando David Medvedovsky ([@fmedvedovsky](https://github.com/fmedvedovsky))
- Sebastian Pallero Oria ([@Sebaspallero](https://github.com/Sebaspallero))

## 🛠️ Tecnologías utilizadas

- **React.js** - Biblioteca para la interfaz de usuario (Frontend)
- **Node.js & Express.js** - Entorno y framework para el servidor (Backend)
- **MongoDB & Mongoose** - Base de datos NoSQL y modelado de objetos
- **JWT (JSON Web Tokens)** - Autenticación y manejo de sesiones seguras
- **Jest & Supertest** - Testing unitario y de integración
- **Swagger** - Documentación de API
- **CSS3** - Diseño responsivo

## Estructura del Proyecto

El repositorio sigue una estrategia de monorepo:

- **backend/**: Código del servidor (API, Modelos, Controladores).
- **client/**: Código del cliente (React, Vite, Context).

## 🚀 Guía de Inicio Rápido

### 1. Backend (Servidor)

1. Moverse a la carpeta `backend`:
   ```sh
   cd backend
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar variables de entorno:
   Renombrar `.env.example` a `.env` y configurar `MONGO_URI`, `JWT_SECRET` y `PORT`.
   ```env
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=mi_clave_secreta
   PORT=3000
   ```
4. Iniciar servidor:
   ```sh
   npm run dev
   ```

### 2. Frontend (Cliente)

1. Moverse a la carpeta `client`:
   ```sh
   cd client
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar variables de entorno:
   Renombrar `.env.example` a `.env` y configurar `VITE_API_BASE` apuntando al backend (local o desplegado).
   ```env
   VITE_API_BASE=http://localhost:3000
   ```
4. Iniciar cliente:
   ```sh
   npm run dev
   ```

## 🗄️ Base de Datos y Almacenamiento

El proyecto utiliza **MongoDB Atlas**.

- **Imágenes:** Las imágenes de los productos se almacenan directamente en la base de datos como datos binarios (Buffer) y se sirven a través de la API (`/api/productos/:id/imagen`). No se requiere almacenamiento externo ni rutas de archivos estáticos para los productos.

### 🌐 Despliegue

- **Frontend desplegado:** [https://muebleria-hermanos-jota.vercel.app/](https://muebleria-hermanos-jota.vercel.app/)
- **Backend desplegado (API Docs):** [https://muebleria-hermanos-jota-backend.vercel.app/api/docs/](https://muebleria-hermanos-jota-backend.vercel.app/api/docs/)

## 🧪 Testing

El backend cuenta con una suite de tests automatizados que cubren:

- **Productos:** CRUD completo y validación de imágenes.
- **Autenticación:** Registro, Login y persistencia de sesión.
- **Órdenes:** Creación y consulta de pedidos.

Para correr los tests:

```sh
cd backend
npm test
```

## 📦 Integración Continua (CI)

Utilizamos **GitHub Actions** para:

1. Ejecutar tests del backend en cada push/PR.
2. Verificar el build del frontend.

El flujo asegura que no se integren cambios que rompan la funcionalidad principal.
