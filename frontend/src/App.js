// Importamos React y los hooks necesarios
import React, { useState, useEffect } from "react";

// Importamos los componentes hijos que conforman nuestra aplicación
import UsuariosForm from "./components/usuariosform"; // Formulario para crear/editar empleados
import UsuariosList from "./components/usuarioslist"; // Listado de empleados
import './App.css'; // Estilos globales opcionales

/**
 * Componente principal: App
 * -------------------------
 * Este componente orquesta toda la aplicación de Gestión de Empleados.
 * Se encarga de manejar el estado compartido entre EmployeeForm y EmployeeList.
 *
 * Funcionalidades:
 *  - Permite seleccionar un empleado para editarlo.
 *  - Limpia el formulario después de guardar.
 *  - Renderiza el formulario y la lista de empleados.
 */
function App() {

  // -------------------- ESTADO PRINCIPAL --------------------
  // selectedEmployee almacena el empleado que se está editando actualmente.
  // Si es null, el formulario se usa para crear un nuevo empleado.
  const [selectedUsuarios, setSelectedUsuarios] = useState(null);
 

  // -------------------- ESTADO LISTA EMPLEADOS --------------------
  // employees almacena la lista de empleados obtenida desde la API.
  const [Usuarios, setUsuarios] = useState([]);
  

  // -------------------- FUNCIÓN: CONSULTAR EMPLEADOS --------------------
  // Obtiene todos los empleados desde la API y actualiza el estado.
  const fetchUsuarios = () => {
    fetch("http://localhost:3000/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error:", err));
  }

  
  // -------------------- useEffect INICIAL --------------------
  // Se ejecuta al cargar la aplicación por primera vez
  // y obtiene la lista de empleados desde el backend.
  useEffect(() => {
    fetchUsuarios();
  }, []);
  

  // -------------------- FUNCIÓN: EDITAR --------------------
  /**
   * handleEdit se ejecuta cuando el usuario hace clic en "Editar" desde EmployeeList.
   * Recibe un objeto empleado y lo almacena en el estado selectedEmployee.
   * Esto hace que EmployeeForm cargue sus datos para editar.
   */
  const handleEdit = (Usuarios) => {
    setSelectedUsuarios(Usuarios);
  };
  

  // -------------------- FUNCIÓN: GUARDAR COMPLETADO --------------------
  /**
   * handleSaveComplete se ejecuta cuando el formulario termina de guardar o actualizar
   * un empleado correctamente. Limpia el estado selectedEmployee para resetear el formulario
   * y recarga la lista de empleados desde la API.
   */
  const handleSaveComplete = () => {
    setSelectedUsuarios(null);
    fetchUsuarios(); // 🔥 Refresca la tabla automáticamente
  };
  

  // -------------------- RENDERIZADO --------------------
  // Estructura visual principal de la aplicación.
  return (
    <div className="container-main">

      {/* Título principal */}
      <h1>Gestión de Usuarios</h1>

      {/* Formulario de creación/edición */}
      <UsuariosForm
        UsuariosToEdit={selectedUsuarios}       // Prop: empleado actual a editar
        onSaveComplete={handleSaveComplete}     // Prop: callback al guardar
      />

      {/* Lista de empleados */}
      <UsuariosList
        Usuarios={Usuarios}                   // 🔥 lista actualizada desde App
        onEdit={handleEdit}                     // Prop: función que se ejecuta al editar
        onDeleted={fetchUsuarios}              // 🔥 recarga tras eliminar
      />

    </div>
  );
  
}

// Exportamos el componente para que sea usado en index.js
export default App;