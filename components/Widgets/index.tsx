import React from 'react';

interface WidgetProps {
    children: React.ReactNode;
    className?: string;
}

export default function Widget({ children, className = '' }: WidgetProps) {
    return (
        <div
            className={`bg-base-200 border border-white/5 transition-all duration-200 hover:border-primary/20 hover:glow-primary-sm ${className}`}
        >
            <div className="p-4">{children}</div>
        </div>
    );
}
