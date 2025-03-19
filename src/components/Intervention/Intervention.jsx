import { useParams, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap"; // Importamos Bootstrap
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import { BsArrowLeft } from "react-icons/bs"; // Icono de volver
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap
import styles from "./Intervention.module.css";

const Intervention = () => {
  const { machineId } = useParams(); // Capturamos el ID de la máquina
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Limpiar sesión
    localStorage.removeItem("username"); // Eliminar usuario
    navigate("/"); // Redirigir a la página principal
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(`Intervención registrada para la máquina: ${machineId}`);
    navigate(-1); // Regresar a la lista de máquinas
  };

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

      <div className="container mt-5">
        <h2 className="text-center">Nueva intervención</h2>
        <p className="text-center text-muted">Máquina: {machineId}</p>

        <form onSubmit={handleRegister} className="mt-4">
          <div className="mb-3">
            <label className="form-label">Tipo de intervención:</label>
            <select className="form-select" required>
              <option value="Cambio">Cambio de fresas</option>
              <option value="Generica">Genérica</option>
              <option value="Revisión">Revisión</option>
              <option value="Calibración">Calibración presage</option>
              <option value="Polea">Cambio polea motor</option>
              <option value="Interruptor">Cambio interruptor activación</option>
              <option value="Limpieza">Limpieza general</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <textarea className="form-control" placeholder="Introduce una breve descripción"></textarea>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-primary">Registrar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Intervention;
