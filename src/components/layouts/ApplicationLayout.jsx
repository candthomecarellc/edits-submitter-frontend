import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const ApplicationLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // startNavGuardFeature
    // const [editingForms, setEditingForms] = useState({
    //     applicantInformation: false,
    //     householdExpense: false,
    //     householdComposition: false,
    //     documents: false,
    //     // ... other forms
    // });
    
    // const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    // const handleNavigation = (path) => {
    //     if (hasUnsavedChanges) {
    //       setShowSavePrompt(true);
    //       setPendingNavigation(path);
    //     } else {
    //       navigate(path);
    //     }
    // };

    // In ApplicationLayout.jsx
    // const checkForEditingState = () => {
    //     return Object.values(editingForms).some(isEditing => isEditing);
    // };
    
    // useEffect(() => {
    //     setHasUnsavedChanges(checkForEditingState());
    // }, [editingForms]);
    
    // const handleSaveAndNavigate = async (targetPath) => {
    //     try {
    //     // Save all pending changes
    //     await saveApplication(application);
    //     setEditingForms({}); // Reset all editing states
    //     setHasUnsavedChanges(false);
    //     navigate(targetPath);
    //     } catch (error) {
    //     console.error('Failed to save:', error);
    //     }
    // };
    // endNavGuardFeature

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const accessToken = localStorage.getItem('edits-submitter.accessToken');
                const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
                
                if (!applicationId) {
                    navigate('/applications');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/api/v1/application/${applicationId}`, {
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
    }, [navigate]);

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
                    // startNavGuardFeature
                    // onClick={() => handleNavigation('/application/applicant-information')}
                    // endNavGuardFeature
                    className="mt-4 text-indigo-600 hover:text-indigo-900"
                >
                    Back to Applications
                </button>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-4rem)] bg-gray-100">
            <div className="flex h-full">
                {/* Side Navigation */}
                <div className="w-64 bg-indigo-200 shadow-sm h-full">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">Application</h2>
                        <p className="text-sm text-gray-500 truncate">Applicant: {application.applicant?.first} {application.applicant?.middle} {application.applicant?.last}</p>
                        <p className="text-sm text-gray-500 truncate">{application.email}</p>
                        <p className="text-sm text-gray-500 truncate">{application.primaryPhone?.number}</p>
                    </div>
                    <nav className="mt-4">
                        <Link
                            to={`/application/overview`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/overview`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Overview
                        </Link>
                        <Link
                            to={`/application/applicant-information`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/applicant-information`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Applicant Information
                        </Link>
                        <Link
                            to={`/application/household-expense`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/household-expense`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Household Expense
                        </Link>
                        <Link
                            to={`/application/household-composition`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/household-composition`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Household Composition
                        </Link>
                        <Link
                            to={`/application/documents`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/documents`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Documents
                        </Link>
                        <Link
                            to={`/application/response`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/response`)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Response
                        </Link>
                        <Link
                            to={`/application/history`}
                            className={`flex items-center px-4 py-2 text-sm font-medium ${
                                isActive(`/application/history`)
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
                <div className="flex-1 overflow-y-auto">
                    <div className="">
                        <Outlet context={{ application, setApplication }} />
                        {/* startNavGuardFeature */}
                        {/* <Outlet context={{ application, setApplication, setEditingForms }} /> */}
                        {/* endNavGuardFeature */}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-80 bg-gray-900 text-white p-6 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4">Field Status Legend</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full bg-green-300"></div>
                            <span>Confirmed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
                            <span>Inputed but not confirmed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full bg-red-300"></div>
                            <span>Required but not inputed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            <span>Not required and not inputed</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Application Status</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    application.status === 'PENDING' 
                                        ? 'bg-yellow-900 text-yellow-300'
                                        : application.status === 'APPROVED'
                                        ? 'bg-green-900 text-green-300'
                                        : 'bg-red-900 text-red-300'
                                }`}>
                                    {application.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Created:</span>
                                <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Last Updated:</span>
                                <span>{new Date(application.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button
                                onClick={() => navigate(`/application/overview`)}
                                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive(`/application/overview`)
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                View Overview
                            </button>
                            <button
                                onClick={() => navigate(`/application/documents`)}
                                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive(`/application/documents`)
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                View Documents
                            </button>
                            <button
                                onClick={() => navigate(`/application/history`)}
                                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive(`/application/history`)
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                View History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationLayout; 