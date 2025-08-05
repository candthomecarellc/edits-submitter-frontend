import { INCOME_TYPES, INCOME_TYPE_LABELS, INCOME_TYPE_URLS } from '../constants/incomeTypes';

/**
 * Converts an income type number to its corresponding label
 * @param {number} type - The income type number
 * @returns {string} The corresponding income type label
 */
export const getIncomeTypeLabel = (type) => {
    return INCOME_TYPE_LABELS[type] || 'Unknown Income Type';
};

/**
 * Gets the corresponding income array key based on the income type
 * @param {number} type - The income type number
 * @returns {string} The corresponding income url
 */
export const getIncomeUrl = (type) => {
    return INCOME_TYPE_URLS[type];
};

/**
 * Validates if a given type is a valid income type
 * @param {number} type - The income type to validate
 * @returns {boolean} Whether the type is valid
 */
export const isValidIncomeType = (type) => {
    return Object.values(INCOME_TYPES).includes(type);
}; 