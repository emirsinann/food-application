import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import usericon from "../assets/user-icon.png";
import carticon from "../assets/shopping-cart.png";

function Header() {
  const handleProfileClick = () => {
    // Profil resmi tıklandığında yapılacak işlemler
    console.log("Profil resmi tıklandı");
  };

  const handleCartClick = () => {
    // Sepet resmi tıklandığında yapılacak işlemler
    console.log("Sepet resmi tıklandı");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-text">BURGER BRAND</span>
      </div>
      <div className="navbar-right">
        <img
          className="navbar-icon"
          src={usericon}
          alt="Profile"
          onClick={handleProfileClick}
        />
        <img
          className="navbar-icon"
          src={carticon}
          alt="Cart"
          onClick={handleCartClick}
        />
      </div>
    </div>
  );
}

export default Header;
