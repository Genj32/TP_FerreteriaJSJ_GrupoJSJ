import { useCarrito } from "../context/CarritoContext";
import "./ProductoCard.css";

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();

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
          <button 
            className="btn-agregar" 
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
      </div>
    );
  }