import { createContext, useContext, useState } from "react";

const PedidoContext = createContext(null);

export function PedidoProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);

  function crearPedido(items, cliente) {
    const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    const nuevoPedido = {
      id: Date.now(),
      fecha: new Date().toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      cliente: cliente,
      items: items,
      total: total,
      estado: "pendiente",
    };

    setPedidos((pedidosActuales) => [nuevoPedido, ...pedidosActuales]);
  }

  function cambiarEstado(id, nuevoEstado) {
    setPedidos((pedidosActuales) =>
      pedidosActuales.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  }

  return (
    <PedidoContext.Provider value={{ pedidos, crearPedido, cambiarEstado }}>
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedidos() {
  return useContext(PedidoContext);
}