import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../actions/orderActions"; // Import your action
import Header from "../components/Header";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.orderReducer.orders);
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const paymentMethod = (iscredit) => {
    if (iscredit) {
      return "Kredi Kartı";
    } else {
      return "Nakit";
    }
  }

  return (
    <>
      <Header />
      <div className="orders">
        <h1>Your Orders</h1>
        {userOrders &&
          userOrders.map((order) => {
            return (
              <div key={order.orderID}>
                <p>Sipariş Numarası: {order.orderID}</p>
                <p>Ödeme Yöntemi: {paymentMethod(order.iscredit)}</p>
                {order.adre ? (
                  <div>
                    <p>Address İsmi: {order.adre.name}</p>
                    <p>Adres Açıklaması: {order.adre.description}</p>
                    <p>İl: {order.adre.province}</p>
                    <p>İlçe: {order.adre.district}</p>
                  </div>
                ) : (
                  <p>Adres Silindi.</p>
                )}
                {order.order_products.map((product) => {
                  return (
                    <div key={product.opID}>
                      <p>Ürün : {product.product.name}</p>
                      <p>Fiyat : {product.product.price}</p>
                      <p>Miktar : {product.quantity}</p>
                    </div>
                  );
                })}
                <p>{order.totalPrice}</p>
                <hr />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrdersPage;
