import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCarrito } from "../context/CarritoContext";
import { usePedidos } from "../context/PedidoContext";
import { useAuth } from "../context/AuthContext";
import "./Carrito.css";

export default function Carrito() {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    totalCarrito,
  } = useCarrito();
  const { crearPedido } = usePedidos();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  function manejarConfirmarCompra() {
    if (carrito.length === 0) return;

    crearPedido(carrito, usuario?.nombre || "Cliente");
    vaciarCarrito();
    setMensaje("Pedido enviado. Un vendedor lo confirmará a la brevedad.");
  }

  return (
    <div className="contenedor-pagina">
      <Header titulo="Mi Carrito" />

      <main className="carrito-contenedor">
        {mensaje && <p className="carrito-mensaje">{mensaje}</p>}

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío.</p>
            <button
              className="btn-volver"
              onClick={() => navigate("/catalogo")}
            >
              Volver al catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="carrito-lista">
              {carrito.map((item) => {
                const alcanzoTope = item.cantidad >= item.stock;

                return (
                  <div key={item.id} className="carrito-item">
                    <div className="carrito-item-producto">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="carrito-item-img"
                      />
                      <div className="carrito-item-info">
                        <h3>{item.nombre}</h3>
                        <p>
                          $ {Number(item.precio).toLocaleString("es-AR")} c/u
                        </p>
                        <small>Stock disponible: {item.stock}</small>
                      </div>
                    </div>

                    <div className="carrito-item-acciones">
                      <div className="carrito-controles">
                        <button
                          className="btn-cant"
                          onClick={() => disminuirCantidad(item.id)}
                        >
                          -
                        </button>
                        <span className="item-cantidad-num">
                          {item.cantidad}
                        </span>
                        <button
                          className="btn-cant"
                          onClick={() => aumentarCantidad(item.id)}
                          disabled={alcanzoTope}
                          title={
                            alcanzoTope
                              ? "Stock máximo alcanzado"
                              : "Sumar unidad"
                          }
                        >
                          +
                        </button>
                      </div>

                      <p className="carrito-subtotal">
                        ${" "}
                        {(
                          Number(item.precio) * Number(item.cantidad)
                        ).toLocaleString("es-AR")}
                      </p>

                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarDelCarrito(item.id)}
                        title="Quitar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="carrito-resumen">
              <h3>Total: $ {totalCarrito.toLocaleString("es-AR")}</h3>
              <div className="carrito-resumen-acciones">
                <button
                  className="btn-volver-outline"
                  onClick={() => navigate("/catalogo")}
                >
                  Seguir comprando
                </button>
                <button className="btn-vaciar" onClick={vaciarCarrito}>
                  Vaciar carrito
                </button>
                <button
                  className="btn-confirmar-compra"
                  onClick={manejarConfirmarCompra}
                >
                  Confirmar pedido
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}