import { Link, useParams, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap"; // Importamos Dropdown de Bootstrap
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import { BsArrowLeft } from "react-icons/bs"; // Icono de flecha
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap
import styles from "./Machines.module.css";

const Machines = () => {
  const { barId } = useParams(); // Capturamos el ID del bar desde la URL
  const navigate = useNavigate(); // Para ir hacia atrás
  
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Limpiar sesión
    localStorage.removeItem("username"); // Eliminar usuario
    navigate("/"); // Redirigir a la página principal
  };

  const machinesData = {
    asador4: [
      { id: "m1", name: "Máquina Espresso", status: "Operativa" },
      { id: "m2", name: "Molino de Café", status: "Mantenimiento" }
    ],
    markbar: [
      { id: "m3", name: "Máquina de Capuchino", status: "Operativa" },
      { id: "m4", name: "Prensa Francesa", status: "Reparación" }
    ]
  };

  const machines = machinesData[barId] || [];

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand text-white">HKoffee</span>
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

      {/* Botón de volver */}
      <button className="btn btn-light m-3" onClick={() => navigate(-1)}>
        <BsArrowLeft /> Volver
      </button>

      {/* Título centrado */}
      <h2 className="text-center mt-4">Máquinas en {barId}</h2>

      <div className="container mt-5">
        <div className="row">
          {machines.length > 0 ? (
            machines.map((machine) => (
              <div key={machine.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{machine.name}</h5>
                    <p className="card-text">Estado: <span className={styles.status}>{machine.status}</span></p>
                    <Link to={`/intervencion/${machine.id}`} className="btn btn-primary">
                      Nueva intervención ➕
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted mt-4">No hay máquinas registradas para este bar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Machines;
