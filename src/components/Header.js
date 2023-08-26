import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import shoppingCart from "../assets/shopping-cart.png";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

function Header() {
  const auth = useAuth();

  const navigate = useNavigate();

  const logout = useLogout();

  const signOut = async () => {
      await logout();
      navigate('/login');
      window.location.reload();
  }

  return (
    <header>
      <Container fluid>
        <Row className="navbar">
          <Col className="navbar-left" md={4}>
            <span className="navbar-text" onClick={() => navigate("/")}>
              BURGER BRAND
            </span>
          </Col>
          <Col className="navbar-right" md={4}>
            {!auth.auth.email && <strong className="navbar-logout" onClick={() => navigate("/login")}>Giriş Yap</strong>} 
            {auth.auth.email && <strong className="navbar-logout" onClick={()=> navigate("/orders")}>Siparişlerim</strong>}
            <img
              className="navbar-icon"
              src={shoppingCart}
              alt="Cart"
              onClick={() => navigate("/cart")}
              />
            {auth.auth.email && <strong className="navbar-logout" onClick={signOut}>Çıkış Yap</strong>}
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
