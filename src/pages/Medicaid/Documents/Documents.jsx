import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { FiUpload, FiDownload, FiTrash2, FiEdit2, FiEye, FiFileText } from 'react-icons/fi';
import Select from '../../../components/Form/Select';
import Button from '../../../components/Form/Button';
import Input from '../../../components/Form/Input';
import Checkbox from '../../../components/Form/Checkbox';
import { DOCUMENTS } from '../../../constants/WMS_Codes/documents';

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        required: 0,
        optional: 0
    });
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadForm, setUploadForm] = useState({
        documentType: '',
        documentCategory: '',
        description: '',
        isRequired: false
    });

    useEffect(() => {
        if (application._id) {
            fetchDocuments();
        }
    }, [application._id]);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            console.log('Fetching documents for application:', application._id);
            
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            const response = await fetch(`http://localhost:3000/api/v1/documents/application/${application._id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.success) {
                setDocuments(data.data.documents);
                setStats(data.data.stats);
            } else {
                console.error('API returned success: false:', data);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Please select a PDF file');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !uploadForm.documentType || !uploadForm.documentCategory) {
            alert('Please fill in all required fields and select a file');
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('document', selectedFile);
            formData.append('documentType', uploadForm.documentType);
            formData.append('documentCategory', uploadForm.documentCategory);
                                        formData.append('description', uploadForm.description);
            formData.append('isRequired', uploadForm.isRequired);

            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            const response = await fetch(`http://localhost:3000/api/v1/documents/application/${application._id}/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Document uploaded successfully');
                setShowUploadForm(false);
                setSelectedFile(null);
                setUploadForm({
                    documentType: '',
                    documentCategory: '',
                    description: '',
                    isRequired: false
                });
                fetchDocuments();
            } else {
                alert('Failed to upload document');
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Error uploading document');
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = async (documentId) => {
        try {
            window.open(`http://localhost:3000/api/v1/documents/${documentId}/download`, '_blank');
        } catch (error) {
            console.error('Error downloading document:', error);
            alert('Error downloading document');
        }
    };

    const handleDelete = async (documentId) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            try {
                            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            const response = await fetch(`http://localhost:3000/api/v1/documents/${documentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

                const data = await response.json();
                
                if (data.success) {
                    alert('Document deleted successfully');
                    fetchDocuments();
                } else {
                    alert('Failed to delete document');
                }
            } catch (error) {
                console.error('Error deleting document:', error);
                alert('Error deleting document');
            }
        }
    };

    const handleStatusUpdate = async (documentId, newStatus) => {
        try {
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            const response = await fetch(`http://localhost:3000/api/v1/documents/${documentId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();
            
            if (data.success) {
                fetchDocuments();
            } else {
                alert('Failed to update document status');
            }
        } catch (error) {
            console.error('Error updating document status:', error);
            alert('Error updating document status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-600 bg-green-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-yellow-600 bg-yellow-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return '✓';
            case 'rejected': return '✗';
            default: return '⏳';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading documents...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                <p className="mt-2 text-gray-600">Manage and upload documents for this application</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                    <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                    <div className="text-sm text-gray-600">Rejected</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="text-2xl font-bold text-purple-600">{stats.required}</div>
                    <div className="text-sm text-gray-600">Required</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <div className="text-2xl font-bold text-gray-600">{stats.optional}</div>
                    <div className="text-sm text-gray-600">Optional</div>
                </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow border mb-8">
                <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
                        <Button
                            onClick={() => setShowUploadForm(!showUploadForm)}
                            className="flex items-center gap-2"
                        >
                            <FiUpload className="w-4 h-4" />
                            {showUploadForm ? 'Cancel' : 'Upload New Document'}
                        </Button>
                    </div>
                </div>

                {showUploadForm && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Document Type *
                                </label>
                                <Select
                                    value={uploadForm.documentType}
                                    onChange={(e) => setUploadForm({
                                        ...uploadForm,
                                        documentType: e.target.value
                                    })}
                                    options={DOCUMENTS.map(doc => ({
                                        value: `${doc.category}-${doc.code}`,
                                        label: `${doc.category} ${doc.code} - ${doc.value}`
                                    }))}
                                    placeholder="Select document type"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Document Category *
                                </label>
                                <Select
                                    value={uploadForm.documentCategory}
                                    onChange={(e) => setUploadForm({
                                        ...uploadForm,
                                        documentCategory: e.target.value
                                    })}
                                    options={[
                                        { value: 'identity', label: 'Identity Documents' },
                                        { value: 'income', label: 'Income Documents' },
                                        { value: 'residence', label: 'Residence Documents' },
                                        { value: 'medical', label: 'Medical Documents' },
                                        { value: 'other', label: 'Other Documents' }
                                    ]}
                                    placeholder="Select category"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <Input
                                    type="text"
                                    value={uploadForm.description}
                                    onChange={(e) => setUploadForm({
                                        ...uploadForm,
                                        description: e.target.value
                                    })}
                                    placeholder="Document description (optional)"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Checkbox
                                    checked={uploadForm.isRequired}
                                    onChange={(e) => setUploadForm({
                                        ...uploadForm,
                                        isRequired: e.target.checked
                                    })}
                                    label="This is a required document"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select PDF File *
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {selectedFile && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected: {selectedFile.name}
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Button
                                    onClick={handleUpload}
                                    disabled={uploading || !selectedFile}
                                    className="w-full"
                                >
                                    {uploading ? 'Uploading...' : 'Upload Document'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-lg shadow border">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Uploaded Documents</h2>
                </div>

                {documents.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        <FiFileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p>No documents uploaded yet</p>
                        <p className="text-sm">Upload your first document using the form above</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Document
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Uploaded
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.map((document) => (
                                    <tr key={document._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FiFileText className="h-8 w-8 text-red-500 mr-3" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {document.originalName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {(document.fileSize / 1024 / 1024).toFixed(2)} MB
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{document.documentType}</div>
                                            {document.description && (
                                                <div className="text-sm text-gray-500">{document.description}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {document.documentCategory}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={document.status}
                                                onChange={(e) => handleStatusUpdate(document._id, e.target.value)}
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(document.status)} border-0`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(document.uploadDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleDownload(document._id)}
                                                    className="text-blue-600 hover:text-blue-900 p-1"
                                                    title="Download"
                                                >
                                                    <FiDownload className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(document._id)}
                                                    className="text-red-600 hover:text-red-900 p-1"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Documents;
