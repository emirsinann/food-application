import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import burger from '../assets/burger1.jpg';
import addcart from '../assets/add-to-cart.png'
import drink from '../assets/drink.png'
import desert from '../assets/desert.png'
import chips from '../assets/chips.png'

const totalData = [
    {
        id: 1,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 2,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 3,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'

    },
    {
        id: 4,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 5,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 6,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 7,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 8,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 9,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 10,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 11,
        name: 'Burger 1',
        price: 10,
        image: burger,
        category: 'Burgerler'
    },
    {
        id: 12,
        name: 'chips 1',
        price: 10,
        image: chips,
        category: 'Aperatifler'
    },
    {
        id: 13,
        name: 'chips 1',
        price: 10,
        image: chips,
        category: 'Aperatifler'
    },
    {
        id: 14,
        name: 'chips 1',
        price: 10,
        image: chips,
        category: 'Aperatifler'
    },
    {
        id: 15,
        name: 'chips 1',
        price: 10,
        image: chips,
        category: 'Aperatifler'
    },
    {
        id: 16,
        name: 'chips 1',
        price: 10,
        image: chips,
        category: 'Aperatifler'
    },
    {
        id: 17,
        name: 'chips 1',
        price: 10,
        image: chips,
        category: 'Aperatifler'
    },
    {
        id: 18,
        name: 'desert 1',
        price: 10,
        image: desert,
        category: 'Tatlılar'
    },
    {
        id: 19,
        name: 'desert 1',
        price: 10,
        image: desert,
        category: 'Tatlılar'
    },
    {
        id: 20,
        name: 'desert 1',
        price: 10,
        image: desert,
        category: 'Tatlılar'
    },
    {
        id: 21,
        name: 'desert 1',
        price: 10,
        image: desert,
        category: 'Tatlılar'
    },
    {
        id: 22,
        name: 'desert 1',
        price: 10,
        image: desert,
        category: 'Tatlılar'
    },
    {
        id: 23,
        name: 'desert 1',
        price: 10,
        image: desert,
        category: 'Tatlılar'
    },
    {
        id: 24,
        name: 'drink 1',
        price: 10,
        image: drink,
        category: 'İçecekler'
    },
    {
        id: 25,
        name: 'drink 1',
        price: 10,
        image: drink,
        category: 'İçecekler'
    },
    {
        id: 26,
        name: 'drink 1',
        price: 10,
        image: drink,
        category: 'İçecekler'
    },
    {
        id: 27,
        name: 'drink 1',
        price: 10,
        image: drink,
        category: 'İçecekler'
    },
    {
        id: 28,
        name: 'drink 1',
        price: 10,
        image: drink,
        category: 'İçecekler'
    },
    {
        id: 29,
        name: 'drink 1',
        price: 10,
        image: drink,
        category: 'İçecekler'
    },
]

export default function ProductList() {

    const [data, setData] = useState(totalData);
    const filterResult = (catItem) => {
        const result = totalData.filter((item) => {
            return item.category === catItem;
        });
        setData(result);
    }

    useEffect(() => { //first page load data check
        filterResult("Burgerler");
    }, []);

    return (
        <div className='product-list'>
            <div className='divider-bar'></div>
            <div className="list">
                <ListGroup key="sm" horizontal="sm" defaultActiveKey="#burgerler">
                    <ListGroup.Item action href="#burgerler" onClick={() => filterResult("Burgerler")}>Burgerler</ListGroup.Item>
                    <ListGroup.Item action href="#aperatifler" onClick={() => filterResult("Aperatifler")}>Aperatifler</ListGroup.Item>
                    <ListGroup.Item action href="#tatlilar" onClick={() => filterResult("Tatlılar")}>Tatlılar</ListGroup.Item>
                    <ListGroup.Item action href="#icecekler" onClick={() => filterResult("İçecekler")}>İçecekler</ListGroup.Item>
                </ListGroup>
            </div>
            <div className="products">
                <Container fluid>
                    <Row >
                        {data.map((item) => (
                            <Col xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
                                <div className="product">
                                    <Image src={item.image} className='product-image' />
                                    <div className="product-divider"></div>
                                    <div className="bottom-section">
                                        <div className="product-name"><h5>{item.name}</h5></div>
                                        <a href='/' className='add-cart'><Image src={addcart} /></a>
                                    </div>
                                    <div className="product-price"><strong>{item.price}₺</strong></div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    )
}
