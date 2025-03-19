import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de tener Bootstrap
import { Dropdown } from "react-bootstrap"; // Importamos Dropdown de react-bootstrap
import styles from './CoffeePlaces.module.css';  // Importa el archivo CSS como un módulo
import { BsArrowLeft } from "react-icons/bs";
const CoffeePlaces = () => {
  const [search, setSearch] = useState(""); // Estado para el filtro por nombre
  const navigate = useNavigate(); // Para la navegación

  // Recuperamos el nombre del usuario desde localStorage
  const username = localStorage.getItem("username") || "Invitado";

  const cafes = [
    {
      name: "Asador 4",
      address: "Calle X, 123",
      status: "Ver máquinas",
      image: "/images/res1.jpg", // Añadir imágenes reales en la carpeta pública
      id: "asador4"
    },
    {
      name: "Markbar",
      address: "Calle Y, 456",
      status: "Ver máquinas",
      image: "/images/res2.jpg",
      id: "markbar"
    },
    // Agrega más cafés si lo deseas
  ];

  // Filtrar los cafés según el texto de búsqueda
  const filteredCafes = cafes.filter(cafe =>
    cafe.name.toLowerCase().includes(search.toLowerCase())
  );

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Limpiar sesión
    localStorage.removeItem("username"); // Eliminar usuario
    navigate("/"); // Redirigir a la página principal
  };


  return (
    <div className="container-fluid">
      {/* Navbar de Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          {/* Nombre de la app */}
          <span className="navbar-brand text-white">HKoffee</span>

          {/* Icono de usuario con menú desplegable */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="dropdown-custom-components" className="text-white">
              <FaUserCircle size={24} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
      <button className="btn btn-light" onClick={() => window.history.back()}>
        <BsArrowLeft />
      </button>

      {/* Nombre del usuario en la parte superior */}
      <h2 className="text-center mt-4">Bares de {username}</h2>

      {/* Barra de búsqueda centrada */}
      <div className="container mt-5 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container mt-5">
        {/* Mostrar los cafés filtrados */}
        <div className="row">
          {filteredCafes.map((cafe) => (
            <div key={cafe.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <img src={cafe.image} alt={cafe.name} className={styles['card-img']} />
                  <h5 className="card-title">{cafe.name}</h5>
                  <p className="card-text">{cafe.address}</p>
                  <Link to={`/machines/${cafe.id}`} className="btn btn-primary">
                    {cafe.status}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeePlaces;
