import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import { Dropdown } from "react-bootstrap"; // Importamos Dropdown de react-bootstrap
import styles from './Machines.module.css'; // Importa el archivo CSS como un módulo
import { BsArrowLeft } from "react-icons/bs";
import { FaArrowRight } from 'react-icons/fa'; // Importamos el icono de la flecha
import apiConfig from "/config/apiConfig"; // Importa la configuración de la API

const Machines = () => {
  const [machines, setMachines] = useState([]); // Estado para almacenar las máquinas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Para la navegación
  const { barId } = useParams(); // Obtiene el ID del bar desde los parámetros de la URL

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

    // Cargar máquinas asociadas al bar con el ID proporcionado
    const fetchMachines = async () => {
      try {
        console.log("➡️ Solicitando datos de máquinas...");
        const apiUrl = `${apiConfig.apiBaseUrl}${apiConfig.endpoints.machinesByBar}/${barId}`;
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

        setMachines(data);
      } catch (err) {
        console.error("🚨 Error:", err);
        setError("❌ Error al cargar las máquinas");
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, [token, navigate, barId]);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpiar token
    localStorage.removeItem("username"); // Eliminar usuario
    navigate("/"); // Redirigir a la página principal
  };

  // Si no hay máquinas disponibles, muestra un mensaje
  if (!Array.isArray(machines) || machines.length === 0) {
    return <p>No se encontraron máquinas para este bar.</p>;
  }

  return (
    <div className="container-fluid">
      {/* Navbar reutilizado */}
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

      <div className="container mt-5">
        {/* Mostrar mensaje de error si ocurre */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Mostrar mensaje de carga mientras se obtienen los datos */}
        {loading && <p>Cargando máquinas...</p>}

        {/* Mostrar las máquinas */}
        <div className="row">
          {machines.map((machine) => (
            <div key={machine.id} className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-4 mb-6">
              <div className={styles.card}>
                <div className={styles['card-body']}>
                  {/* Imagen de la máquina */}
                  <img
                    src={`${apiConfig.apiBaseUrl}${machine.imagen}`} // Construye la URL de la imagen
                    alt={machine.nombre}
                    className={styles['card-img']}
                  />
                  <div className={styles['card-texts']}>
                    <h5 className={styles['card-title']}>
                      {machine.nombre.length > 18 ? machine.nombre.slice(0, 18) + "..." : machine.nombre}
                    </h5>
                    <p className={styles['card-code']}>Código: {machine.codigo}</p>
                  </div>
                  {/* Botón para ver detalles de la máquina */}
                  <Link to={`/machine/${machine.id}`} className={styles['btn-primary']}>
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

export default Machines;