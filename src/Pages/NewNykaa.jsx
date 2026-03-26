import { useState, useEffect } from "react";
import "./NewNykaa.css";
import { Search } from "lucide-react";

const BRANDS = [
  { id: "all", name: "All" },
  { id: "maybelline", name: "Maybelline" },
  { id: "covergirl", name: "Covergirl" },
  { id: "smashbox", name: "Smashbox" },
  { id: "revlon", name: "Revlon" },
  { id: "pacifica", name: "Pacifica" },
  { id: "nyx", name: "NYX" },
  { id: "clinique", name: "Clinique" },
  { id: "cargo cosmetics", name: "CargoBeachBlush" }
];

export default function NewAtStore() {

  const [products, setProducts] = useState([]);
  const [activeBrand, setActiveBrand] = useState("all");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const productsPerPage = 20;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let data = [];

      if (activeBrand === "all") {

        const brands = [
          "maybelline",
          "covergirl",
          "smashbox",
          "revlon",
          "pacifica",
          "nyx",
          "clinique",
          "cargo cosmetics"
        ];

        const responses = await Promise.all(
          brands.map((brand) =>
            fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
              .then((res) => res.json())
          )
        );

        // combine all brands
        let combined = responses.flat();

        // shuffle products
        combined = combined.sort(() => Math.random() - 0.5);

        data = combined.slice(0, 500);
      }
      else {
        const res = await fetch(
          `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${activeBrand}`
        );
        data = await res.json();
      }

      const filtered = data.filter((item) =>
        item.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

      setProducts(filtered);
      setLoading(false);
    };

    fetchProducts();
  }, [activeBrand, debouncedSearch]);

  const lastIndex = page * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleAddToCart = (product) => {
    alert(`Added "${product.name}" to cart!`);
  };

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="product-card skeleton-card">
      <div className="skeleton-image"></div>

      <div className="skeleton-info">
        <div className="skeleton-text short"></div>
        <div className="skeleton-text"></div>

        <div className="skeleton-price-row">
          <div className="skeleton-price"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-discount"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="store-container">
      <h2 className="store-title">
        New at <span>Incosmetic</span>
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-box"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        />
      {/* BRAND FILTER */}
      <div className="brand-filter">
        {BRANDS.map((brand) => (
          <button
            key={brand.id}
            onClick={() => {
              setActiveBrand(brand.id);
              setPage(1);
            }}
            className={activeBrand === brand.id ? "brand-btn active" : "brand-btn"}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {loading
          ? Array.from({ length: productsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
          : currentProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image_link}
                alt={product.name}
                className="product-image"
              />

              <div className="product-info">
                <span className="brand-name">{product.brand}</span>

                <p className="product-name">
                  {product.name?.slice(0, 50)}
                </p>

                <div className="price-row">
                  <span className="price">₹{product.price || 500}</span>
                  <span className="mrp">₹{(product.price || 500) + 300}</span>
                  <span className="discount">20% OFF</span>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>

              </div>
            </div>
          ))}
      </div>

      {/* NO PRODUCTS */}
      {!loading && currentProducts.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          No products found
        </p>
      )}

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span> Page {page} of {totalPages} </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}