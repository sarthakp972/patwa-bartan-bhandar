import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/myContext'
import Herosection from '../../components/herosection/Herosection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productcard/ProductCard'
import Testimonial from '../../components/testimonial/Testimonial'
import Track from '../../components/Track/Track'
// import { useDispatch, useSelector } from 'react-redux'
// import { addToCart, deleteFromCart } from '../../redux/cartSlice'

export default function Home() {
  // const context=useContext(MyContext)
  // console.log(context)
  // const {name, rollno}=context;
  // const dispatch=useDispatch();
  // const cartItem = useSelector((state)=> state.cart)
  // console.log(cartItem);

  // const addCart=()=>{
  //   dispatch(addToCart("shirt"));
  // }
  // const deleteCart=()=>{
  //   dispatch(deleteFromCart("shirt"))
  // }
  return (
    <Layout>

      <Herosection/>
      <Filter/>
      <ProductCard/>
      <Track/>
      <Testimonial/>
     
    </Layout>
  )
}
