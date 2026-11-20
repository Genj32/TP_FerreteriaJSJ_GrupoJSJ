export function StockBadge({ stock }) {
  const cantidad = Number(stock);

  let clase = "badge-stock-ok";
  let texto = `${cantidad} u.`;

  if (cantidad === 0) {
    clase = "badge-stock-cero";
    texto = "Sin stock";
  } else if (cantidad <= 10) {
    clase = "badge-stock-bajo";
    texto = `Crítico (${cantidad})`;
  }

  return <span className={`badge-stock ${clase}`}>{texto}</span>;
}