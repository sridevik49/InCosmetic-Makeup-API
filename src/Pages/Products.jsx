import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { getProducts } from "../Services/api";

function Products({ search }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.slice(0, 30));
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!search) return true;
    const lowerSearch = search.toLowerCase();
    const matchName = product.name?.toLowerCase().includes(lowerSearch);
    const matchBrand = product.brand?.toLowerCase().includes(lowerSearch);
    return matchName || matchBrand;
  });

  return (
    <div style={{ padding: "40px" }}>
      <h2>Beauty Products {search && `results for "${search}"`}</h2>

      {filteredProducts.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products
