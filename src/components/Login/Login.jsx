import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data.map(user => ({ ...user, password: "12345" })));
      } catch (err) {
        console.error("Error cargando usuarios", err);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const user = users.find((u) => u.username === username);

    if (!user) {
      setError("❌ Usuario no encontrado");
    } else if (password !== user.password) {
      setError("❌ Contraseña incorrecta");
    } else {
      localStorage.setItem("auth", "true");
      localStorage.setItem("username", user.username);
      navigate("/coffee");
    }

    setLoading(false);
  };

return (
  <div className={styles["page-container"]}>
  {/* 🌊 Onda superior */}

  <div className={styles["wave-top"]}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#0099ff" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,149.3C384,128,480,64,576,42.7C672,21,768,43,864,58.7C960,75,1056,85,1152,90.7C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
    </svg>
  </div>

  {/* Contenedor del Login */}
  <div className={styles["login-container"]}>
    <h2 className={styles.title}>HKoffee</h2>

    <form className={styles["login-form"]}>
      <div className={styles["input-container"]}>
        <FaUser className={styles.icon} />
        <input type="text" placeholder="Escriba nombre de usuario" required />
      </div>

      <div className={styles["input-container"]}>
        <FaLock className={styles.icon} />
        <input type="password" placeholder="Escriba la contraseña" required />
      </div>

      <button type="submit" className={styles.button}>Entrar</button>
    </form>

    <p className={styles.description}>
      H-Koffee by Himikode, es una solución integral impulsadora de datos para el universo del café.
    </p>
  </div>

  {/* 🌊 Onda inferior */}
  <div className={styles["wave-bottom"]}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#0099ff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
    </svg>
  </div>
</div>
);
};
export default Login;
