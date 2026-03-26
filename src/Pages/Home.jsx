import React from "react";
import Products from "./Product";
import Deals from "../DealsOfTheDay/index";
import NewAtNykaa from "../Components/NewAtNykaa";
import Hero from "../Components/Hero";
import Brands from "../Components/Brands";

function Home() {
  return (
    <div>
      <Hero />
      <Deals />
      <NewAtNykaa />
      <Brands />
      <Products />
    </div>
  )
}

export default Home
