import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "../api/axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementCartItemQuantity,
  removeFromCart,
  clearCart,
} from "../actions/cartAction";
import { fetchUserAddress } from "../actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.userReducer.address);

  useEffect(() => {
    dispatch(fetchUserAddress(getUserId));
  }, []);

  console.log("User Address:", userAddress);
  // Retrieve stored user data from localStorage
  const storedUserJSON = localStorage.getItem("user");

  const getUserId = () => {
    if (storedUserJSON) {
      // Parse the stored user data
      const storedUser = JSON.parse(storedUserJSON);

      // Access the user ID
      const id = storedUser.id;
      return id;
    } else {
      console.log("No user data found in localStorage");
    }
  };

  const [sending, setSending] = useState(false);
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
    setSending(true);
    if (cartItems.length === 0) {
      alert("Sepetinizde ürün yok");
      setSending(false);
      return;
    } else {
      axios
        .post(
          "/order",
          {
            iscredit: true,
            userId: id,
            adreAddressId: 1,
            cartItems: cartItems,
          },
          {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch(clearCart())
          alert("Siparişiniz başarıyla gönderildi!");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setSending(false);
        });
    }
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
        <Container fluid>
          <Row>
            <Col>
              <h2>Sepetim</h2>
              {cartItems.map((item) => (
                <div key={item.productID}>
                  <p>{item.name}</p>
                  <p>Adet: {item.quantity}</p>
                  <p>Adet Fiyatı: {item.price}₺</p>
                  <p>Toplam Fiyat: {item.price * item.quantity}₺</p>
                  <button onClick={() => handleIncrement(item)}>+</button>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <button onClick={() => handleDelete(item.productID)}>
                    Sil
                  </button>
                  <hr />
                </div>
              ))}
              <p>Total Cart Price: {calculateTotalPrice()}₺</p>
              <button onClick={handleSendOrder} disabled={sending}>
                Send order
              </button>
            </Col>
            <Col>
              <h2>User Profile</h2>
              {userAddress &&
                userAddress.map((user) => (
                  <div key={user.addressId}>
                    <p>Name: {user.name}</p>
                    <p>id: {user.userId}</p>
                    <p>id: {user.addressId}</p>
                    {/* Display other address fields */}
                  </div>
                ))}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Cart;
