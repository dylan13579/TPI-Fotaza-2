# 📸 FOTAZA 2

> Proyecto integrador – Programación Web II  
> Sistema web de publicación y gestión de fotografías

---

## 📌 Descripción

**FOTAZA 2** es una aplicación web desarrollada como Trabajo Práctico Integrador de la materia **Programación Web II**.

El sistema permite a los usuarios registrarse, publicar fotografías, interactuar con contenido de otros usuarios mediante comentarios, valoraciones, seguidores.

El objetivo del proyecto es simular una red social de imágenes con funcionalidades de comunidad y gestión de contenido.

---

## 📊 Estado del proyecto

🚧 Proyecto en desarrollo (versión demo)

Algunas funcionalidades pueden estar en fase de prueba o mejora.

---

## ⚙️ Tecnologías utilizadasadas

- Node.js
- Express.js
- PUG (Server Side Rendering)
- MySQL
- JavaScript
- HTML5 / CSS
- Bootstrap (opcional)
- dotenv
- express-session
- bcrypt

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd TPI-Fotaza-2
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=fotaza2

SESSION_SECRET=12345
```

### 4. Inicializar base de datos

```bash
npm run db:init
```

### 5. Ejecutar el proyecto

```bash
npm start
```

Luego abrir:

http://localhost:3000

---

## 🗄️ Base de datos

La base de datos utilizada es **MySQL**.

### 📋 Tablas principales

- usuario → gestión de usuarios registrados
- publicacion → publicaciones creadas por usuarios
- comentario → comentarios en publicaciones
- valoracion → sistema de votos por estrellas
- seguidores → relaciones entre usuarios (seguir/dejar de seguir)

---

## 🔐 Autenticación

- Registro e inicio de sesión de usuarios
- Contraseñas encriptadas con bcrypt
- Sesiones con express-session

---

## 🧩 Funcionalidades principales

- Publicación de imágenes
- Comentarios
- Valoraciones
- Seguimiento de usuarios
- Búsqueda de contenido

---

## 📁 Estructura del proyecto

/config

/controllers

/models

/routes

/views

/public

/sql

app.js

---

## 📦 Scripts

npm start

npm run db:init

---

## 👤 Autor

Proyecto desarrollado para Programación Web II  
Desarrollador: Dylan Lucas Jofre Villegas
