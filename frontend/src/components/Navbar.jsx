import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="nav-bar">
      
      <div className="nav-wrapper container">

        <Link to="/" className="brand-logo">
          <img src="/logo-removebg-preview.png" alt="Logo" width="250"/>
        </Link>

        <h1>Repostería artesanal</h1>

        <div>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/usuarios">Usuarios</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;