# 🚀 Backend Astrid

Este proyecto es un backend desarrollado con **Node.js**, **Express** y **MongoDB**.  
Aquí encontrarás los endpoints, la estructura del proyecto y las instrucciones para instalar y ejecutar el servidor.

---

## 📂 Estructura del Proyecto

mi-backend/
│
├── backend/                         # Servidor con Node.js + Express + MongoDB
│   ├── controllers/
│   │   └── usuarios.controller.js   # Lógica de negocio de usuarios
    │   └── productos.controller.js  # Lógica de negocio de productos
│   ├── models/
│   │   └── usuarios.js              # Esquema de Mongoose
│   │   └── productos.js             # Esquema de Mongoose
│   ├── routes/
│   │   └── usuarios.routes.js       # Rutas REST del recurso usuarios
│   │   └── productos.routes.js      # Rutas REST del recurso productos
│   ├── database.js                  # Conexión a MongoDB
│   └── index.js                     # Punto de entrada del servidor
---

## 🔧 Instalación

Clona este repositorio:

git clone https://github.com/astridydaniel716-collab/backend-astrid.git


Entra a la carpeta:

cd backend-astrid

Instala las dependencias:

npm install

## ▶️ Ejecutar el servidor

### Modo normal:
node server.js

shell
Copiar código
npm run dev

El servidor corre normalmente en:
http://localhost:3000

## 📡 Endpoints disponibles

GET /api/usuarios
POST /api/usuarios
PUT /api/usuarios/:id
DELETE /api/usuarios/:id
GET /api/usuarios/:id

GET /api/productos
POST /api/productos
PUT /api/productos/:id
DELETE /api/productos/:id
GET /api/productos/:id

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MongoDB y Mongoose
- Nodemon (desarrollo)
- CORS
- dotenv

---



