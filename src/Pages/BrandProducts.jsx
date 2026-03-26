import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FilterSidebar from '../Components/FilterSidebar';
import ProductCard from '../Components/ProductCard';

/**
 * BrandProducts Page
 * A premium product listing page with filtering and sorting.
 */
const BrandProducts = ({ search }) => {
    const { brandName } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('popularity');
    // Initialize activeFilters with the brand from the URL
    const [activeFilters, setActiveFilters] = useState({ brand: [brandName] });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Reset filters when URL brand changes
    useEffect(() => {
        setActiveFilters({ brand: [brandName] });
        setCurrentPage(1);
    }, [brandName]);

    useEffect(() => {
        const fetchMultipleBrands = async () => {
            const selectedBrands = activeFilters.brand || [brandName];

            try {
                setLoading(true);
                const promises = selectedBrands.map(b =>
                    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${encodeURIComponent(b.toLowerCase())}`)
                        .then(res => res.json())
                );

                const results = await Promise.all(promises);
                // Flatten and merge products
                const allProducts = results.flat();
                setProducts(allProducts);
            } catch (error) {
                console.error("Error fetching multi-brand products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMultipleBrands();
    }, [activeFilters.brand]);

    const handleFilterChange = (type, value) => {
        if (type === 'clear') {
            setActiveFilters({ brand: [brandName] }); // Keep the URL brand even on clear
        } else {
            setActiveFilters(prev => ({
                ...prev,
                [type]: value
            }));
        }
        setCurrentPage(1);
    };

    // Derived filtered and sorted products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Apply Search Filtering (across names and brands)
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(p => {
                const matchName = p.name?.toLowerCase().includes(lowerSearch);
                const matchBrand = p.brand?.toLowerCase().includes(lowerSearch);
                return matchName || matchBrand;
            });
        }

        // Apply filters
        Object.keys(activeFilters).forEach(key => {
            const values = activeFilters[key];
            if (values && values.length > 0) {
                if (key === 'category') {
                    result = result.filter(p => values.some(v => p.product_type?.toLowerCase() === v.toLowerCase()));
                } else if (key === 'brand') {
                    result = result.filter(p => values.some(v => p.brand?.toLowerCase() === v.toLowerCase()));
                } else if (key === 'price') {
                    result = result.filter(p => {
                        const price = Math.floor(parseFloat(p.price) * 80) || 999;
                        return values.some(v => {
                            if (v === 'Below ₹500') return price < 500;
                            if (v === '₹500 - ₹1000') return price >= 500 && price <= 1000;
                            if (v === '₹1000 - ₹2000') return price >= 1000 && price <= 2000;
                            if (v === 'Above ₹2000') return price > 2000;
                            return true;
                        });
                    });
                }
                // Add more filter logic as needed
            }
        });

        // Apply sorting
        if (sortBy === 'priceLow') {
            result.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        } else if (sortBy === 'priceHigh') {
            result.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        } else if (sortBy === 'rating') {
            result.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        }

        return result;
    }, [products, activeFilters, sortBy, search]);

    // Pagination calculation
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container brand-products-page">
            <div className="brand-header-section">
                <div className="breadcrumb">
                    {/* <span onClick={() => navigate('/')}>Home</span> / <span>Brands</span> / <span className="active">{brandName}</span> */}
                </div>
                <h1 className="brand-title">All Products</h1>
            </div>

            <div className="brand-products-layout">
                <FilterSidebar
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    currentBrand={brandName}
                />

                <div className="listing-content">
                    <div className="listing-top-bar">
                        <p className="listing-count">
                            {filteredProducts.length} Products Found
                        </p>
                        <div className="sort-container">
                            <label>Sort By:</label>
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="popularity">Popularity</option>
                                <option value="priceLow">Price: Low to High</option>
                                <option value="priceHigh">Price: High to Low</option>
                                <option value="rating">Customer Rating</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-screen" style={{ height: '300px' }}>
                            <div className="spinner"></div>
                            <p>Loading curated selection...</p>
                        </div>
                    ) : (
                        <>
                            <div className="product-grid-main">
                                {paginatedProducts.length > 0 ? (
                                    paginatedProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onPreviewShades={(p) => navigate(`/product/${p.id}`)}
                                        />
                                    ))
                                ) : (
                                    <div className="no-products">
                                        <h3>No products found matching your filters</h3>
                                        <p>Try clearing your filters to see more results.</p>
                                        <button className="clear-all-btn" onClick={() => handleFilterChange('clear', {})}>
                                            Clear All Filters
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Centered Pagination UI */}
                            {totalPages > 1 && (
                                <div className="pagination-wrapper-centered">
                                    {/* <div className="pagination-top-info">
                                        Page {currentPage} of {totalPages}
                                    </div> */}
                                    <div className="pagination-main-group">
                                        <button
                                            className="pagination-circular-arrow"
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            ‹
                                        </button>

                                        <div className="pagination-numbers-box">
                                            {[...Array(totalPages)].map((_, index) => {
                                                const page = index + 1;
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={page}
                                                            className={`page-num ${currentPage === page ? 'active' : ''}`}
                                                            onClick={() => goToPage(page)}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                } else if (
                                                    (page === currentPage - 2 && page > 1) ||
                                                    (page === currentPage + 2 && page < totalPages)
                                                ) {
                                                    return <span key={page} className="pagination-dots-break">...</span>;
                                                }
                                                return null;
                                            })}
                                        </div>

                                        <button
                                            className="pagination-circular-arrow"
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            ›
                                        </button>
                                    </div>
                                    <div className="pagination-bottom-info">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrandProducts;
