import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const BRANDS_LIST = [
    { name: "almay", category: "Popular", logo: "https://epr4eqhkwx9.exactdn.com/wp-content/uploads/2019/04/almay.jpg?strip=all" },
    { name: "e.l.f.", category: "Popular", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Elf_new_logo.png" },
    { name: "nyx", category: "Popular", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c6/NYX_Professional_Makeup_Logo.jpeg" },
    { name: "Maybelline New York", category: "Popular", logo: "https://cdn.cookielaw.org/logos/b8ec011c-8bf5-4ec6-98df-990d37350f78/eb18d778-d357-46bb-8812-b19ca3afd182/7597501d-c12f-44ba-b4ac-6ed6960ef767/600f2fd6fcd2b50004308419.png" },
    { name: "Lakme", category: "Popular", logo: "https://wp.logos-download.com/wp-content/uploads/2021/01/Lakme_Logo.png?dl" },
    { name: "l'Oreal", category: "Popular", logo: "https://crystalpng.com/wp-content/uploads/2024/08/loreal-logo-png-1.png" },
    { name: "milani", category: "Popular", logo: "https://logovtor.com/wp-content/uploads/2021/05/milani-srl-logo-vector.png" },
    { name: "pecifica", category: "Popular", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Pacifica_logo_%282024%29.png" },
    { name: "Clinique", category: "Popular", logo: "https://cdn.iconscout.com/icon/free/png-256/free-clinique-icon-svg-download-png-202463.png?f=webp" },
    { name: "Pyunkang Yul", category: "Popular", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3vQ1VqtpW4dmwUEg9GmP7pu2xd-a9FBcqQ&s" },
    { name: "zorch", category: "Popular", logo: "https://cdn2.momjunction.com/wp-content/uploads/baby-names/bn-wallpapers/zorah_stylish_wallpaper.jpg.webp" },
    { name: "boosh", category: "Popular", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ap-EkD_IVL78Qza2T_SZaFBVhjkUhJltWQ&s" },
    { name: "covergirl", category: "Popular", logo: "https://images.seeklogo.com/logo-png/32/1/covergirl-logo-png_seeklogo-329035.png" },
    { name: "deciem", category: "Popular", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE-tl562c4iL0syAUmSbXblmmJRhkFmAmY9Q&s" },
    { name: "fenty", category: "Popular", logo: "https://logowik.com/content/uploads/images/fenty-beauty9929.logowik.com.webp" },
    { name: "smashbox", category: "Popular", logo: "https://bolt-gcdn.sc-cdn.net/3/N5pDiuCmV0qh6DNDdjQDt?bo=EhgaABoAMgF9OgEEQgYIo5yi9QVIAlASYAE%3D&uc=18" },
    { name: "w3llpeople", category: "Popular", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTElMzT-2Qqch_UiViX1NkBTRZAAaE6P1Qg&s" },
    { name: "glossier", category: "Popular", logo: "https://payload.cargocollective.com/1/22/726772/12566401/GLOSSIER-logos_900.jpg" },
    { name: "iman", category: "Popular", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2lCNoGOznekd9os-z1Ob2F00x1ww6juQ0iw&s" },
    { name: "CeraVe", category: "Popular", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe2_Gos6eA1-3U3RWvVn487nYDOzETS-0Tfg&s" },
    { name: "sante", category: "Luxe", logo: "https://www.penntybio.com/img/m/10.webp" },
    { name: "iman", category: "Luxe", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2lCNoGOznekd9os-z1Ob2F00x1ww6juQ0iw&s" },
    { name: "rejuva minerals", category: "NewLaunches", logo: "https://rejuvasa.com/wp-content/uploads/2024/06/Rejuva-cover-1.png" },
    { name: "almay", category: "OnlyAtIncosmetics", logo: "https://epr4eqhkwx9.exactdn.com/wp-content/uploads/2019/04/almay.jpg?strip=all" },
    { name: "annabelle", category: "OnlyAtIncosmetics", logo: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0017/9088/brand.gif?itok=8rXTgzKO" },
    { name: "benefit", category: "OnlyAtIncosmetics", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDWq08agrmUn3qzcOuyS6kGIc9MRqZPPq-g&s" },
];

const SIDEBAR_BRANDS = [
    "Maybelline New York", "Lakme", "Nykaa Cosmetics", "M.A.C", "The Face Shop",
    "L'Oreal", "Nykaa Naturals", "Biotique", "Huda Beauty", "Kama Ayurveda",
    "Innisfree", "The Body Shop"
];

const ALPHABETS = ["*", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];

const MegaMenu = ({ isOpen, onClose, onMouseEnter }) => {
    const [activeTab, setActiveTab] = useState('POPULAR');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['POPULAR', 'LUXE', 'ONLY AT INCOSMETICS', 'NEW LAUNCHES'];

    // Mapping tab keys to BRANDS_LIST categories
    const categoryMap = {
        'POPULAR': 'Popular',
        'LUXE': 'Luxe',
        'ONLY AT INCOSMETICS': 'OnlyAtIncosmetics',
        'NEW LAUNCHES': 'NewLaunches'
    };

    const filteredBrands = useMemo(() => {
        let list = BRANDS_LIST;

        // If searching, search across all brands for better discovery
        if (searchQuery) {
            return list.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        const currentCategory = categoryMap[activeTab];
        return list.filter(brand => brand.category === currentCategory);
    }, [activeTab, searchQuery]);

    if (!isOpen) return null;

    return (
        <div className="mega-menu-wrapper" onMouseEnter={onMouseEnter} onMouseLeave={onClose}>
            <div className="container mega-pointer-container">
                <div className="mega-menu-pointer"></div>
            </div>
            <div className="container mega-menu-box">
                {/* Left Drawer / Sidebar */}
                <div className="mega-sidebar">
                    <div className="mega-search-container">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search Brands"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="mega-sidebar-content">
                        <div className="sidebar-brands-list">
                            <h4 className="sidebar-title">TOPBRANDS</h4>
                            <ul className="brands-links">
                                {SIDEBAR_BRANDS.map(brand => (
                                    <li key={brand}>
                                        <Link to={`/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`} onClick={onClose}>
                                            {brand}
                                        </Link>
                                    </li>
                                ))}
                                <li className="hash-item">#</li>
                            </ul>
                        </div>
                        <div className="alphabet-sidebar">
                            {ALPHABETS.map(char => (
                                <span key={char} className="alpha-link">{char}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="mega-main-content">
                    <div className="mega-tabs-header">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`mega-tab-link ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="mega-brands-grid">
                        {filteredBrands.length > 0 ? (
                            filteredBrands.map((brand, index) => (
                                <Link
                                    key={index}
                                    to={`/brand/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="mega-brand-item"
                                    onClick={onClose}
                                >
                                    <div className="mega-brand-logo">
                                        <img src={brand.logo} alt={brand.name} />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="no-brands">No results found for "{searchQuery}"</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
