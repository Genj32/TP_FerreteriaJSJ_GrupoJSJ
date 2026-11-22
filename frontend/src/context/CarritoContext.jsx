import { createContext, useContext, useState } from "react";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto, cantidad = 1) {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        const nuevaCantidad = Math.min(
          existente.cantidad + cantidad,
          producto.stock
        );
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: nuevaCantidad, stock: producto.stock }
            : item
        );
      }
      if (producto.stock <= 0) return prev;
      return [
        ...prev,
        {
          ...producto,
          cantidad: Math.min(cantidad, producto.stock),
        },
      ];
    });
  }

  function aumentarCantidad(id) {
    setCarrito((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (item.cantidad >= item.stock) return item;
        return { ...item, cantidad: item.cantidad + 1 };
      })
    );
  }

  function disminuirCantidad(id) {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function eliminarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const totalCarrito = carrito.reduce(
    (acc, item) => acc + Number(item.precio) * Number(item.cantidad),
    0
  );

  const cantidadTotal = carrito.reduce(
    (acc, item) => acc + Number(item.cantidad),
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalCarrito,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}