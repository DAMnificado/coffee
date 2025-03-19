import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import CoffeePlaces from "./components/CoffeePlaces/CoffeePlaces";
import Machines from "./components/Machines/Machines";
import Intervention from "./components/Intervention/Intervention";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/coffee" element={<CoffeePlaces />} />
        <Route path="/machines/:barId" element={<Machines />} />
        <Route path="/intervencion/:machineId" element={<Intervention />} />
      </Routes>
    </Router>
  );
}

export default App;