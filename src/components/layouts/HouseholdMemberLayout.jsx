import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const HouseholdMemberLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { application, setApplication } = useOutletContext();
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');
    const [member, setMember] = useState(application.householdMember.find(member => member._id === memberId));

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
        <div className="h-[calc(100vh-4rem)] bg-gray-100">
            <div className="flex flex-col h-full">
                {/* Top Navigation */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <button
                                        onClick={() => navigate(`/application/household-composition`)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                    </button>
                                </div>
                                <nav className="ml-6 flex space-x-8">
                                    <Link
                                        to={`/application/household-composition/member/general-information`}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                            isActive(`/application/household-composition/member/general-information`)
                                                ? 'border-indigo-500 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        General Information
                                    </Link>
                                    <Link
                                        to={`/application/household-composition/member/incomes`}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                            isActive(`/application/household-composition/member/incomes`)
                                                ? 'border-indigo-500 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        Incomes
                                    </Link>
                                    <Link
                                        to={`/application/household-composition/member/insurance-information`}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                            isActive(`/application/household-composition/member/insurance-information`)
                                                ? 'border-indigo-500 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        Insurance Information
                                    </Link>
                                </nav>
                            </div>
                            <div className="flex items-center">
                                <p className="text-base text-gray-500 truncate">Member: {member.legalName.first} {member.legalName.middle} {member.legalName.last}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <Outlet context={{ member, setMember, application }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseholdMemberLayout; 