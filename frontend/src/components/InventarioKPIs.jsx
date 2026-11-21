export function InventarioKPIs({ productos = [], pedidos = [] }) {
  const totalProductos = productos.length;
  const stockCritico = productos.filter((p) => Number(p.stock) <= 10).length;
  const valorTotal = productos.reduce(
    (acc, p) => acc + Number(p.precio) * Number(p.stock),
    0
  );
  const pedidosPendientes = pedidos.filter(
    (ped) => ped.estado === "pendiente"
  ).length;

  return (
    <div className="kpis-grid">
      <div className="kpi-card">
        <span className="kpi-label">Productos activos</span>
        <strong className="kpi-value">{totalProductos}</strong>
      </div>
      <div className="kpi-card kpi-alerta">
        <span className="kpi-label">Stock crítico (≤ 10)</span>
        <strong className="kpi-value">{stockCritico}</strong>
      </div>
      <div className="kpi-card">
        <span className="kpi-label">Pedidos pendientes</span>
        <strong className="kpi-value">{pedidosPendientes}</strong>
      </div>
      <div className="kpi-card kpi-destacado">
        <span className="kpi-label">Valorización inventario</span>
        <strong className="kpi-value">${valorTotal.toLocaleString("es-AR")}</strong>
      </div>
    </div>
  );
}