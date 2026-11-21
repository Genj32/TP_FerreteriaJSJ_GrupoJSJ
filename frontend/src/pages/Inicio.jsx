import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Inicio.css";

export default function Inicio() {
  const { usuario, logout } = useAuth();

  const rutaPanel =
    usuario?.rol === "administrador"
      ? "/admin"
      : usuario?.rol === "vendedor"
      ? "/vendedor"
      : "/catalogo";

  return (
    <div className="inicio-page">
      <div className="inicio-card">
        <img src="/img/logo.png" alt="Ferretería JSJ" className="inicio-logo" />
        <h1>Bienvenido, {usuario?.nombre}</h1>
        <span className="inicio-rol">Rol: {usuario?.rol}</span>

        <div className="inicio-acciones">
          <Link to={rutaPanel} className="btn-inicio-primario">
            Ir a mi panel
          </Link>
          <button onClick={logout} className="btn-inicio-secundario">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}