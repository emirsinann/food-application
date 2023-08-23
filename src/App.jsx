import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </main>
  );
}

export default App;
