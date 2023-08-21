import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import user from '../assets/user-icon.png';
import shoppingCart from '../assets/shopping-cart.png';

function Header() {

    const handleProfileClick = () => {
        // Profil resmi tıklandığında yapılacak işlemler
        console.log('Profil resmi tıklandı');
    };

    const handleCartClick = () => {
        // Sepet resmi tıklandığında yapılacak işlemler
        console.log('Sepet resmi tıklandı');
    };


    return (

        <>
            <header className="navbar">
                <div className="navbar-left">
                    <span className="navbar-text">BURGER BRAND</span>
                </div>
                <div className="navbar-right">
                    <img
                        className="navbar-icon"
                        src= {user}
                        alt="Profile"
                        onClick={handleProfileClick}
                    />
                    <img
                        className="navbar-icon"
                        src= {shoppingCart}
                        alt="Cart"
                        onClick={handleCartClick}
                    />
                </div>
            </header>

        </>
    )
}

export default Header
