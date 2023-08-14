import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

export default function ProductList() {
    return (
        <div className='product-list'>
            <div className='divider-bar'></div>
            <div className="list-group">
                <ListGroup key="md" horizontal="md" defaultActiveKey="#link1" variant='flush'>
                    <ListGroup.Item className='list-group-item' action href="#link1">Burgerler</ListGroup.Item>
                    <ListGroup.Item className='list-group-item' action href="#link2">Aperatifler</ListGroup.Item>
                    <ListGroup.Item className='list-group-item' action href="#link3">Tatlılar</ListGroup.Item>
                    <ListGroup.Item className='list-group-item' action href="#link4">İçecekler</ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}
