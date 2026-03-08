import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

  <h2>Bienvenid@ al sistema</h2>

  <p className="home-text">
    Gestiona los productos y usuarios de Valencia Cake's
  </p>

  <div className="home-buttons">
   <button className="btn-home" onClick={() => navigate("/productos")}>
  📦 Productos
</button>

<button className="btn-home" onClick={() => navigate("/usuarios")}>
  👤 Usuarios
</button>
  </div>

</div>
  );
}

export default Home;
