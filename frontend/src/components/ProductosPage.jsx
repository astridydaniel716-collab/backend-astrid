import React, { useState, useEffect } from "react";
import ProductosForm from "./productosform";
import ProductosList from "./productoslist";

function ProductosPage() {

  const [selectedProductos, setSelectedProductos] = useState(null);
  const [productos, setProductos] = useState([]);

  const fetchProductos = () => {
    fetch("http://localhost:3000/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEdit = (producto) => {
    setSelectedProductos(producto);
  };

  const handleSaveComplete = () => {
    setSelectedProductos(null);
    fetchProductos();
  };

  return (
    <div className="container-main">
      <h2>Gestión de Productos</h2>

      <ProductosForm
        ProductosToEdit={selectedProductos}
        onSaveComplete={handleSaveComplete}
      />

      <ProductosList
        Productos={productos}
        onEdit={handleEdit}
        onDeleted={fetchProductos}
      />
    </div>
  );
}

export default ProductosPage;