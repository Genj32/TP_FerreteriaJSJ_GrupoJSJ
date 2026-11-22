import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Admin from "./pages/Admin";
import Vendedor from "./pages/Vendedor";
import RutaProtegida from "./components/RutaProtegida";
import { useAuth } from "./context/AuthContext";
import { ProductoProvider } from "./context/ProductoContext";
import Carrito from "./pages/Carrito";

function App() {
  const { usuario } = useAuth();

  return (
    <ProductoProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Si hay sesión iniciada va a Inicio; si no, al Login */}
        <Route
          path="/"
          element={usuario ? <Inicio /> : <Navigate to="/login" />}
        />

        <Route
          path="/inicio"
          element={
            <RutaProtegida>
              <Inicio />
            </RutaProtegida>
          }
        />

        <Route
          path="/catalogo"
          element={
            <RutaProtegida>
              <Catalogo />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin"
          element={
            <RutaProtegida rolRequerido="administrador">
              <Admin />
            </RutaProtegida>
          }
        />

        <Route
          path="/vendedor"
          element={
            <RutaProtegida rolRequerido="vendedor">
              <Vendedor />
            </RutaProtegida>
          }
        />

        <Route
          path="/carrito"
          element={
            <RutaProtegida>
              <Carrito />
            </RutaProtegida>
          }
        />
      </Routes>
    </ProductoProvider>
  );
}

export default App;