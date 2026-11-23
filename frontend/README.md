# 🛠️ Ferretería JSJ

Aplicación web desarrollada para gestionar el inventario, los usuarios y las ventas online de una ferretería. El sistema cuenta con inicio de sesión y vistas diferenciadas según el rol de cada usuario: **Administrador**, **Vendedor** y **Cliente**.

---

## 👥 Equipo

* **Grupo:** JSJ
* **Institución:** Escuela Da Vinci — Analista de Sistemas
* **Materia:** Plataformas de Desarrollo (2do Parcial)
* **Comisión:** ACN1BV
* **Integrantes:**
  * Juan Manuel Cappi
  * [Nombre y Apellido — Integrante 2]
  * [Nombre y Apellido — Integrante 3]

---

## ✨ ¿Qué se puede hacer en la aplicación?

### 🧑‍💼 Administrador
* Ver un resumen general del negocio: cantidad de productos activos, artículos con stock crítico, pedidos pendientes y valorización total del inventario.
* Agregar, editar y eliminar productos, además de filtrar rápidamente los que tienen bajo stock (10 unidades o menos).
* Crear, editar y eliminar usuarios del sistema (los usuarios nuevos ya pueden iniciar sesión al instante).
* Protección de cuenta: el administrador no puede eliminarse a sí mismo por error.

### 🧾 Vendedor
* Consultar el historial y listado de pedidos realizados por los clientes.
* Revisar el detalle y el total de cada compra para confirmarla o rechazarla.

### 🛒 Cliente
* Explorar el inicio y el catálogo de productos disponibles.
* Agregar artículos al carrito eligiendo la cantidad deseada, respetando siempre el stock real disponible.
* Confirmar la compra y consultar el estado de sus pedidos desde la sección **Mis Pedidos**.

---

## 🛠️ Tecnologías utilizadas

* **React** + **Vite**
* **JavaScript** y **CSS**
* **pnpm**

---

## ⚙️ Cómo ejecutar el proyecto

1. Abrir una terminal e ingresar a la carpeta del frontend:
   ```bash
   cd frontend