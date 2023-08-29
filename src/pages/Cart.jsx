import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "../api/axios";
import authHeader from "../services/auth-header";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementCartItemQuantity,
  removeFromCart,
} from "../actions/cartAction";

const Cart = () => {
  // Retrieve stored user data from localStorage
  const storedUserJSON = localStorage.getItem("user");


  const getUserId = () => {
      if (storedUserJSON) {
        // Parse the stored user data
        const storedUser = JSON.parse(storedUserJSON);
  
        // Access the user ID
        const id = storedUser.id;
        console.log("User ID:", id);
        return id;
      } else {
        console.log("No user data found in localStorage");
      }
  };

  const getAccessToken = () => {
    if (storedUserJSON) {
      // Parse the stored user data
      const storedUser = JSON.parse(storedUserJSON);

      // Access the user ID
      const acces_token = storedUser.acces_token;
      console.log("Access Token:", acces_token);
      return acces_token;
    } else {
      console.log("No user data found in localStorage");
    }
  };

  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const handleDelete = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(decrementCartItemQuantity(item));
    }
  };

  const handleSendOrder = () => {
    const id = getUserId();
    const acces_token = getAccessToken();
    console.log("User ID in send:", id);
    setSending(true);

    axios
      .post(
        "/order",
        {
          iscredit: true,
          userId: id,
        },
        {
        "Authorization": `Bearer ${acces_token}`, //mind the space before your token
        "Content-Type": "application/json",
        "x-access-token": acces_token,
         }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <div>
      <Header />
      <div className="cart">
        <h2>Sepetim</h2>
        {cartItems.map((item) => (
          <div key={item.productID}>
            <p>{item.name}</p>
            <p>Adet: {item.quantity}</p>
            <p>Adet Fiyatı: {item.price}₺</p>
            <p>Toplam Fiyat: {item.price * item.quantity}₺</p>
            <button onClick={() => handleIncrement(item)}>+</button>
            <button onClick={() => handleDecrement(item)}>-</button>
            <button onClick={() => handleDelete(item.productID)}>Sil</button>
            <hr />
          </div>
        ))}
        <p>Total Cart Price: {calculateTotalPrice()}₺</p>
      </div>
      <button onClick={handleSendOrder} disabled={sending}>
        Send order
      </button>
    </div>
  );
};

export default Cart;
