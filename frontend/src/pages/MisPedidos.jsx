import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { usePedidos } from "../context/PedidoContext";
import "./Admin.css";
import "./Vendedor.css";

export default function MisPedidos() {
  const { usuario } = useAuth();
  const { pedidos } = usePedidos();
  const navigate = useNavigate();

  const misPedidos = pedidos.filter((p) => p.cliente === usuario?.nombre);

  return (
    <div className="contenedor-pagina">
      <Header titulo="Mis pedidos" />

      <main>
        <section className="vendedor-seccion">
          <div className="vendedor-seccion-header">
            <div>
              <h3>Estado de tus pedidos</h3>
              <p className="vendedor-subtitulo">
                {misPedidos.length}{" "}
                {misPedidos.length === 1
                  ? "pedido realizado"
                  : "pedidos realizados"}
              </p>
            </div>

            <button
              className="btn-vender"
              onClick={() => navigate("/catalogo")}
            >
              Volver al catálogo
            </button>
          </div>

          {misPedidos.length === 0 ? (
            <p className="vendedor-subtitulo">
              Todavía no hiciste ningún pedido
            </p>
          ) : (
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {misPedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.fecha}</td>
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