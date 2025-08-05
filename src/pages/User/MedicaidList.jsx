import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NewApplicationModal from '../../components/Modals/NewApplicationModal';
import { APPLICATION_STATUS, status } from '../../constants/ApplicationConstants';

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const accessToken = localStorage.getItem('edits-submitter.accessToken');
                const response = await axios.get('http://localhost:3000/api/v1/application/list', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log(response.data.data);
                setApplications(response.data.data);
                console.log(applications);
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
        localStorage.setItem('edits-submitter.currentApplicationId', applicationId);
        navigate('/application/overview');
    };

    const handleCreateNew = () => {
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (formData) => {
        try {
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            formData.createdBy = JSON.parse(localStorage.getItem('edits-submitter.user')).userName;
            console.log(formData);
            const response = await axios.post(
                'http://localhost:3000/api/v1/application',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            
            // Add the new application to the list
            setApplications(prev => [response.data.data, ...prev]);
            setIsModalOpen(false);
            
            // Navigate to the new application
            localStorage.setItem('edits-submitter.currentApplicationId', response.data.data._id);
            navigate('/application/overview');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create new application');
        }
    };

    // Filter and sort applications
    const filteredApplications = applications
        .filter(app => {
            const matchesStatus = filterStatus === 'ALL' || app.statusValue === filterStatus;
            const matchesSearch = searchTerm === '' || 
                app.caseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.caseId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicant?.first?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicant?.last?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            let comparison = 0;
            
            switch (sortField) {
                case 'createdAt':
                case 'updatedAt':
                    comparison = new Date(a[sortField]) - new Date(b[sortField]);
                    break;
                case 'status':
                    comparison = String(a.statusValue).localeCompare(String(b.statusValue));
                    break;
                case 'applicantName':
                    const aName = `${a.applicant?.first || ''} ${a.applicant?.last || ''}`.trim();
                    const bName = `${b.applicant?.first || ''} ${b.applicant?.last || ''}`.trim();
                    comparison = aName.localeCompare(bName);
                    break;
                case 'caseId':
                case 'caseName':
                case 'createdBy':
                    comparison = String(a[sortField] || '').localeCompare(String(b[sortField] || ''));
                    break;
                default:
                    comparison = String(a[sortField] || '').localeCompare(String(b[sortField] || ''));
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
            <NewApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
            />
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Medicaid Applications</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all Medicaid applications in the system.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={handleCreateNew}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        New Application
                    </button>
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
                        {APPLICATION_STATUS.map((status) => (
                            <option value={status.value}>{status.label}</option>
                        ))}
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
                                            onClick={() => handleSort('caseId')}
                                        >
                                            Case ID {sortField === 'caseId' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                                            onClick={() => handleSort('caseName')}
                                        >
                                            Case Name {sortField === 'caseName' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                                            onClick={() => handleSort('createdBy')}
                                        >
                                            Created By {sortField === 'createdBy' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                                            onClick={() => handleSort('createdAt')}
                                        >
                                            Created At {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                                            onClick={() => handleSort('updatedAt')}
                                        >
                                            Updated At {sortField === 'updatedAt' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                                                {application.caseId}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {application.caseName}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {application.applicant?.first} {application.applicant?.last}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${status(application.status).color}`}>
                                                    {status(application.status).label}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {application.createdBy}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {new Date(application.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {new Date(application.updatedAt).toLocaleDateString()}
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
