import React, { useState, useMemo } from 'react';

/**
 * FilterSidebar Component
 * Provides collapsible filter sections for product filtering.
 */
const FilterSidebar = ({ activeFilters, onFilterChange, currentBrand }) => {
    const [expandedSections, setExpandedSections] = useState({
        brand: true,
        category: true,
        price: true,
        rating: false,
        discount: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const brandOptions = useMemo(() => {
        const defaultBrands = ['Maybelline', 'L\'Oreal', 'NYX', 'e.l.f.', 'Revlon', 'Milani'];
        if (currentBrand && !defaultBrands.some(b => b.toLowerCase() === currentBrand.toLowerCase())) {
            // Capitalize first letter for display
            const formattedBrand = currentBrand.charAt(0).toUpperCase() + currentBrand.slice(1);
            return [formattedBrand, ...defaultBrands];
        }
        return defaultBrands;
    }, [currentBrand]);

    const filterSections = [
        { id: 'brand', label: 'Brand', options: brandOptions },
        { id: 'category', label: 'Category', options: ['Foundation', 'Lipstick', 'Eyeliner', 'Mascara', 'Blush'] },
        { id: 'price', label: 'Price', options: ['Below ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'] },
        { id: 'discount', label: 'Discount', options: ['10% and above', '20% and above', '30% and above', '50% and above'] },
        { id: 'rating', label: 'Avg Customer Rating', options: ['4★ & above', '3★ & above', '2★ & above'] }
    ];

    const handleCheckboxChange = (sectionId, value) => {
        const currentFilters = activeFilters[sectionId] || [];
        const newFilters = currentFilters.includes(value)
            ? currentFilters.filter(item => item !== value)
            : [...currentFilters, value];

        onFilterChange(sectionId, newFilters);
    };

    return (
        <aside className="filter-sidebar">
            <div className="filter-header">
                <h3>Filters</h3>
                <button className="clear-all-btn" onClick={() => onFilterChange('clear', {})}>Clear All</button>
            </div>

            <div className="filter-sections-container">
                {filterSections.map((section) => (
                    <div key={section.id} className={`filter-group ${expandedSections[section.id] ? 'expanded' : ''}`}>
                        <div className="group-header" onClick={() => toggleSection(section.id)}>
                            <span>{section.label}</span>
                            <span className="toggle-icon">{expandedSections[section.id] ? '−' : '+'}</span>
                        </div>
                        {expandedSections[section.id] && (
                            <div className="group-options">
                                {section.options.map((option) => (
                                    <label key={option} className="option-label">
                                        <input
                                            type="checkbox"
                                            checked={activeFilters[section.id]?.includes(option) || false}
                                            onChange={() => handleCheckboxChange(section.id, option)}
                                        />
                                        <span className="checkmark"></span>
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default FilterSidebar;
