import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import { Dropdown } from "react-bootstrap"; // Importamos Dropdown de react-bootstrap
import styles from './CoffeePlaces.module.css'; // Importa el archivo CSS como un módulo
import { BsArrowLeft } from "react-icons/bs";
import { FaArrowRight } from 'react-icons/fa'; // Importamos el icono de la flecha


const CoffeePlaces = () => {
  const [search, setSearch] = useState(""); // Estado para el filtro por nombre
  const [cafes, setCafes] = useState([]); // Estado para almacenar los cafés
  const navigate = useNavigate(); // Para la navegación

  // Recuperamos el nombre del usuario desde localStorage
  const username = localStorage.getItem("username") || "Invitado";

  // Cargar cafés desde localStorage para el usuario actual
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("users")) || {};
    const userCafes = storedData[username]?.cafes || [];
    setCafes(userCafes);
  }, [username]);

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
      {/* Navbar personalizado */}
      <nav className={styles.navbar}>
        <Link to="/" className={styles.brand}>HKoffee</Link>

        {/* Icono de usuario con menú desplegable */}
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" id="dropdown-custom-components" className={styles['user-icon']}>
            <FaUserCircle size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button" onClick={handleLogout} className={styles.logout}>
              Cerrar sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>

      <button className="btn btn-light" onClick={() => window.history.back()}>
        <BsArrowLeft />
      </button>

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
          <div key={cafe.id} className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-4 mb-6">
              <div className={styles.card}>
                <div className={styles['card-body']}>
                  <img src={cafe.image} alt={cafe.name} className={styles['card-img']} />
                  <div className={styles['card-texts']}>
                  <h5 className={styles['card-title']}>
                {cafe.name.length > 18 ? cafe.name.slice(0, 18) + "..." : cafe.name}
              </h5>
                    <p className={styles['card-address']}>{cafe.address}</p>
                  </div>
                  {/* Ahora la flecha está a la derecha */}
                  <Link to={`/machines/${cafe.id}`} className={styles['btn-primary']}>
                    <FaArrowRight size={20} /> {/* Icono de flecha con tamaño de 20px */}
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
