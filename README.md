# Mueblería Hermanos Jota - Ecommerce

## 📌 Descripción

Proyecto académico de desarrollo de un sitio de e-commerce para la Mueblería Hermanos Jota, con el objetivo de crear una vidriera digital y simular la experiencia de compra online. Durante los primeros sprints se construye la fachada y la interactividad básica del cliente utilizando **HTML, CSS y JavaScript**.

## 👥 Integrantes

- Ramiro Marcos Morales ([@ramiromarcosmorales](https://github.com/ramiromarcosmorales))
- Fernando David Medvedovsky ([@fmedvedovsky](https://github.com/fmedvedovsky))
- Sebastian Pallero Oria ([@Sebaspallero](https://github.com/Sebaspallero))
- Lautaro Omar Portugau ([@PortugauLau](https://github.com/PortugauLau))
- Petersen Federico Olaf ([@OlafPetersen](https://github.com/OlafPetersen))

## 🛠️ Tecnologías utilizadas

- **HTML5** - estructura semántica
- **CSS3** - diseño responsivo
- **JavaScript** - lógica de interacción y manipulación del DOM
- **Git & Github** - control de versión y colaboración
- **Node.js** - entorno de ejecución de JavaScript del lado del servidor
- **Express.js** - framework web

## Estructura del Proyecto

El repositorio del proyecto sigue una estrategia de monorepo, lo que significa que el código del frontend y del backend reside en el mismo lugar. Esta organización simplifica la colaboración y la gestión de dependencias entre ambas partes del proyecto.

El proyecto está dividido en dos directorios principales:

- **backend/**: Contiene todo el código del lado del servidor.

- **client/**: Contiene el código del lado del cliente.

### Como levantar el servidor

1. Al hacer clone del repositorio, moverse a la carpeta backend:
   ```sh
      cd backend
   ```
2. Una vez en la carpeta backend, instalar las dependencias necesarias para el proyecto:
   ```sh
      npm i
   ```
3. Instaladas las dependencias, hay que crear el archivo .env en la raíz de la carpeta backend, para ello renombrar el archivo de referencia .env.example con la guía de variables de entorno:
   ```sh
      mv .env.example .env
   ```
4. Existen dos comandos configurados en el package.json:
   - `npm run dev`: Inicializa el proyecto en modo desarrollo.
   - `npm run start`: Inicializa el proyecto en modo producción.
