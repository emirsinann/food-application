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
  const storedUserJSON = localStorage.getItem("user"); //localstorage dan user bilgileri çekildi
  const userAddress = useSelector((state) => state.userReducer.address); //userAdress reduxtan çekildi
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const [sending, setSending] = useState(false);
  const [selectedOption, setSelectedOption] = useState("creditCard");
  const [selectedAddressId, setSelectedAddressId] = useState(null); // seçilen adresin idsi
  const [addressData, setAddressData] = useState({
    name: "",
    description: "",
    city: "",
    district: "",
  });

  useEffect(() => { // adresleri çekme fonksiyonu
    dispatch(fetchUserAddress(getUserId)); 
  }, []);


  const handleAddressChange = (event) => {
    setSelectedAddressId(event.target.value); // seçilen adresin idsi set edildi radio butonlarından alındı
  };

  // Retrieve stored user data from localStorage

  const getUserId = () => { //user idsi çekildi
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


  const handleDelete = (itemId) => {  //sepetten ürün silme fonksiyonu
    dispatch(removeFromCart(itemId));
  };

  const handleIncrement = (item) => { // sepetteki ürüne +1 ekleme fonksiyonu
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => { // sepetteki üründen -1 çıkarma fonksiyonu
    if (item.quantity > 1) {
      dispatch(decrementCartItemQuantity(item));
    }
  };

  const handleSendOrder = () => { //sipariş gönderme fonksiyonu
    const id = getUserId();
    setSending(true);
    if (!selectedAddressId) {
      alert("Lütfen bir adres seçin");
      setSending(false);
      return;
    }
    if (cartItems.length === 0) {
      alert("Sepetinizde ürün yok");
      setSending(false);
      return;
    } else {
      axios
        .post(
          "/order",
          {
            iscredit: handleCreditChange(selectedOption),
            userId: id,
            adreAddressId: selectedAddressId,
            cartItems: cartItems,
            totalPrice: calculateTotalPrice(),
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
          dispatch(clearCart());
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

  const calculateTotalPrice = () => { //toplam fiyat hesaplama fonksiyonu
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };


  const handleInputChange = (event) => { //adres ekleme formundaki inputların değişimini takip eden fonksiyon
    const { name, value } = event.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => { //adres ekleme formunun submit edilmesini takip eden fonksiyon
    event.preventDefault();

    // Assuming you will send the data to the backend here
    try {
      await axios
        .post(
          "/address",
          {
            name: addressData.name,
            description: addressData.description,
            province: addressData.city,
            district: addressData.district,
          },
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            dispatch(fetchUserAddress(getUserId()));
            console.log("Address created:", addressData);
          } else {
            console.error("Failed to create address");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteAddress = (addressId) => { //adres silme fonksiyonu
    if (window.confirm("Are you sure you want to delete this address?")) {
      axios
        .delete("/address", {
          data: { id: addressId },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          // Update the user's address list after successful deletion
          dispatch(fetchUserAddress(getUserId()));
        })
        .catch((error) => {
          console.error("Error deleting address:", error);
        });
    }
  };

  const handleOptionChange = (event) => { //ödeme şeklini takip eden fonksiyon
    setSelectedOption(event.target.value);
  };


  const handleCreditChange = (selectedOption) => { //ödeme şeklini belirleyen fonksiyon
    if (selectedOption === "creditCard") {
      return true;
    }
    if (selectedOption === "cash") {
      return false;
    }
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
              <p>Sepet Tutarı: {calculateTotalPrice()}₺</p>
              <h6>Ödeme Şekli:</h6>
              <label>
                <input
                  type="radio"
                  value="creditCard"
                  checked={selectedOption === "creditCard"}
                  onChange={handleOptionChange}
                />
                Kredi Kartı
              </label>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={selectedOption === "cash"}
                  onChange={handleOptionChange}
                />
                Nakit
              </label>
              <button onClick={handleSendOrder} disabled={sending}>
                Send order
              </button>
            </Col>
            <Col>
              <h2>User Profile</h2>
              {userAddress &&
                userAddress.map((user) => (
                  <div key={user.addressId}>
                    <p>Adres İsmi : {user.name}</p>
                    <p>Adres Açıklaması : {user.description}</p>
                    <p>İl : {user.province}</p>
                    <p>İlçe : {user.district}</p>
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={user.addressId}
                      onChange={handleAddressChange}
                    />
                    <button onClick={() => handleDeleteAddress(user.addressId)}>
                      Delete Address
                    </button>
                    {/* Display other address fields */}
                  </div>
                ))}
              <hr />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Address Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={addressData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="description">Address Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={addressData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={addressData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="district">District:</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={addressData.district}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Create Address</button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Cart;
