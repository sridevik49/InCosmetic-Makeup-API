import { useState, useEffect, useRef } from "react";
import "./index.css";

const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

const CATEGORY_MAP = {
  All: null,
  Lips: ["lipstick", "lip_liner", "lip gloss", "liquid"],
  Eyes: ["eyeshadow", "eyeliner", "mascara", "eyebrow"],
  Face: ["foundation", "blush", "bronzer", "concealer"],
  Nails: ["nail_polish"],
  Skincare: ["moisturizer", "face_wash", "serum", "sunscreen"],
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

const TAG_COLORS = {
  "cruelty free": { bg: "#e0f2fe", color: "#0369a1" },
  Vegan: { bg: "#dcfce7", color: "#15803d" },
  Natural: { bg: "#fef9c3", color: "#a16207" },
  Gluten: { bg: "#fce7f3", color: "#be185d" },
  default: { bg: "#f3f4f6", color: "#6b7280" },
};

function StarRating({ rating }) {
  const r = parseFloat(rating) || 0;
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`star ${s <= Math.round(r) ? "filled" : ""}`}>★</span>
      ))}
      {r > 0 && <span className="rating-num">{r.toFixed(1)}</span>}
    </div>
  );
}

function ProductCard({ product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const price = product.price ? parseFloat(product.price) : null;
  const inrPrice = price ? Math.round(price * 83) : null;
  const originalInr = inrPrice ? Math.round(inrPrice * 1.3) : null;
  const off = inrPrice ? 23 + (product.id % 37) : null;

  const colors = product.product_colors?.slice(0, 5) || [];
  const tags = product.tag_list?.slice(0, 2) || [];

  const imgSrc = !imgErr && product.api_featured_image
    ? (product.api_featured_image.startsWith("//")
        ? "https:" + product.api_featured_image
        : product.api_featured_image)
    : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card">
      {tags[0] && (
        <span
          className="tag-badge"
          style={{
            background: TAG_COLORS[tags[0]]?.bg || TAG_COLORS.default.bg,
            color: TAG_COLORS[tags[0]]?.color || TAG_COLORS.default.color,
          }}
        >
          {tags[0]}
        </span>
      )}

      <button
        className={`wishlist-btn${wished ? " active" : ""}`}
        onClick={(e) => { e.stopPropagation(); setWished((w) => !w); }}
      >
        {wished ? "❤️" : "🤍"}
      </button>

      <div className="card-img-area">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="product-img"
            onError={() => setImgErr(true)}
          />
        ) : (
          <span className="fallback-emoji">💄</span>
        )}
      </div>

      <div className="card-body">
        <p className="brand">{product.brand || "Unknown Brand"}</p>
        <p className="pname">{product.name}</p>

        <StarRating rating={product.rating} />

        {colors.length > 0 && (
          <div className="shades-row">
            <div className="dots">
              {colors.map((c, i) => (
                <span
                  key={i}
                  className="dot"
                  style={{ background: c.hex_value }}
                  title={c.colour_name}
                />
              ))}
            </div>
            {product.product_colors?.length > 5 && (
              <span className="more-shades">+{product.product_colors.length - 5} more</span>
            )}
          </div>
        )}

        {inrPrice ? (
          <div className="pricing-row">
            <span className="price-now">₹{inrPrice.toLocaleString()}</span>
            <span className="price-old">₹{originalInr.toLocaleString()}</span>
            <span className="off-tag">{off}% off</span>
          </div>
        ) : (
          <div className="pricing-row">
            <span className="price-now free-tag">Free / Sample</span>
          </div>
        )}

        {product.product_type && (
          <span className="type-pill">{product.product_type.replace(/_/g, " ")}</span>
        )}

        <button
          className={`add-btn${added ? " added" : ""}`}
          onClick={handleAdd}
        >
          {added ? "✓ Added to Bag!" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <div className="sk sk-img" />
      <div className="card-body">
        <div className="sk sk-line short" />
        <div className="sk sk-line" />
        <div className="sk sk-line medium" />
        <div className="sk sk-line short" />
        <div className="sk sk-btn" />
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");


  const trackRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) => {
    const catMatch =
      activeCategory === "All" ||
      (CATEGORY_MAP[activeCategory] || []).some(
        (t) =>
          p.product_type?.toLowerCase().includes(t) ||
          p.category?.toLowerCase().includes(t)
      );


    const searchMatch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase());


    return catMatch && searchMatch;
  });

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 450, behavior: "smooth" });
  };

  return (
    <div className="page">

      {/* Banner */}

      {/* Banner */}
      <div className="deals-banner">
        <div className="banner-left">
          <p className="banner-eyebrow">✦ Today's Exclusive ✦</p>
          <h1 className="banner-title">Deals of the Day</h1>
          <p className="banner-sub">Real products · Live prices · Up to 60% off</p>
        </div>


        <div className="banner-right">
          <div className="live-badge">🔴 LIVE DEALS</div>
          <p className="total-count">
            {products.length > 0 ? `${products.length}+ Products` : "Loading..."}
          </p>
          
        </div>
      </div>

      {/* Category Tabs */}
      {/* Category Tabs */}
      <div className="controls-row">
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-tab${activeCategory === cat ? " active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                trackRef.current?.scrollTo({ left: 0 });
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="product-count">
        {loading ? "Fetching deals..." : `${filtered.length} deals found`}
      </p>

      {error && <div className="error-box">⚠️ {error}</div>}

      <div className="carousel-outer">
        {!loading && filtered.length > 0 && (
          <button className="arrow-btn left" onClick={() => scroll(-1)}>‹</button>
        )}

        <div className="carousel-track" ref={trackRef}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((p) => <ProductCard key={p.id} product={p} />)
          }
        </div>

        
        {!loading && filtered.length > 0 && (
          <button className="arrow-btn right" onClick={() => scroll(1)}>›</button>
        )}
      </div>
    </div>
  );
}