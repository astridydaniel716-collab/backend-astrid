// Importamos React y los hooks necesarios desde la biblioteca
import React, { useState, useEffect } from "react";

/**
 * Componente usuariosForm
 * -----------------------
 * Este componente se utiliza para crear o editar usuarios.
 * Puede funcionar en dos modos:
 *  - Modo "crear": cuando no hay usuario seleccionado (usuariosToEdit = null)
 *  - Modo "editar": cuando se recibe un usuario con sus datos
 *
 * Props:
 *  - usuariosToEdit: objeto con los datos del usuarios a editar (puede ser null)
 *  - onSaveComplete: función callback que se ejecuta cuando se guarda correctamente
 */
function UsuariosForm({ UsuariosToEdit, onSaveComplete }) {

  // -------------------- ESTADOS --------------------
  // Cada campo del formulario tiene su propio estado local controlado.
  // Esto permite reflejar en tiempo real lo que el usuario escribe.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  // -------------------- EFECTO DE SINCRONIZACIÓN --------------------
  // Este useEffect se ejecuta cada vez que cambia la prop usuariosToEdit.
  // Si existe un usuarios para editar, los campos se llenan con sus datos.
  // Si no existe (modo creación), se limpian los campos del formulario.
  useEffect(() => {
    if (UsuariosToEdit) {
      // Precargar datos del usuario seleccionado
      setName(UsuariosToEdit.name);
      setEmail(UsuariosToEdit.email);
      setPassword(UsuariosToEdit.password);
      
    } else {
      // Limpiar el formulario para crear uno nuevo
      setName("");
      setEmail("");
      setPassword("");
      
    }
  }, [UsuariosToEdit]); // Se vuelve a ejecutar si cambia usuariosToEdit

  // -------------------- MANEJO DEL ENVÍO --------------------
  // Esta función controla lo que ocurre al enviar el formulario.
  // Se encarga de crear o actualizar el usuario según corresponda.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página por defecto.

    // Construimos un objeto con los datos del formulario
    const newUsuarios = { name, email, password };

    // Determinamos si el formulario está en modo edición o creación
    const method = UsuariosToEdit ? "PUT" : "POST";
    const url = UsuariosToEdit
      ? `http://localhost:3000/api/usuarios/${UsuariosToEdit._id}` // Actualizar
      : "http://localhost:3000/api/usuarios"; // Crear nuevo

    // -------------------- PETICIÓN FETCH --------------------
    // Enviamos los datos al backend (Node.js / Express)
    fetch(url, {
      method, // PUT o POST según el caso
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
      body: JSON.stringify(newUsuarios), // Convertimos el objeto a texto JSON
    })
      .then((res) => res.json()) // Convertimos la respuesta a formato JSON
      .then((data) => {

        // -------------------- MENSAJE USUARIO --------------------
        // Algunos backends no devuelven el objeto completo en PUT,
        // por eso usamos el nombre local si data.name no existe.
        const nombreMostrar = data.name || name;

        alert(
          UsuariosToEdit
            ? `Usuario ${nombreMostrar} actualizado`
            : `Usuario ${nombreMostrar} creado`
        );

        // -------------------- LIMPIAR FORMULARIO --------------------
        // Esto garantiza que el formulario se resetee después de crear o editar
        setName("");
        setEmail("");
        setPassword("");
        

        // -------------------- NOTIFICAR AL PADRE --------------------
        // Permite refrescar la lista y limpiar selección en App.js
        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err)); // Captura y muestra errores en consola
  };

  // -------------------- RENDERIZADO DEL FORMULARIO --------------------
  // Se muestran los campos de entrada controlados y un botón dinámico.
  // El texto del botón y el título cambian según si se está creando o editando un usuario.
  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico del formulario */}
      <h3>{UsuariosToEdit ? "Editar Usuario" : "Agregar Usuario"}</h3>

      {/* Campo de texto: Nombre */}
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    
      {/* Campo de texto: email */}
       <input
        type= "email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
       <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      

      {/* Botón dinámico (cambia texto según acción) */}
      <button type="submit">
        {UsuariosToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

// Exportamos el componente para que pueda ser importado en otros archivos
export default UsuariosForm;