export const getBorderColor = (status) => {
    switch (status) {
        case 'confirmed':
            return 'border-green-200';
        case 'review':
            return 'border-2 border-yellow-300';
        case 'error':
            return 'border-2 border-red-500';
        case 'default':
            return 'border-gray-400';
        default:
            return 'border-gray-400';
    }
};