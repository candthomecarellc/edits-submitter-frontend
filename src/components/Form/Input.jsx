import React, { useState, useEffect } from 'react';
import StatusIcon from './StatusIcon';
import { getBorderColor } from './borderColor';

const Input = ({
    type = 'text',
    name,
    id,
    label,
    placeholder,
    value,
    maxLength,
    pattern, // regex pattern as string
    required = false,
    disabled = false,
    error,
    patternError = 'Invalid format', // custom error message for pattern
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
        if (maxLength && value.length > maxLength) {
            setValidationError(`Maximum length is ${maxLength} characters`);
            return 'error';
        }
        if (pattern && value) {
            const regex = new RegExp(pattern);
            if (!regex.test(value)) {
                setValidationError(patternError);
                return 'error';
            }
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
            <div className="flex items-center">
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <StatusIcon
                    status={status}
                    onClick={handleStatusClick}
                    disabled={disabled || status === 'error'}
                />
            </div>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md border ${getBorderColor(status)} ${
                        (error || validationError) ? 'border-red-500' : ''
                    } ${className}`}
                />
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

export default Input; 