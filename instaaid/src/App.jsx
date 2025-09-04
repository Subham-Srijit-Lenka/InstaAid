import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage.jsx";
import Contact from "./components/Contact.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Login from "./components/pages/Auth/Login.jsx";
import Register from "./components/pages/Auth/Register.jsx";
import Products from "./components/pages/Products/Products.jsx";
import AdminRegister from "./components/pages/Auth/AdminRegister.jsx";
import Cart from "./components/pages/Products/Cart.jsx";
import AdminRoute from "./components/pages/Auth/AdminRoute.jsx";
import CreateProduct from "./components/pages/Products/CreateProduct.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin/create-product" element={<CreateProduct />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </>
  );
};

export default App;
