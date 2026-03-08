import React, { useState, useEffect } from "react";
import UsuariosForm from "./usuariosform";
import UsuariosList from "./usuarioslist";

function UsuariosPage() {

  const [selectedUsuarios, setSelectedUsuarios] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = () => {
    fetch("http://localhost:3000/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (usuario) => {
    setSelectedUsuarios(usuario);
  };

  const handleSaveComplete = () => {
    setSelectedUsuarios(null);
    fetchUsuarios();
  };

  return (
    <div className="container-main">
      <h2>Gestión de Usuarios</h2>

      <UsuariosForm
        UsuariosToEdit={selectedUsuarios}
        onSaveComplete={handleSaveComplete}
      />

      <UsuariosList
        Usuarios={usuarios}
        onEdit={handleEdit}
        onDeleted={fetchUsuarios}
      />
    </div>
  );
}

export default UsuariosPage;