import React from 'react';

export default function Widget({ children, className = '' }) {
    return (
        <div
            className={`card w-full bg-base-200 shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}
        >
            <div className="card-body p-4">{children}</div>
        </div>
    );
}
