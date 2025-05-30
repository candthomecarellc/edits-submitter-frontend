import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const MedicaidList = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:3000/api/v1/application', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setApplications(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleViewDetails = (applicationId) => {
        navigate(`/application/${applicationId}/overview`);
    };

    // Filter and sort applications
    const filteredApplications = applications
        .filter(app => {
            const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
            const matchesSearch = searchTerm === '' || 
                app.applicantName?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicantName?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app._id.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            let comparison = 0;
            if (sortField === 'createdAt') {
                comparison = new Date(a[sortField]) - new Date(b[sortField]);
            } else if (sortField === 'applicantName') {
                comparison = `${a.applicantName?.firstName} ${a.applicantName?.lastName}`.localeCompare(
                    `${b.applicantName?.firstName} ${b.applicantName?.lastName}`
                );
            } else {
                comparison = String(a[sortField]).localeCompare(String(b[sortField]));
            }
            return sortDirection === 'asc' ? comparison : -comparison;
        });

    // Pagination
    const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
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

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Medicaid Applications</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all Medicaid applications in the system.
                    </p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-48">
                    <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Applications Table */}
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th 
                                            scope="col" 
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer"
                                            onClick={() => handleSort('_id')}
                                        >
                                            Application ID {sortField === '_id' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                                            onClick={() => handleSort('applicantName')}
                                        >
                                            Applicant Name {sortField === 'applicantName' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                                            onClick={() => handleSort('status')}
                                        >
                                            Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                                            onClick={() => handleSort('createdAt')}
                                        >
                                            Created At {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {paginatedApplications.map((application) => (
                                        <tr key={application._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {application._id}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {application.applicantName?.firstName} {application.applicantName?.lastName}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                    application.status === 'PENDING' 
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : application.status === 'APPROVED'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {application.status}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {new Date(application.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button
                                                    onClick={() => handleViewDetails(application._id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedApplications.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-3 py-4 text-sm text-gray-500 text-center">
                                                No applications found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                            disabled={currentPage === totalPages}
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                                <span className="font-medium">
                                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredApplications.length)}
                                </span>{' '}
                                of <span className="font-medium">{filteredApplications.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                            currentPage === index + 1
                                                ? 'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicaidList;
