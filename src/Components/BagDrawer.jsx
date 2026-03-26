import React from 'react'
import { useCart } from '../Context/CartContext'
import { X, Trash2, Plus, Minus } from 'lucide-react'

const BagDrawer = ({ isOpen, onClose }) => {
    const { 
        cartItems, 
        updateQuantity, 
        removeFromCart, 
        cartTotal, 
        cartCount 
    } = useCart();

    return (
        <>
            {/* Overlay covers the background when drawer is open */}
            <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>

            {/* The actual sliding drawer */}
            <div className={`drawer ${isOpen ? 'open' : ''}`}>

                {/* Drawer Header */}
                <div className="drawer-header">
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}>
                        ←
                    </button>
                    <h2>Bag ({cartCount})</h2>
                </div>

                {/* Drawer Content */}
                <div className="drawer-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-bag-view">
                            <div style={{ position: 'relative', marginBottom: '30px' }}>
                                <div style={{
                                    width: '150px',
                                    height: '150px',
                                    background: '#fff0f5',
                                    borderRadius: '20px',
                                    transform: 'rotate(45deg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{ transform: 'rotate(-45deg)', fontSize: '50px' }}>🛍️</div>
                                </div>
                                <div style={{ position: 'absolute', top: '-10px', right: '10px', fontSize: '24px' }}>⚡</div>
                            </div>

                            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c', marginBottom: '10px' }}>
                                Your Shopping Bag is Empty
                            </h3>
                            <p style={{ color: '#4a5568', marginBottom: '30px', textAlign: 'center' }}>
                                This feels too light! Go on, add all your favourites
                            </p>

                            <button
                                className="btn-sign-in"
                                style={{ width: '100%', padding: '15px', borderRadius: '4px' }}
                                onClick={onClose}
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-img">
                                        <img src={item.api_featured_image} alt={item.name} />
                                    </div>
                                    <div className="cart-item-info">
                                        <h4 className="cart-item-name">{item.name}</h4>
                                        <p className="cart-item-brand">{item.brand}</p>
                                        <div className="cart-item-price-qty">
                                            <p className="cart-item-price">₹{Math.floor(parseFloat(item.price) * 80) || 999}</p>
                                            <div className="qty-controls">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                                    <Minus size={14} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Drawer Footer - Only show if cart is not empty */}
                {cartItems.length > 0 && (
                    <div className="drawer-footer">
                        <div className="subtotal-row">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <p className="footer-note">Shipping and taxes calculated at checkout</p>
                        <button className="btn-sign-in checkout-btn" style={{ width: '100%', padding: '15px' }}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default BagDrawer
