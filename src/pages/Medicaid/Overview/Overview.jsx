import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { status } from '../../../constants/ApplicationConstants';
import Information from './Information';
import Status from './Status';
import Tasks from './Tasks';
import History from './History';

const Overview = () => {
    const { application, setApplication } = useOutletContext();
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    const handleStatusUpdate = async (newStatus) => {
        try {
            setUpdating(true);
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
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
        <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
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

            <Information />
            <Status />
            <Tasks />
            <History />
        </div>
    );
};

export default Overview; 