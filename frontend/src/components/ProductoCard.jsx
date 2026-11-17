import { useCarrito } from "../context/CarritoContext";
import "./ProductoCard.css";
import { useState } from "react";


export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);

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

          {/* 3. Ejecutamos la función pasando el producto entero */}
    <div className="selector-cantidad">
       <button onClick={() => setCantidad(cantidad - 1)} disabled={cantidad <= 1}>
    -
        </button>
        <span>{cantidad}</span>
        <button onClick={() => setCantidad(cantidad + 1)} disabled={cantidad >= producto.stock}>
    +
        </button>
     </div>

    <button
         className="btn-agregar"
        onClick={() => {
              agregarAlCarrito(producto, cantidad);
              setCantidad(1);
  }}
>
      Agregar al carrito
    </button>
          
    </div>
    );
  }