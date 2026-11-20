import { useState } from "react";
import Header from "../components/Header";
import { useProductos } from "../context/ProductoContext";
import { usePedidos } from "../context/PedidoContext";
import { StockBadge } from "../components/StockBadge";
import { InventarioKPIs } from "../components/InventarioKPIs";
import "./Admin.css";
import "./Vendedor.css";

export default function Vendedor() {
  const { productos, vender, venderCarrito } = useProductos();
  const { pedidos, cambiarEstado } = usePedidos();

  const [mensajePedido, setMensajePedido] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [productoId, setProductoId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [soloCritico, setSoloCritico] = useState(true);

  const pedidosPendientes = pedidos.filter((p) => p.estado === "pendiente");
  const pedidosHistorial = pedidos.filter((p) => p.estado !== "pendiente");
  const totalVendido = pedidosHistorial
    .filter((p) => p.estado === "confirmado")
    .reduce((total, p) => total + p.total, 0);

  const productosInventario = soloCritico
    ? productos.filter((p) => Number(p.stock) <= 10)
    : productos;

  function manejarVenta(e) {
    e.preventDefault();
    const ok = vender(parseInt(productoId, 10), parseInt(cantidad, 10));

    if (ok) {
      setMensaje("Venta realizada con éxito");
      setProductoId("");
      setCantidad(1);
    } else {
      setMensaje("Error: cantidad inválida o stock insuficiente");
    }
  }

  function confirmarPedido(pedido) {
    const ok = venderCarrito(pedido.items);

    if (ok) {
      cambiarEstado(pedido.id, "confirmado");
      setMensajePedido("Pedido confirmado y stock descontado");
    } else {
      setMensajePedido("No hay stock suficiente para confirmar este pedido");
    }
  }

  function rechazarPedido(pedido) {
    cambiarEstado(pedido.id, "rechazado");
    setMensajePedido("Pedido rechazado");
  }

  return (
    <div className="contenedor-pagina">
      <Header titulo="Panel de Vendedor" />

      <main>
        <InventarioKPIs productos={productos} pedidos={pedidos} />

        {/* SECCIÓN 1: PEDIDOS PENDIENTES */}
        <section className="vendedor-seccion">
          <h3>Pedidos pendientes</h3>
          <p className="vendedor-subtitulo">
            {pedidosPendientes.length} pedidos esperando confirmación
          </p>

          {pedidosPendientes.length > 0 && (
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidosPendientes.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.fecha}</td>
                    <td>{pedido.cliente}</td>
                    <td>
                      {pedido.items
                        .map((i) => `${i.nombre} x${i.cantidad}`)
                        .join(", ")}
                    </td>
                    <td>$ {pedido.total.toLocaleString("es-AR")}</td>
                    <td className="acciones-celda">
                      <button
                        className="btn-confirmar"
                        onClick={() => confirmarPedido(pedido)}
                      >
                        Confirmar
                      </button>
                      <button
                        className="btn-rechazar"
                        onClick={() => rechazarPedido(pedido)}
                      >
                        Rechazar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {mensajePedido && <p className="vendedor-feedback">{mensajePedido}</p>}
        </section>

        {/* SECCIÓN 2: VENTA RÁPIDA EN MOSTRADOR */}
        <section className="vendedor-seccion">
          <h3>Registrar venta en mostrador</h3>
          <form onSubmit={manejarVenta} className="vendedor-form">
            <div className="vendedor-campo">
              <label htmlFor="producto">Producto</label>
              <select
                id="producto"
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
              >
                <option value="">Elegí un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} (stock: {p.stock})
                  </option>
                ))}
              </select>
            </div>

            <div className="vendedor-campo">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                id="cantidad"
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-vender">
              Registrar venta
            </button>
          </form>
          {mensaje && <p className="vendedor-feedback">{mensaje}</p>}
        </section>

        {/* SECCIÓN 3: CONTROL DE STOCK */}
        <section className="vendedor-seccion">
          <div className="vendedor-seccion-header">
            <div>
              <h3>Estado de inventario</h3>
              <p className="vendedor-subtitulo">
                Mostrando {productosInventario.length} de {productos.length} productos
              </p>
            </div>

            <label className="filtro-critico-label">
              <input
                type="checkbox"
                checked={soloCritico}
                onChange={(e) => setSoloCritico(e.target.checked)}
              />
              Mostrar solo stock crítico (≤ 10)
            </label>
          </div>

          <table className="tabla-admin">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {productosInventario.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>$ {Number(producto.precio || 0).toLocaleString("es-AR")}</td>
                  <td>
                    <StockBadge stock={producto.stock} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* SECCIÓN 4: HISTORIAL DE PEDIDOS */}
        <section className="vendedor-seccion">
          <h3>Historial de pedidos</h3>
          <p className="vendedor-subtitulo">
            Total vendido (confirmados):{" "}
            <strong>$ {totalVendido.toLocaleString("es-AR")}</strong>
          </p>

          {pedidosHistorial.length === 0 ? (
            <p className="vendedor-subtitulo">
              Todavía no hay pedidos en el historial
            </p>
          ) : (
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidosHistorial.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.fecha}</td>
                    <td>{pedido.cliente}</td>
                    <td>
                      {pedido.items
                        .map((i) => `${i.nombre} x${i.cantidad}`)
                        .join(", ")}
                    </td>
                    <td>$ {pedido.total.toLocaleString("es-AR")}</td>
                    <td>
                      <span className={`estado-badge estado-${pedido.estado}`}>
                        {pedido.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}