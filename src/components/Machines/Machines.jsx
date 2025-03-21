import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import { Dropdown } from "react-bootstrap"; // Importamos Dropdown de react-bootstrap
import styles from './Machines.module.css'; // Importa el archivo CSS como un módulo
import { BsArrowLeft } from "react-icons/bs";
import { FaArrowRight } from 'react-icons/fa'; // Importamos el icono de la flecha

const Machines = () => {
  const [search, setSearch] = useState(""); // Estado para el filtro por nombre
  const [machines, setMachines] = useState([]); // Estado para almacenar las máquinas
  const navigate = useNavigate(); // Para la navegación

  // Recuperamos el nombre del usuario desde localStorage
  const username = localStorage.getItem("username") || "Invitado";

  // Cargar máquinas de ejemplo desde datos ficticios
  useEffect(() => {
    // Datos ficticios de las máquinas
    const fetchedMachines = [
      { id: 1, name: "Máquina Espressdfsdfdsfsdfsdfsdfsdfsdfsfdso", image: "/images/nespreso.jpg", code: "ESP123" },
      { id: 2, name: "Máquina Cappuccino", image: "/images/nespreso.jpg", code: "CAP456" },
      { id: 3, name: "Máquina Latte", image: "/images/nespreso.jpg", code: "LAT789" },
      { id: 4, name: "Máquina Mocha", image: "/images/nespreso.jpg", code: "MOC101" },
    ];
    setMachines(fetchedMachines);
  }, []);

  // Filtrar las máquinas según el texto de búsqueda
  const filteredMachines = machines.filter(machine =>
    machine.name.toLowerCase().includes(search.toLowerCase())
  );

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Limpiar sesión
    localStorage.removeItem("username"); // Eliminar usuario
    navigate("/"); // Redirigir a la página principal
  };

  return (
    <div className="container-fluid">
      {/* Navbar reutilizado del componente CoffeePlaces */}
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

      {/* Bar: */}
      <div>

      </div>

      <div className="container mt-5">
        {/* Mostrar las máquinas filtradas */}
        <div className="row">
          {filteredMachines.map((machine) => (
            <div key={machine.id} className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-4 mb-6">
              <div className={styles.card}>
                <div className={styles['card-body']}>
                  <img src={machine.image} alt={machine.name} className={styles['card-img']} />
                  <div className={styles['card-texts']}>
                    <h5 className={styles['card-title']}>
                      {machine.name.length > 18 ? machine.name.slice(0, 18) + "..." : machine.name}
                    </h5>
                    <p className={styles['card-code']}>Código: {machine.code}</p>
                  </div>
                  {/* Ahora la flecha está a la derecha */}
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
