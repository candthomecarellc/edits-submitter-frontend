import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const Overview = () => {
    const { application, setApplication } = useOutletContext();
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    const handleStatusUpdate = async (newStatus) => {
        try {
            setUpdating(true);
            const accessToken = localStorage.getItem('accessToken');
            await axios.patch(
                `http://localhost:3000/api/v1/application/${application._id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setApplication(prev => ({ ...prev, status: newStatus }));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    return (
        <div>
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Application ID: {application._id}
                    </p>
                </div>
                {application.status === 'PENDING' && (
                    <div className="mt-4 sm:mt-0 flex space-x-2">
                        <button
                            onClick={() => handleStatusUpdate('APPROVED')}
                            disabled={updating}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            {updating ? 'Updating...' : 'Approve'}
                        </button>
                        <button
                            onClick={() => handleStatusUpdate('REJECTED')}
                            disabled={updating}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            {updating ? 'Updating...' : 'Reject'}
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Application Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application status.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                    application.status === 'PENDING' 
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : application.status === 'APPROVED'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {application.status}
                                </span>
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Applicant Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {application.applicantName?.firstName} {application.applicantName?.lastName}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {application.applicantName?.email}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {application.applicantName?.phone}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {application.applicantName?.address?.street}<br />
                                {application.applicantName?.address?.city}, {application.applicantName?.address?.state} {application.applicantName?.address?.zipCode}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {new Date(application.createdAt).toLocaleString()}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {new Date(application.updatedAt).toLocaleString()}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Overview; 