import { useCarrito } from "../context/CarritoContext";
import "./ProductoCard.css";
import { useState } from "react";

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const sinStock = Number(producto.stock) <= 0;

  return (
    <div className="producto-card">
      <div className="imagen-placeholder">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
        ) : (
          "🛠️"
        )}
      </div>

      <h3 className="producto-nombre">{producto.nombre}</h3>
      <p className="producto-categoria">{producto.categoria}</p>

      <p className="producto-precio">$ {producto.precio.toLocaleString("es-AR")}</p>

      <div className="selector-cantidad">
        <button onClick={() => setCantidad(cantidad - 1)} disabled={sinStock || cantidad <= 1}>
          -
        </button>
        <span>{sinStock ? 0 : cantidad}</span>
        <button
          onClick={() => setCantidad(cantidad + 1)}
          disabled={sinStock || cantidad >= producto.stock}
        >
          +
        </button>
      </div>

      <button
        className="btn-agregar"
        disabled={sinStock}
        onClick={() => {
          agregarAlCarrito(producto, cantidad);
          setCantidad(1);
        }}
      >
        {sinStock ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}