# Reto modulo backend

## Objetivo:

Aplicar tus conocimientos sobre HTTP, JavaScript, Node, Express, Mongo, Mongoose y JWT en la creación de un servicio RESTful que cumpla con lo que necesitaría un servicio como [dev.to](http://dev.to) para funcionar 

## Requisitos:

El reto debe cumplir con los siguientes puntos:

## **Debe hacer uso de las siguientes entidades**

## User

Representa a un usuario y escritor del blog

Atributos:

- name (string)
- profilePic (string)
- email (string)
- password (string)
- created_at (date)
- updated_at (date)

<aside>
🚨 No deberían existir 2 usuarios con el mismo email

</aside>

## Post

Representa un blog post del blog

Atributos:

- title (string)
- image (string)
- body (string )
- user (ObjectId referencia a UserId)
- created_at (date)
- updated_at (date)

## **Debe implementar los siguientes endpoints**

### POST /user

Para permitir el registro a los nuevos usuarios

No requiere autorización

### GET /user/:id

Para obtener la información de un usuario por id

No requiere autorización

---

### POST /auth/login

Para otorgar un nuevo JWT cada que es llamado

No requiere autorización

---

### POST /posts 🔒

Para crear un nuevo post, el post creado será asignado al usuario que llamó este endpoint

Requiere autorización

### GET /posts

Para listar todos los posts

- Debe soportar el filtrado por titulo usando un query param llamado `search`

No requiere autorización

### PATCH /posts/:id 🔒

Para permitir actualizar un post

- No se debe permitir cambiar el usuario de un post

Requiere autorización

### DELETE /posts/:id 🔒

Para permitir borrar un post

- Solo el usuario dueño del post debe ser capaz de ejecutar esta acción

Requiere autorización

## **Debe hacer uso de estas herramientas**

- NodeJS
- http-errors
- clean architecture

- JWT
- mongoose

- Express
- MongoDB

- bcryptjs
- dotenv

## Puntos extra ✨

## Conectar el reto de frontend con esta API

- Form de login
- Detalle del post
- Borrado del post

- Listado de posts
- Edición del post

## Colección de requests de insomnia

## Agregar tags a los posts

## ¿Como entregar?

El reto deberá entregarse como un repositorio de github para su revisión

Este repositorio deberá..

- Ser un repositorio único y especial para este reto
- Tiene que contar con un archivo .gitignore
- No debe de contar con los archivos .env ni la carpeta node_modules
- Debe contener un .env.example con las llaves necesarias para el archivo .env
- Deber contar con un [README.md](http://README.md) en la raiz del proyecto que explique lo que es ese repositorio, como instalarlo, como correrlo y cuales son los endpoints disponibles

### ¿Que se revisará?

- Que el repositorio cumpla con lo establecido
- Se revisaran los commits del repositorio para determinar la participación de todos los integrantes
- Se revisará que se implemente la arquitectura limpia
- Se revisará que la implementación siga las especificaciones