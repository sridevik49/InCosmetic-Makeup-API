import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleQuestionMark, Gift, Search, Smartphone, Store, ChevronRight, Handbag } from 'lucide-react';
import logoImg from '../assets/ic_monogram_logo_v2_1773476654071-removebg-preview.png';
import BagDrawer from './BagDrawer';
import MegaMenu from './MegaMenu';
import { useCart } from '../Context/CartContext';

const Navbar = ({ search, setSearch }) => {
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [showAuth, setShowAuth] = useState(false);
    const [mobile, setMobile] = useState('');
    const [isBagOpen, setIsBagOpen] = useState(false)
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
    const megaMenuTimer = useRef(null);

    const handleMegaMenuOpen = () => {
        if (megaMenuTimer.current) clearTimeout(megaMenuTimer.current);
        setIsMegaMenuOpen(true);
    };

    const handleMegaMenuClose = () => {
        megaMenuTimer.current = setTimeout(() => {
            setIsMegaMenuOpen(false);
        }, 150); // Slightly longer delay for safety
    };

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setMobile(value);
    };

    const isMobileValid = mobile.length === 10;

    const text = "SALE IS LIVE | FREE SHIPPING ABOVE ₹299";
    const text2 = "GET FREE SHIPPING ON ALL ORDERS ABOVE ₹299! | PINK SUMMER SALE IS LIVE!";

    return (
        <div className='nav-wrapper' >
            {/*  Utility Bar*/}
            <div className='utility-bar'>
                <div className='container'>
                    <a href="#"><Smartphone /> Get App |</a>
                    <a href="#"><Store /> Store & Events |</a>
                    <a href="#"> <Gift /> Gift Card |</a>
                    <a href="#"><CircleQuestionMark strokeWidth={1.75} /> Help</a>
                </div>
            </div>

            {/* navbar */}
            <nav className='navbar'>
                <div className='container nav-content'>
                    <div className="nav-left">
                        {/* Logo */}
                        <Link to="/" className='logo'>
                            <img src={logoImg} alt="InCosmetic Logo" className="logo-image" />
                            <div className="logo-text">
                                <span className="logo-top">InCos</span>
                                <span className="logo-bottom" >Metic</span>
                            </div>
                        </Link>

                        <ul className='nav-links'>
                            <li><Link to="/" >Home</Link></li>
                            <li
                                onMouseEnter={handleMegaMenuOpen}
                                onMouseLeave={handleMegaMenuClose}
                            >
                                <Link to="/" className={isMegaMenuOpen ? 'active' : ''}>Brands</Link>
                            </li>
                            <li><Link to="/newnykaa" >Categories</Link></li>
                            <li><Link to="/" >Fashion</Link></li>
                            <li><Link to="/Products" >Beauty Advice</Link></li>
                        </ul>
                    </div>

                    {/* central search */}
                    <div className='search-box'>
                        <Search size={24} color="#131826" />
                        <input
                            type="text"
                            placeholder='Search on Incosmetic'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && search.trim()) {
                                    navigate('/products');
                                }
                            }}
                        />
                    </div>

                    {/* actions */}
                    <div className='nav-actions'>
                        <button
                            className='btn-sign-in'
                            onClick={() => setShowAuth(!showAuth)}
                        >
                            Sign In
                        </button>

                        <div className="nav-icon-btn"
                            style={{ cursor: 'pointer', color: '#333' }}
                            onClick={() => setIsBagOpen(true)}
                        >
                            <div className="bag-icon-container">
                                <Handbag size={24} />
                                {cartCount > 0 && <span className="bag-badge">{cartCount}</span>}
                            </div>
                        </div>


                        {showAuth && (
                            <div className="auth-popover">
                                <h2>Login or Signup</h2>
                                <p>Register now and get 2000 Incosmetic reward points instantly!</p>

                                <div className="auth-input-group">
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number"
                                        value={mobile}
                                        onChange={handleMobileChange}
                                    />
                                    <button
                                        className={`btn-otp ${isMobileValid ? 'active' : ''}`}
                                        disabled={!isMobileValid}
                                    >
                                        Send OTP
                                    </button>
                                </div>

                                <div className="auth-divider">
                                    <span></span>
                                    <p>Or sign in using</p>
                                    <span></span>
                                </div>

                                <button
                                    className="social-login-btn"
                                    onClick={() => { setShowAuth(false); navigate('/login'); }}
                                >
                                    <span style={{ color: 'var(--nykaa-pink)' }}>Sign in with Mobile / Email</span>
                                    <ChevronRight className="arrow" size={20} />
                                </button>

                                <button className="social-login-btn">
                                    <img
                                        src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                                        alt="Google"
                                        className="google-icon"
                                    />
                                    <span>Continue with Google</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <MegaMenu
                    isOpen={isMegaMenuOpen}
                    onClose={handleMegaMenuClose}
                    onMouseEnter={handleMegaMenuOpen}
                />
            </nav>
            <div className='announcement-bar'>
                <div className="marquee-content">
                    <span className="marquee-item">{text}</span>
                    <span className="marquee-item">{text2}</span>
                    <span className="marquee-item">{text}</span>
                    <span className="marquee-item">{text2}</span>
                    <span className="marquee-item">{text}</span>
                    <span className="marquee-item">{text2}</span>
                    <span className="marquee-item">{text}</span>
                </div>
            </div>

            <BagDrawer isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />
        </div>

    );
};

export default Navbar;
