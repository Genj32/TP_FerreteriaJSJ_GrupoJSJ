import { useState, useEffect } from "react";
import { useProductos } from "../context/ProductoContext";
import "./Formulario.css";

export function Formulario({ onClose }) {
    const { productos, crear, editar, productoEditando } = useProductos();
    const [esNuevaCategoria, setEsNuevaCategoria] = useState(false);

    const categoriasExistentes = [
        ...new Set(productos.map((p) => p.categoria).filter(Boolean)),
    ];

    const [producto, setProducto] = useState({
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        imagen: "",
    });

    useEffect(() => {
        setEsNuevaCategoria(false);
        if (productoEditando) {
            setProducto(productoEditando);
        } else {
            setProducto({
                nombre: "",
                categoria: "",
                precio: "",
                stock: "",
                imagen: "",
            });
        }
    }, [productoEditando]);

    const handlerChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        });
    };

const handlerSubmit = (e) => {
    e.preventDefault();

    const precioNum = Number(producto.precio);
    const stockNum = Number(producto.stock);

    if (precioNum < 1 || stockNum < 1) {
        alert("El precio y el stock deben ser mayores o iguales a 1.");
        return;
    }

    const productoAEnviar = {
        ...producto,
        categoria: producto.categoria.trim(),
        precio: precioNum,
        stock: stockNum,
    };

    if (productoEditando) {
        editar(productoEditando.id, productoAEnviar);
    } else {
        crear(productoAEnviar);
    }

    setEsNuevaCategoria(false);
    setProducto({
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        imagen: "",
    });

    if (onClose) onClose();
};

    return (
        <form onSubmit={handlerSubmit} className="admin-form">
            <h2>{productoEditando ? "Editar Producto" : "Cargar Nuevo Producto"}</h2>

            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handlerChange}
                    required
                />
            </div>

            <div>
                <label>Categoría:</label>
                <select
                    value={esNuevaCategoria ? "__nueva__" : producto.categoria}
                    onChange={(e) => {
                        if (e.target.value === "__nueva__") {
                            setEsNuevaCategoria(true);
                            setProducto({ ...producto, categoria: "" });
                        } else {
                            setEsNuevaCategoria(false);
                            setProducto({ ...producto, categoria: e.target.value });
                        }
                    }}
                    required
                >
                    <option value="" disabled>
                        Seleccioná una categoría...
                    </option>
                    {categoriasExistentes.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                    <option value="__nueva__">+ Nueva categoría...</option>
                </select>

                {esNuevaCategoria && (
                    <input
                        type="text"
                        name="categoria"
                        value={producto.categoria}
                        onChange={handlerChange}
                        placeholder="Escribí el nombre de la nueva categoría..."
                        style={{ marginTop: "6px" }}
                        required
                        autoFocus
                    />
                )}
            </div>

            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    min="1"
                    step="any"
                    value={producto.precio}
                    onChange={handlerChange}
                    required
                />
            </div>

            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    min="1"
                    step="1"
                    value={producto.stock}
                    onChange={handlerChange}
                    required
                />
            </div>

            <div>
                <label>URL de Imagen:</label>
                <input
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handlerChange}
                />
            </div>

            <button type="submit">
                {productoEditando ? "Actualizar Producto" : "Guardar Producto"}
            </button>
        </form>
    );
}