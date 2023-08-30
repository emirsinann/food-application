import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartAction";
import burger from "../assets/burger1.jpg";
import addcart from "../assets/add-to-cart.png";


export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartReducer.products);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  useEffect(() => {
    dispatch(fetchProducts());

  }, [dispatch]);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(products);
  }, [products]);

  const filterResult = (catItem) => {
    const result = products.filter((item) => {
      return item.categoryCategoryID === catItem;
    });
    setData(result);
  };

  useEffect(() => {
    //cart item check
    console.log(cartItems);
  }, [cartItems] );

  return (
    <div className="product-list">
      <div className="divider-bar"></div>
      <div className="list">
        <ListGroup key="sm" horizontal="sm" >
          <ListGroup.Item
            action
            href="#burgerler"
            onClick={() => filterResult(1)}
          >
            Burgerler
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#aperatifler"
            onClick={() => filterResult(2)}
          >
            Aperatifler
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#tatlilar"
            onClick={() => filterResult(3)}
          >
            Tatlılar
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#icecekler"
            onClick={() => filterResult(4)}
          >
            İçecekler
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="products">
        <Container fluid>
          <Row>
            {data.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3} xl={3} key={item.productID}>
                <div className="product">
                  <Image src={burger} className="product-image" />
                  <div className="product-divider"></div>
                  <div className="bottom-section">
                    <div className="product-name">
                      <h5>{item.name}</h5>
                    </div>
                    <div className="add-cart">
                      <Image src={addcart} onClick={()=>dispatch(addToCart(item))}/>
                    </div>
                  </div>
                  <div className="product-price">
                    <strong>{item.price}₺</strong>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
