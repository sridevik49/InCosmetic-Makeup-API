import React from "react";
import { Link } from "react-router-dom";

const brands = [
  {
    img: "src/assets/banner.jpeg",
    text: "New SPF 50 Safe For Sensitive Skin",
  },
  {
    img: "src/assets/img1.jpeg",
    text: "Get a Beauty Blender & Gloss",
  },
  {
    img: "src/assets/img2.jpeg",
    text: "#1 Hydration Duo",
  },
  {
    img: "src/assets/img3.jpeg",
    text: "New Collection. New Rules",
  },
  {
    img: "src/assets/img4.jpeg",
    text: "Flat 15% Off on Your 1st Order",
  },
  {
    img: "src/assets/img5.jpeg",
    text: "Up to 40% Off",
  },
  {
    img: "src/assets/img6.jpeg",
    text: "Glow Routine Flawless Look",
  },
  {
    img: "src/assets/img7.jpeg",
    text: "Bestseller Gifts on Orders",
  },
  {
    img: "src/assets/img8.jpeg",
    text: "Scents That Embody Luxury",
  },
  {
    img: "src/assets/img9.jpeg",
    text: "Get the Dior Glow",
  },
  {
    img: "src/assets/img10.jpeg",
    text: "Purified Peptides",
  },
];

const Brands = () => {
  return (
    <div className="brands-container">
      {/* Full screen banner */}
      <img
        src={brands[0].img}
        alt="banner"
        style={{
          width: "100%",
        }}
      />

      {/* Grid for remaining images */}
      <div className="brands-grid">
        {brands.slice(1).map((brand, index) => (
          <div className="brand-card" key={index}>
            <img
              src={brand.img}
              alt="brand"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
            <p className="brand-text">{brand.text}</p>
          </div>
        ))}
      </div>

        
      <Link  to="/newnykaa" className="btn"><button className="explore-btn">Explore All Brands</button> </Link>
    </div>
  );
};

export default Brands;
