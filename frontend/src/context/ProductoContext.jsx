import { useContext, createContext, useState } from "react";
import {productos as listaProductos} from "../data/productos"; 

const ProductoContext = createContext(null)


export function ProductoProvider({children}){

    const [productos, setProductos] = useState(listaProductos)

    const [productoEditando, setProductoEditando] = useState(null)

    function crear(productoNuevo){
        const nuevoProducto = {
            id: Date.now(),
            ...productoNuevo
            }
            setProductos([...productos , nuevoProducto])
    }

    function borrar(id){
        const productosFiltrados = productos.filter(p => p.id !==id)
        setProductos(productosFiltrados)
    }

    function editar(id, productoActualizado){
        setProductos(
            productos.map(p => p.id === id ? {...p , ...productoActualizado} : p)     
        )
        setProductoEditando(null)
    }

    function vender(id,cantidad) {
    const producto = productos.find(p => p.id === id);
    if (!producto|| cantidad <1 || cantidad > producto.stock) {

        return false;
    }
    setProductos(
        productos.map(p => p.id === id ? {...p , stock: p.stock - cantidad} : p)     
    )
        return true;
    }

  function venderCarrito(items) {
        const hayStock = items.every((item) => {
            const producto = productos.find((p) => p.id === item.id);
            if (!producto) {
                return false; // Producto no encontrado
            }
            if (item.cantidad > producto.stock) {
                return false; // No hay suficiente stock
            }
            return true;
        });

        if (!hayStock) {
            return false;
        }

        setProductos(
            productos.map((producto) => {
                const item = items.find((i) => i.id === producto.id);
                if (item) {
                    return { ...producto, stock: producto.stock - item.cantidad };
                }
                return producto;
            })
        );

        return true;
    }
    
    return (
        <ProductoContext.Provider value={{ productos ,crear , borrar , editar, vender, venderCarrito, productoEditando , setProductoEditando }}>
            {children}
        </ProductoContext.Provider>
        )
}

export function useProductos(){
    return useContext(ProductoContext)
}
  

    
