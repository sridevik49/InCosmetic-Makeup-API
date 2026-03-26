import React from 'react';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading...</p>
        </div>
    );
};

export default Loader;
