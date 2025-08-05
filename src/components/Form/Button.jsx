import React from 'react';

const Button = ({
    type = 'button',
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    disabled = false,
    loading = false,
    fullWidth = false,
    className = '',
}) => {
    const baseStyles = 'inline-flex justify-center items-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
        primary: 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
        success: 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
        >
            {loading ? (
                <>
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button; 