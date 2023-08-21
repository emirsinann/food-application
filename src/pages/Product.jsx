import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import ProductList from '../components/ProductList'
import Register from '../components/Register'
import Login from '../components/Login'

export default function Product() {
  return (
    <div>
        <Header/>
        <Login/>
        <Register/>
        {/* <Slider/>
        <ProductList/>
        <Footer/> */}
    </div>
  )
}
