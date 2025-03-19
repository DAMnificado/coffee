import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(""); // Usuario ingresado
  const [password, setPassword] = useState(""); // Contraseña ingresada
  const [error, setError] = useState(null); // Errores del login
  const [loading, setLoading] = useState(false); // Estado de carga
  const [users, setUsers] = useState([]); // Lista de usuarios de la API
  const navigate = useNavigate();

  // Llamada a la API falsa para obtener usuarios cuando el componente se monta
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        // Simulamos contraseñas generando un valor fijo para todos
        const usersWithPasswords = data.map(user => ({
          ...user,
          password: "12345" // Todos los usuarios tendrán esta contraseña ficticia
        }));
        setUsers(usersWithPasswords);
      } catch (err) {
        console.error("Error cargando usuarios", err);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Buscar si el usuario ingresado existe
    const user = users.find((user) => user.username === username);

    if (!user) {
      setError("❌ Usuario no encontrado");
    } else if (password !== user.password) {
      setError("❌ Contraseña incorrecta");
    } else {
      localStorage.setItem("auth", "true");
      localStorage.setItem("username", user.username); // Guardar el usuario autenticado
      navigate("/coffee");
    }

    setLoading(false);
  };

  return (
    <div className={styles["login-container"]}>
      <h2 className={styles.title}>HKoffee</h2>

      <div className={styles["login-card"]}>
        <form onSubmit={handleLogin}>
          <div className={styles["input-container"]}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              placeholder="Escriba nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles["input-container"]}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Escriba la contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>

        <p className={styles.description}>
          H-Koffee by Himikode, es una solución integral impulsadora de datos para el universo del café.
        </p>
      </div>

      {/* Lista de usuarios falsos para probar */}
      <div className={styles["debug-box"]}>
        
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>Usuario:</strong> {user.username} | <strong>Contraseña:</strong> {user.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Login;
