import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import { Dropdown } from "react-bootstrap"; // Importamos Dropdown de react-bootstrap
import styles from './CoffeePlaces.module.css'; // Importa el archivo CSS como un módulo
import { BsArrowLeft } from "react-icons/bs";
import { FaArrowRight } from 'react-icons/fa'; // Importamos el icono de la flecha
import apiConfig from "/config/apiConfig"; // Importa la configuración de la API

const CoffeePlaces = () => {
  const [search, setSearch] = useState(""); // Estado para el filtro por nombre
  const [bares, setBares] = useState([]); // Estado para almacenar los bares
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Para la navegación

  // Recuperamos el token y el nombre del usuario desde localStorage
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "Invitado";

  // Redirigir al inicio si no hay token
  useEffect(() => {
    if (!token) {
      console.log("❌ Token no encontrado. Redirigiendo...");
      navigate("/");
      return; // Detener la ejecución
    }


  
    // Cargar bares desde el endpoint /api/bares
    const fetchBares = async () => {
      try {
        const apiUrl = `${apiConfig.apiBaseUrl}${apiConfig.endpoints.bares}`;
        console.log("➡️ Solicitando datos de bares...");
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Usamos el token JWT para autenticar
            "Content-Type": "application/json",
          },
        });

        console.log("⬅️ Respuesta recibida:", response.status);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("📦 Datos recibidos:", data); // Verificar estructura de datos

        // Validar que los datos sean un array y tengan la estructura correcta
        if (!Array.isArray(data)) {
          throw new Error("Los datos recibidos no son válidos");
        }

        setBares(data);
      } catch (err) {
        console.error("🚨 Error:", err);
        setError("❌ Error al cargar los bares");
      } finally {
        setLoading(false);
      }
    };

    fetchBares();
  }, [token, navigate]);

  // Filtrar los bares según el texto de búsqueda
  const filteredBares = bares
    .filter(bar => bar && bar.nombre && bar.localizacion) // Asegúrate de que cada bar tenga las propiedades correctas
    .filter(bar =>
      bar.nombre.toLowerCase().includes(search.toLowerCase())
    );

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpiar token
    localStorage.removeItem("username"); // Eliminar usuario
    navigate("/"); // Redirigir a la página principal
  };

  // Si no hay bares disponibles, muestra un mensaje
  if (!Array.isArray(bares) || bares.length === 0) {
    return <p>No se encontraron bares.</p>;
  }

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
        {/* Mostrar mensaje de error si ocurre */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Mostrar mensaje de carga mientras se obtienen los datos */}
        {loading && <p>Cargando bares...</p>}

        {/* Mostrar los bares filtrados */}
        <div className="row">
          {filteredBares.length === 0 && !loading && (
            <p>No hay bares que coincidan con la búsqueda.</p>
          )}

          {filteredBares.map((bar) => (
            <div key={bar.id} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className={styles.card}>
                <div className={styles['card-body']}>
                  {/* Mostrar la imagen a la izquierda */}


                  {/* TODO cambiar url para que sea dinamica */}
                  <img
                    src={`https://localhost:7292/${bar.imagen}`} // URL de la imagen
                    alt={bar.nombre}  
                    className={styles['card-img']} // Aplica los estilos para la imagen
                  />

                  <div className={styles['card-texts']}>
                    <h5 className={styles['card-title']}>
                      {bar.nombre.length > 18 ? bar.nombre.slice(0, 18) + "..." : bar.nombre}
                    </h5>
                    <p className={styles['card-address']}>{bar.localizacion}</p>
                  </div>

                  {/* Botón para ver máquinas del bar */}
                  <Link to={`/machines/${bar.id}`} className={styles['btn-primary']}>
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