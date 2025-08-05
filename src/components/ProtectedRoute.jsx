import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const accessToken = localStorage.getItem('edits-submitter.accessToken');
    const user = localStorage.getItem('edits-submitter.user');

    if (!accessToken || !user) {
        // Redirect to login page but save the attempted url
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute; 