import { useState, useEffect } from "react";
import { useUsuarios } from "../context/UsuarioContext";
import "./Formulario.css";

export function FormularioUsuario({ onClose }) {
  const { crearUsuario, editarUsuario, usuarioEditando } = useUsuarios();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "cliente",
  });

  useEffect(() => {
    if (usuarioEditando) setUsuario(usuarioEditando);
    else setUsuario({ nombre: "", email: "", password: "", rol: "cliente" });
  }, [usuarioEditando]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuarioEditando) editarUsuario(usuarioEditando.id, usuario);
    else crearUsuario(usuario);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>{usuarioEditando ? "Editar Usuario" : "Nuevo Usuario"}</h2>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={usuario.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={usuario.password || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Rol:</label>
        <select name="rol" value={usuario.rol} onChange={handleChange} required>
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button type="submit">
          {usuarioEditando ? "Actualizar" : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{ backgroundColor: "#555" }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}