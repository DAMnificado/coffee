import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import styles from "./Login.module.css";
import apiConfig from "/config/apiConfig"; // Importa la configuración de la API

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const apiUrl = `${apiConfig.apiBaseUrl}${apiConfig.endpoints.login}`;
      const response = await fetch(apiUrl, { // URL HTTPS
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173" // Añade esto
        },
        body: JSON.stringify({ Nombre: username, Password: password }),
      });
  
      if (!response.ok) {
        setError("❌ Usuario o contraseña incorrectos");
        setLoading(false);
        return;
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/coffee");
    } catch (err) {
      setError("❌ Error de conexión");
      setLoading(false);
    }
  };

  return (
<div className={styles["page-container"]}>
{/* 🌊 Onda superior */}
<div className={styles["wave-top"]}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 500">
<path fill="url(#gradient-top)" fillOpacity="1" d="M0,200L48,210C96,220,192,240,288,220C384,200,480,130,576,110C672,90,768,110,864,130C960,150,1056,160,1152,165C1248,170,1344,180,1392,190L1440,200L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
<defs>
<linearGradient id="gradient-top" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stopColor="#CC8203" />
<stop offset="100%" stopColor="#6B4B05" />
</linearGradient>
</defs>
</svg>
</div>

      {/* Contenedor del Título */}
      <div className={styles["title-container"]}>
        <h1 className={styles.title}>HKoffee</h1>
      </div>

      <form onSubmit={handleLogin}>
        <div className={styles["input-container"]}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            placeholder="Escriba nombre de usuario"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles["input-container"]}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Escriba la contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={`${styles.button} btn btn-success w-100`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>

      <p className={styles.description}>
        H-Koffee by Himikode, es una solución integral impulsadora de datos para
        el universo del café.
      </p>


{/* 🌊 Onda inferior */}
<div className={styles["wave-bottom"]}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
<defs>
<linearGradient id="coffee-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stopColor="#CC8203" />
<stop offset="100%" stopColor="#6B4B05" />
</linearGradient>
</defs>
<path
fill="url(#coffee-gradient)"
fillOpacity="1"
d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
/>
</svg>
</div>
</div>
);
};

export default Login;