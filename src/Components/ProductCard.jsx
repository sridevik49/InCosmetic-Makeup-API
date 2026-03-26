import React, { useState } from 'react'
import { useCart } from '../Context/CartContext'

/**
 * 
 * Product card component
 * displays a premium product card with hover effects, rating, and badges.
 */

const ProductCard = ({ product, onPreviewShades }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isRecentlyAdded, setIsRecentlyAdded] = useState(false);

  const {
    id,
    name,
    brand,
    price,
    api_featured_image,
    rating,
    tag_list,
    product_colors
  } = product;

  const inrPrice = Math.floor(parseFloat(price) * 80) || 999;
  const reviewCount = Math.floor(Math.random() * 500) + 50;
  const isNew = tag_list?.includes('New') || id % 5 === 0;
  const isFeatured = tag_list?.includes('Featured') || id % 7 === 0;

  // Check if item is already in cart
  const isInCart = cartItems.some(item => item.id === id);

  const handleAddToBag = (e) => {
    e.stopPropagation();
    if (isAdding) return;

    setIsAdding(true);
    
    // Simulate a brief adding period for UX
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
      setIsRecentlyAdded(true);
      
      // Reset "Added to bag" confirmation after 2 seconds
      setTimeout(() => {
        setIsRecentlyAdded(false);
      }, 2000);
    }, 800);
  };

  const getButtonText = () => {
    if (isAdding) return 'Adding...';
    if (isRecentlyAdded) return 'Added to bag';
    return 'Add to Bag';
  };

  return (
    <div className='nykaa-product-card'>
      <div className='card-media'>
        <div className='wishlist-trigger'>
          <span className='heart-icon'>♡</span>
        </div>
        {isNew && <span className='badge badge-new'>NEW</span>}
        {isFeatured && <span className='badge badge-featured'>FEATURED</span>}
        <img
          src={api_featured_image}
          alt={name}
          className='product-img'
          onError={(e) => { e.target.src = "https://placehold.co/250x300?text=Product" }}
        />
      </div>
      <div className='card-body'>
        <p className='product-brand'>{brand}</p>
        <h3 className='product-name'>{name}</h3>

        <div className='product-rating-row'>
          <div className='rating-box'>
            <span className='rating-number'>{rating || '4.5'}</span>
            <span className='star-icon'>★</span>
          </div>
          <span className='review-count'>({reviewCount})</span>
        </div>

        <div className='product-price-row'>
          <p className='selling-price'>₹{inrPrice}</p>
        </div>

        <div className='product-card-actions'>
          <button className='preview-shades-btn' onClick={() => onPreviewShades(product)}>
            Preview {product_colors?.length || 0} Shades
          </button>
          <button 
            className={`add-to-bag-btn ${isInCart ? 'in-cart' : ''}`} 
            onClick={handleAddToBag}
          >
            <span className="btn-text-normal">{getButtonText()}</span>
            {isInCart && !isAdding && !isRecentlyAdded && (
              <span className="btn-text-hover">Added to bag</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard
