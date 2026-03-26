import React, { useEffect, useState } from "react";
import { getProducts } from "../Services/api";
import ProductCard from "../Components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.slice(0, 30));
    });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Beauty Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Products
