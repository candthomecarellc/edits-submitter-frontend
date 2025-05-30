import { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const UserLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/');
            return;
        }
        try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } catch (err) {
            console.error('Error parsing user data:', err);
            setError('Invalid user data');
            navigate('/');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            await axios.post(
                'http://localhost:3000/api/v1/users/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return null; // or a redirect component
    }

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <h1 className="text-xl font-semibold text-gray-900">Edits Submitter</h1>
                            <div className="hidden md:flex space-x-4">
                                <Link
                                    to="/dashboard"
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        isActive('/dashboard')
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/applications"
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        isActive('/applications')
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Applications
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">
                                Welcome, {user?.userName || 'User'}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="">
                {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                {/* Main content will be rendered here */}
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout; 