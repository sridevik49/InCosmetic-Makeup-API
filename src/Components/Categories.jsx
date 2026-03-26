import React from "react";

function CategoryBar() {
  const categories = [
    "Makeup",
    "Skin",
    "Hair",
    "Appliances",
    "Bath & Body",
    "Fragrance",
    "Men",
    "SALE",
  ];

  return (
    <div className="category-bar">
      {categories.map((cat, index) => (
        <span key={index}>{cat}</span>
      ))}
    </div>
  );
}

export default CategoryBar;
