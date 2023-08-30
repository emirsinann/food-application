import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../actions/orderActions"; // Import your action
import Header from "../components/Header";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.orderReducer.orders);
  console.log("User Orders:", userOrders);
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="orders">
        <h1>Your Orders</h1>
        {userOrders &&
          userOrders.map((order) => {
            return (
              <div key={order.orderID}>
                <p>Order ID: {order.orderID}</p>
                <p>Kredi Karti?: {order.iscredit}</p>
                <p>User: {order.userId}</p>
                <p>adress: {order.adreAddressId}</p>
                {order.order_products.map((product) => {
                  return (
                    <div key={product.opID}>
                      <p>{product.product.name}</p>
                      <p>{product.product.price}</p>
                      <p>{product.quantity}</p>
                    </div>
                  )
                })}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OrdersPage;
