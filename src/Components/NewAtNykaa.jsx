import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewAtNykaa.css";

export default function NewAtIncosmetic() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);

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

    // fetch all brands in parallel
    const responses = await Promise.all(
      brands.map((brand) =>
        fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
          .then(res => res.json())
      )
    );

    // combine all products
    let combined = responses.flat();

    // optional: shuffle
    combined = combined.sort(() => Math.random() - 0.5);

    // take first 12 (for slider)
    const formatted = combined.slice(0, 30).map((item) => ({
      id: item.id,
      brand: item.brand || "Brand",
      productName: item.name,
      image: item.image_link,
      bg: "#f7eef3"
    }));

    setProducts(formatted);
    setLoading(false);
  };

  fetchProducts();
}, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth"
    });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  // Skeleton card component
  const SkeletonCard = () => (
    <div className="nykaa-card skeleton">
      <div className="skeleton-brand"></div>
      <div className="skeleton-img"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  );

  return (
    <div className="nykaa-wrapper">

      {/* Banner */}
      <div className="nykaa-banner">
        <div className="nykaa-watermark">NEW</div>
        <div className="banner-text">
          <h2>New At <span>Incosmetic</span></h2>
          <p>Latest Beauty Arrivals You'll Want To Own</p>
        </div>
      </div>

      {/* Product Slider */}
      <div className="slider-container">
        {canScrollLeft && <button className="arrow-btn left" onClick={() => scroll("left")}>‹</button>}
        {canScrollRight && <button className="arrow-btn right" onClick={() => scroll("right")}>›</button>}

        <div ref={scrollRef} onScroll={handleScroll} className="product-scroll">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <div className="nykaa-card" key={product.id}>
                  <div className="brand">{product.brand}</div>
                  <div className="image-box">
                    <img src={product.image} alt={product.productName} />
                  </div>
                  <div className="card-label">{product.productName?.slice(0, 40)}</div>
                </div>
              ))
          }
        </div>
      </div>

      {/* View All */}
      <div className="view-all">
        <button onClick={() => navigate("/newnykaa")}>View All →</button>
      </div>
    </div>
  );
}