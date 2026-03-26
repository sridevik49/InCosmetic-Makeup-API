import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
// import CategoryBar from "./Components/Categories";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import NewNykaa from "./Pages/NewNykaa"
import BrandProducts from "./Pages/BrandProducts";
import Footer from "./footer/index"
import './App.css'




function Layout({ search, setSearch }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar search={search} setSearch={setSearch} />}
      {/* {!isLoginPage && <CategoryBar />} */}

      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/brand/:brandName" element={<BrandProducts search={search} />} />
        <Route path="/products" element={<Products search={search} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newnykaa" element={<NewNykaa />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
}

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Layout search={search} setSearch={setSearch} />
    </BrowserRouter>
  );
}

export default App;
