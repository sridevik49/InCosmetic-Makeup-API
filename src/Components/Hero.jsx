import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BRANDS } from '../data/product';

/**
 * HeroBanner Component
 * Displays a horizontally scrolling brand carousel and a flash deal section.
 * Style inspired by Nykaa's "GLOW MODE: ON" section.
 */
const Hero = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const navigate = useNavigate();

    // --- Countdown Timer Logic ---
    const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                clearInterval(timer);
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n) => String(n).padStart(2, '0');

    // --- Carousel Logic ---
    const handleScroll = () => {
        if (scrollRef.current) {
            setCanScrollLeft(scrollRef.current.scrollLeft > 0);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const amount = 340;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth'
            });
        }
    };

    const handleShopNow = (brandSlug) => {
        navigate(`/brand/${brandSlug}`);
    };

    const deals = [
        { brand: "NYKAA", discount: "40", label: "ON BESTSELLERS", image: "https://images.unsplash.com/photo-1626895872564-b691b6877b83?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlwc3RpY2t8ZW58MHx8MHx8fDA%3D", bgClass: "bg-gradient-deal-1" },
        { brand: "VICTORIA'S SECRET", discount: "45", label: "ON TOP SELLERS", image: "https://europegirl.com/cdn/shop/files/15_1706dfb6-a866-44a5-bd3c-aaf6620fec56.jpg?v=1760437330&width=800", bgClass: "bg-gradient-deal-2" }
    ];

    return (
        <div className="hero-banner-container">
            {/* --- Hero Carousel Section with images--- */}
            <div className="hero-title-section">
                <h2 className="hero-title">
                    GLOW LIKE <em>YOU MEAN IT</em>
                </h2>
            </div>

            <div className="carousel-wrapper">
                {canScrollLeft && (
                    <button className="carousel-btn carousel-btn-left" onClick={() => scroll('left')}> ‹ </button>
                )}

                <div className="carousel-track" ref={scrollRef} onScroll={handleScroll}>
                    {BRANDS.map((card, index) => (
                        <div key={index} className={`brand-card ${card.bgClass}`}>
                            <div className="card-image-box">
                                <img src={card.image} alt={card.name} onError={(e) => { e.target.src = `https://placehold.co/360x360/fce4ec/333?text=${card.brand}` }} />
                            </div>
                            <div className="card-info">
                                <p className="card-brand-name">{card.name}</p>
                                <h3 className="card-headline">{card.headline}</h3>
                                <p className="card-subtext">{card.subtext}</p>
                                <button className="shop-now-btn" onClick={() => handleShopNow(card.slug)}>Shop Now →</button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-btn carousel-btn-right" onClick={() => scroll('right')}>›</button>
            </div>

            {/* --- Flash Deal Section --- */}
            <div className="flash-deal-container">
                <div className="flash-deal-header">
                    <div className="flash-deal-title">
                        <span className="flash-text-pink">FLASH</span>
                        <span className="flash-emoji">⚡</span>
                        <span className="flash-text-dark">DEAL</span>
                    </div>

                    <div className="flash-timer">
                        <span className="flash-timer-label">Ends In: </span>
                        <span className="flash-timer-value">
                            {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
                        </span>
                    </div>
                </div>

                <div className="flash-deal-grid">
                    {deals.map((deal, index) => (
                        <div key={index} className={`flash-deal-card ${deal.bgClass}`}>
                            <div className="flash-deal-info">
                                <p className="flash-deal-brand">{deal.brand}</p>
                                <p className="flash-deal-flat">FLAT</p>
                                <p className="flash-deal-percent">{deal.discount}%</p>
                                <p className="flash-deal-off">OFF</p>
                                <p className="flash-deal-label">{deal.label}</p>
                            </div>
                            <div className="flash-deal-img-box">
                                <img src={deal.image} alt={deal.brand} className="flash-deal-img" onError={(e) => { e.target.src = "https://placehold.co/180x200?text=Deal" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
