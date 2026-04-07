// Importamos React y los hooks necesarios desde la biblioteca
import React, { useState, useEffect } from "react";

/**
 * Componente productosForm
 * -----------------------
 * Este componente se utiliza para crear o editar productos.
 * Puede funcionar en dos modos:
 *  - Modo "crear": cuando no hay productos seleccionado (productosToEdit = null)
 *  - Modo "editar": cuando se recibe un producto con sus datos
 *
 * Props:
 *  - productosToEdit: objeto con los datos del producto a editar (puede ser null)
 *  - onSaveComplete: función callback que se ejecuta cuando se guarda correctamente
 */
function ProductosForm({ ProductosToEdit, onSaveComplete }) {

  // -------------------- ESTADOS --------------------
  // Cada campo del formulario tiene su propio estado local controlado.
  // Esto permite reflejar en tiempo real lo que el usuario escribe.
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  

  // -------------------- EFECTO DE SINCRONIZACIÓN --------------------
  // Este useEffect se ejecuta cada vez que cambia la prop productosToEdit.
  // Si existe un productos para editar, los campos se llenan con sus datos.
  // Si no existe (modo creación), se limpian los campos del formulario.
  useEffect(() => {
    if (ProductosToEdit) {
      // Precargar datos del producto seleccionado
      setName(ProductosToEdit.name);
      setPrice(ProductosToEdit.price);
      setDescription(ProductosToEdit.description);
      
    } else {
      // Limpiar el formulario para crear uno nuevo
      setName("");
      setPrice("");
      setDescription("");
      
    }
  }, [ProductosToEdit]); // Se vuelve a ejecutar si cambia productosToEdit

  // -------------------- MANEJO DEL ENVÍO --------------------
  // Esta función controla lo que ocurre al enviar el formulario.
  // Se encarga de crear o actualizar el productos según corresponda.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página por defecto.

    // Construimos un objeto con los datos del formulario
    const newProductos = { name, price, description };

    // Determinamos si el formulario está en modo edición o creación
    const method = ProductosToEdit ? "PUT" : "POST";
    const url = ProductosToEdit
      ? `http://localhost:3000/api/productos/${ProductosToEdit._id}` // Actualizar
      : "http://localhost:3000/api/productos"; // Crear nuevo

    // -------------------- PETICIÓN FETCH --------------------
    // Enviamos los datos al backend (Node.js / Express)
    fetch(url, {
      method, // PUT o POST según el caso
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
      body: JSON.stringify(newProductos), // Convertimos el objeto a texto JSON
    })
      .then((res) => res.json()) // Convertimos la respuesta a formato JSON
      .then((data) => {

        // -------------------- MENSAJE USUARIO --------------------
        // Algunos backends no devuelven el objeto completo en PUT,
        // por eso usamos el nombre local si data.name no existe.
        const nombreMostrar = data.name || name;

        alert(
          ProductosToEdit
            ? `Producto ${nombreMostrar} actualizado`
            : `Producto ${nombreMostrar} creado`
        );

        // -------------------- LIMPIAR FORMULARIO --------------------
        // Esto garantiza que el formulario se resetee después de crear o editar
        setName("");
        setPrice("");
        setDescription("");
        

        // -------------------- NOTIFICAR AL PADRE --------------------
        // Permite refrescar la lista y limpiar selección en App.js
        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err)); // Captura y muestra errores en consola
  };

  // -------------------- RENDERIZADO DEL FORMULARIO --------------------
  // Se muestran los campos de entrada controlados y un botón dinámico.
  // El texto del botón y el título cambian según si se está creando o editando un producto.
  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico del formulario */}
      <h3>{ProductosToEdit ? "Editar Producto" : "Agregar Producto"}</h3>

      {/* Campo de texto: Nombre */}
      <input
        type="text"
        placeholder="Nombre de producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    
      {/* Campo de texto: precio */}
       <input
        type= "number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      {/* Campo de texto: Descripción */}
       <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      

      {/* Botón dinámico (cambia texto según acción) */}
      <button type="submit">
        {ProductosToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

// Exportamos el componente para que pueda ser importado en otros archivos
export default ProductosForm;