import React from 'react';
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Nopage from './pages/nopage/Nopage';
import Cart from './pages/cart/Cart';
import Mystate from './context/data/myState';
import Dashbord from './pages/admin/dashbord/Dashbord';
import Allproducts from './pages/allproduct/Allproducts';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import Productinfo from './pages/productinfo/Productinfo';
import Addproduct from './pages/admin/page/Addproduct';
import Updateproduct from './pages/admin/page/Updateproduct';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <Mystate>
  
    <Router>
    
      <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/order" element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart/>} />

         <Route path="/dashboard" element={
          <ProtectedRouteForAdmin>
               <Dashbord/>
          </ProtectedRouteForAdmin>
         } /> 
         <Route path="/allproducts" element={<Allproducts/>} /> 

         <Route path="/login" element={<Login/>} /> 
         <Route path="/signup" element={<Signup/>} /> 

        <Route path="/*" element={<Nopage/>} />
        {/* <Route path="/cart" element={<Contact />} /> */}
        <Route path="/addproduct" element={<ProtectedRouteForAdmin>
          <Addproduct/>
        </ProtectedRouteForAdmin> } /> 


        <Route path="/updateproduct" element={<ProtectedRouteForAdmin>
          <Updateproduct/>
          </ProtectedRouteForAdmin>} /> 
        <Route path="/productinfo/:id" element={<Productinfo/>} />
      </Routes>
    <ToastContainer/>
  </Router>
  </Mystate>
  )
}


//protected routes for user

export const ProtectedRoute=({children})=>{
  const user =localStorage.getItem('user')
  if(user){
return children;
  }
  else{
    return <Navigate to={'/login'}/>
  }
}
//addmin

const ProtectedRouteForAdmin=({children})=>{
  const admin=JSON.parse(localStorage.getItem('user'))

  if(admin.user.email==='sarthakpatwa972@gmail.com'){
      return children;
  }
  else{
    return <Navigate to={'/login'}/>
  }
}
