🛠️ Ferretería JSJ

Aplicación web (SPA) desarrollada para gestionar el inventario, los usuarios y las ventas online de una ferretería. Cuenta con inicio de sesión y vistas diferenciadas según el rol de cada usuario: Administrador, Vendedor y Cliente.

👥 Equipo
Grupo: JSJ
Institución: Escuela Da Vinci — Analista de Sistemas
Materia: Plataformas de Desarrollo (2do Parcial)
Comisión: ACN4AP
Integrantes:
Juan Manuel Cappi
Santiago Gomez Pereyra
Jonathan Gennari



✨ ¿Qué se puede hacer en la aplicación?
🧑💼 Administrador
Ver un resumen del negocio: productos activos, artículos con stock crítico y valorización total del inventario.
Agregar, editar y eliminar productos, y filtrar los que tienen bajo stock (10 unidades o menos).
Crear, editar y eliminar usuarios del sistema. Los usuarios nuevos pueden iniciar sesión al instante.
El administrador no puede eliminarse a sí mismo por error.
🧾 Vendedor
Ver los pedidos pendientes que hicieron los clientes, con el detalle y el total de cada uno.
Confirmar un pedido (se descuenta el stock) o rechazarlo. Si no hay stock suficiente, el sistema avisa y el pedido queda pendiente.
Registrar ventas de mostrador eligiendo producto y cantidad.
Consultar el historial de pedidos y el total vendido (solo cuentan los confirmados).
🛒 Cliente
Explorar el catálogo, buscar por nombre y filtrar por categoría.
Agregar productos al carrito eligiendo la cantidad, sin superar el stock disponible.
Confirmar el pedido: queda pendiente hasta que un vendedor lo confirme o rechace.
Ver el estado de sus pedidos en 📦 Mis pedidos.


🔐 Usuarios de prueba
Rol	Email	Contraseña
Administrador	admin@jsj.com	admin123
Vendedor	vendedor@jsj.com	vendedor123
Cliente	cliente@jsj.com	cliente123


🔄 Flujo de un pedido
El cliente arma su carrito y toca Confirmar pedido.
El pedido se crea con estado pendiente (todavía no se toca el stock).
El vendedor lo ve en su panel y lo confirma (se descuenta el stock) o lo rechaza.
El cliente ve el resultado en Mis pedidos.
🛠️ Tecnologías utilizadas
React 19 + Vite
React Router (rutas y rutas protegidas por rol)
Context API (sesión, usuarios, productos, carrito y pedidos)
JavaScript y CSS
pnpm



⚙️ Cómo ejecutar el proyecto
Abrir una terminal e ingresar a la carpeta del frontend:
bash
cd frontend
Instalar las dependencias:
bash
pnpm install
Iniciar el servidor de desarrollo:
bash
pnpm run dev
Abrir en el navegador la dirección que muestra la terminal (normalmente http://localhost:5173).

Para generar la versión de producción: pnpm run build.

⚠️ Limitaciones actuales
Es un proyecto solo frontend: los datos están en el código (src/data) y se manejan en memoria.
Al recargar la página (F5) se pierde la sesión, los pedidos y los cambios de stock. Hay que navegar con los links de la aplicación, no escribiendo la URL.
Backend y base de datos quedan como siguiente etapa del proyecto.