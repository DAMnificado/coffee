import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // 👈 Importamos Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 👈 (Opcional) si usas componentes JS de Bootstrap




import { registerSW } from "virtual:pwa-register";

registerSW({
  onRegistered(r) {
    if (r) {
      console.log("✅ Service Worker registrado correctamente.");
    }
  },
  onNeedRefresh() {
    console.log("🔄 Nueva versión disponible. Recarga para actualizar.");
  },
  onOfflineReady() {
    console.log("📴 La aplicación ahora funciona sin conexión.");
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
