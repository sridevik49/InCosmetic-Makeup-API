import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';

/**
 * ProductDetails Component
 * Shows full information about a single beauty product.
 */
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bagBtnText, setBagBtnText] = useState('Add to Bag');
    const [bagBtnDisabled, setBagBtnDisabled] = useState(false);

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    // Fetch single product data when ID changes
    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleProduct();
    }, [id]);

    const handleAddToBag = () => {
        if (bagBtnDisabled) return;
        setBagBtnText('Adding...');
        setBagBtnDisabled(true);
        addToCart(product);
        setTimeout(() => {
            setBagBtnText('Added to Bag');
        }, 1000);
    };

    const handleWishlist = () => {
        if (!product) return;
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    if (loading) {
        return <div className="loading-screen"><div className="spinner"></div></div>;
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '50px', textAlign: 'center' }}>
                <h2>Oops! Product not found.</h2>
                <Link to="/" className="btn-sign-in" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>
                    Go Back Home
                </Link>
            </div>
        );
    }

    // Price conversion logic
    const priceINR = Math.floor(product.price * 80) || 599;
    const inWishlist = isInWishlist(product.id);

    return (
        <div className="container" style={{ padding: '40px 20px' }}>

            {/* Breadcrumb / Back Link */}
            <div style={{ marginBottom: '20px' }}>
                <Link to="/" style={{ color: '#fc2779', textDecoration: 'none', fontWeight: 'bold' }}>
                    ← Back to Browsing
                </Link>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>

                {/* Left: Product Image */}
                <div style={{ flex: '1', minWidth: '300px', textAlign: 'center', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
                    <img
                        src={product.api_featured_image}
                        alt={product.name}
                        style={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'contain' }}
                        onError={(e) => { e.target.src = "https://placehold.co/400x400?text=" + product.name }}
                    />
                </div>

                {/* Right: Product Details */}
                <div style={{ flex: '1.5', minWidth: '300px' }}>
                    <p style={{ color: '#757575', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px' }}>
                        {product.brand || "NYKAA"}
                    </p>
                    <h1 style={{ fontSize: '28px', margin: '10px 0' }}>{product.name}</h1>

                    <div className="product-rating" style={{ marginBottom: '20px' }}>
                        <span className="star">★</span>
                        <span style={{ fontWeight: 'bold' }}>{product.rating || "4.5"} / 5</span>
                        <span style={{ color: '#999', marginLeft: '10px' }}>| 1.2K Ratings</span>
                    </div>

                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '20px' }}>
                        MRP: ₹{priceINR}
                        <span style={{ fontSize: '14px', color: '#757575', marginLeft: '10px' }}>
                            (Inclusive of all taxes)
                        </span>
                    </div>

                    <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>

                        {/* Add to Bag Button */}
                        <button
                            onClick={handleAddToBag}
                            disabled={bagBtnDisabled}
                            className="btn-sign-in"
                            style={{
                                width: '200px',
                                fontSize: '16px',
                                padding: '12px',
                                cursor: bagBtnDisabled ? 'not-allowed' : 'pointer',
                                opacity: bagBtnText === 'Adding...' ? 0.8 : 1,
                                transition: 'opacity 0.3s',
                            }}
                        >
                            {bagBtnText}
                        </button>

                        {/* Add to Wishlist Button */}
                        <button
                            onClick={handleWishlist}
                            style={{
                                padding: '12px 20px',
                                border: `1px solid ${inWishlist ? '#e53935' : '#fc2779'}`,
                                background: inWishlist ? '#fff0f3' : 'none',
                                color: inWishlist ? '#e53935' : '#fc2779',
                                fontWeight: 'bold',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {inWishlist ? '♥ Wishlisted' : '♡ Add to Wishlist'}
                        </button>
                    </div>

                    <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <h4 style={{ marginBottom: '10px' }}>Product Description:</h4>
                        <p style={{ color: '#555', lineHeight: '1.6', fontSize: '15px' }}>
                            {product.description?.replace(/<\/?[^>]+(>|$)/g, "") || "No description available for this beauty product."}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductDetails;
