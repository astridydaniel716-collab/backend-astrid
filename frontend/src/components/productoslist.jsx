// Importamos React y los hooks necesarios
import React from "react";
/**
 * Componente productosList
 * -----------------------
 * Muestra la lista de productos obtenidos desde el componente padre (App).
 * Permite eliminar productos y notificar al componente padre cuando se desea editar uno.
 *
 * Props:
 *  - productos: arreglo con los productos a mostrar (viene desde App)
 *  - onEdit: función callback que recibe el productos seleccionado para editar.
 *  - onDeleted: función callback que se ejecuta después de eliminar, para refrescar la lista.
 */
function ProductosList({ Productos, onEdit, onDeleted }) {

  // -------------------- FUNCIÓN ELIMINAR --------------------
  // handleDelete recibe el ID del producto a eliminar.
  // Pide confirmación al usuario y, si acepta, envía la solicitud DELETE al backend.
  const handleDelete = (id) => {
    // Confirmación para evitar eliminaciones accidentales
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    // Petición DELETE al servidor
    fetch(`http://localhost:3000/api/productos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Producto eliminado"); // Mensaje de confirmación
        onDeleted(); // Recargamos la lista desde el componente padre (App)
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  // -------------------- RENDERIZADO --------------------
  // Muestra un mensaje si no hay productos o una tabla si existen registros.
  return (
    <div>
      <h2>Lista de Productos</h2>

      {/* Si no hay productos, mostrar un mensaje */}
      {Productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        // Si hay productos, renderizamos una tabla HTML sencilla
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Nombre del producto</th>
              <th>Precio</th>
              <th>Descripción </th>
              <th> </th>
              
            </tr>
          </thead>

          <tbody>
            {/* Recorremos el arreglo de productos */}
            {Productos.map((prod) => (
              // Cada fila debe tener una key única (usamos prod._id)
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.description}</td>
                
                <td>
                  {/* Botón Editar: llama a onEdit pasando el producto seleccionado */}
                  <button onClick={() => onEdit(prod)}>Editar</button>

                  {/* Botón Eliminar: llama a handleDelete con el ID del producto */}
                  <button
                    onClick={() => handleDelete(prod._id)}
                    style={{ marginLeft: "10px" }} >Eliminar</button>
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
export default ProductosList;