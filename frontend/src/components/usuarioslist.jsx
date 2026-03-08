// Importamos React y los hooks necesarios
import React from "react";
/**
 * Componente UsuariosList
 * -----------------------
 * Muestra la lista de empleados obtenidos desde el componente padre (App).
 * Permite eliminar empleados y notificar al componente padre cuando se desea editar uno.
 *
 * Props:
 *  - usuarios: arreglo con los usuarios a mostrar (viene desde App)
 *  - onEdit: función callback que recibe el usuario seleccionado para editar.
 *  - onDeleted: función callback que se ejecuta después de eliminar, para refrescar la lista.
 */
function UsuariosList({ Usuarios, onEdit, onDeleted }) {

  // -------------------- FUNCIÓN ELIMINAR --------------------
  // handleDelete recibe el ID del usuario a eliminar.
  // Pide confirmación al usuario y, si acepta, envía la solicitud DELETE al backend.
  const handleDelete = (id) => {
    // Confirmación para evitar eliminaciones accidentales
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    // Petición DELETE al servidor
    fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Usuario eliminado"); // Mensaje de confirmación
        onDeleted(); // Recargamos la lista desde el componente padre (App)
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  // -------------------- RENDERIZADO --------------------
  // Muestra un mensaje si no hay usuarios o una tabla si existen registros.
  return (
    <div>
      <h2>Lista de Usuarios</h2>

      {/* Si no hay usuarios, mostrar un mensaje */}
      {Usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        // Si hay usuarios, renderizamos una tabla HTML sencilla
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th> </th>
              
            </tr>
          </thead>

          <tbody>
            {/* Recorremos el arreglo de usuarios */}
            {Usuarios.map((usu) => (
              // Cada fila debe tener una key única (usamos usu._id)
              <tr key={usu._id}>
                <td>{usu.name}</td>
                <td>{usu.email}</td>
                
                <td>
                  {/* Botón Editar: llama a onEdit pasando el usuario seleccionado */}
                  <button onClick={() => onEdit(usu)}>Editar</button>

                  {/* Botón Eliminar: llama a handleDelete con el ID del usuario */}
                  <button
                    onClick={() => handleDelete(usu._id)}
                    style={{ marginLeft: "10px" }} // Espacio visual entre botones
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Exportamos el componente para que pueda usarse en App.js u otros componentes
export default UsuariosList;