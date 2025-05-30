import { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const ApplicationLayout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`http://localhost:3000/api/v1/application/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setApplication(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch application details');
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    const isActive = (path) => location.pathname === path;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Application not found</h3>
                <button
                    onClick={() => navigate('/applications')}
                    className="mt-4 text-indigo-600 hover:text-indigo-900"
                >
                    Back to Applications
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Side Navigation */}
                <div className="w-64 bg-indigo-200 shadow-sm min-h-screen">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">Application</h2>
                        <p className="text-sm text-gray-500 truncate">ID: {application._id}</p>
                        <div className="mt-2">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                application.status === 'PENDING' 
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : application.status === 'APPROVED'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {application.status}
                            </span>
                        </div>
                    </div>
                    <nav className="mt-4">
                        <Link
                            to={`/application/${id}/overview`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/${id}/overview`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Overview
                        </Link>
                        <Link
                            to={`/application/${id}/applicant-information`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/${id}/applicant-information`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Applicant Information
                        </Link>
                        <Link
                            to={`/application/${id}/expense`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/${id}/expense`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Household Expense
                        </Link>
                        <Link
                            to={`/application/${id}/household-composition`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/${id}/household-composition`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Household Composition
                        </Link>
                        <Link
                            to={`/application/${id}/documents`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/${id}/documents`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Documents
                        </Link>
                        <Link
                            to={`/application/${id}/history`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/${id}/history`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            History
                        </Link>
                    </nav>
                    <div className="absolute bottom-0 w-64 p-4 border-t">
                        <button
                            onClick={() => navigate('/applications')}
                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to Applications
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="p-6">
                        <Outlet context={{ application, setApplication }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationLayout; 