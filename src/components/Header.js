import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import user from '../assets/user-icon.png';
import shoppingCart from '../assets/shopping-cart.png';

function Header() {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        // Profil resmi tıklandığında yapılacak işlemler
        console.log('Profil resmi tıklandı');
        return(
            navigate('/login')
        )
    };

    const handleCartClick = () => {
        // Sepet resmi tıklandığında yapılacak işlemler
        console.log('Sepet resmi tıklandı');
        return(
            navigate('/cart')
        )
    };


    return (

        <>
            <header className="navbar">
                <div className="navbar-left">
                    <span className="navbar-text" onClick={()=>navigate('/')}>BURGER BRAND</span>
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
