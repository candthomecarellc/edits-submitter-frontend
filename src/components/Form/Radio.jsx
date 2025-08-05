import React, { useState, useEffect } from 'react';
import StatusIcon from './StatusIcon';
import { getBorderColor } from './borderColor';

const Radio = ({
    name,
    label,
    options = [],
    value,
    required = false,
    disabled = false,
    error,
    status = 'default', // 'confirmed', 'review', 'default', 'error'
    onChange,
    onStatusChange,
    className = '',
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [validationError, setValidationError] = useState('');

    // Clear validation error when value changes (e.g., on cancel)
    useEffect(() => {
        if (value) {
            const newStatus = validateInput(value);
            if (newStatus !== 'error') {
                setValidationError('');
            }
        } else {
            setValidationError('');
        }
    }, [value]);

    const validateInput = (value) => {
        if (required && !value) {
            setValidationError('This field is required');
            return 'error';
        }
        setValidationError('');
        return 'review';
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        const newStatus = validateInput(newValue);
        if (onStatusChange) {
            onStatusChange(newStatus);
        }
        onChange(e);
    };

    const handleStatusClick = () => {
        if (onStatusChange) {
            const newStatus = status === 'review' ? 'confirmed' : status === 'confirmed' ? 'default' : 'review';
            onStatusChange(newStatus);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-left mb-2">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <StatusIcon
                    status={status}
                    onClick={handleStatusClick}
                    disabled={disabled || status === 'error'}
                />
            </div>
            <div className="flex flex-wrap gap-4 relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            type="radio"
                            id={`${name}-${option.value}`}
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={handleChange}
                            disabled={disabled}
                            className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded ${getBorderColor(status)} ${
                                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${
                                error ? 'border-red-500' : ''
                            } ${className}`}
                        />
                        <label
                            htmlFor={`${name}-${option.value}`}
                            className={`ml-2 block text-sm ${
                                disabled ? 'text-gray-400' : 'text-gray-700'
                            }`}
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
                {(error || validationError) && (
                    <div 
                        className={`absolute z-50 mt-1 p-2 bg-red-100 text-red-700 text-sm rounded shadow-lg transition-opacity duration-200 ${
                            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                        style={{
                            top: '100%',
                            left: '0',
                            minWidth: '200px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        {error || validationError}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Radio; 