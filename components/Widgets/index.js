import React from 'react';

export default function Widget({ children, className = '' }) {
    return (
        <div
            className={`bg-base-200 border border-white/5 transition-all duration-200 hover:border-primary/20 hover:glow-primary-sm ${className}`}
        >
            <div className="p-4">{children}</div>
        </div>
    );
}
