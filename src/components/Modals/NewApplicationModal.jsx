import { useState } from 'react';
import { SUBMISSION_TYPES } from '../../constants/WMS_Codes/submissionTypes';

const NewApplicationModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        applicant: {
            first: '',
            middle: '',
            last: '',
        },
        email: '',
        primaryPhone: {
            type: Number,
            number: Number,
        },
        caseName: '',
        providerId: '',
        patientId: '',
        submissionType: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Create New Application</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="applicant.first" className="block text-sm font-medium text-gray-700">
                            Applicant First Name
                        </label>
                        <input
                            type="text"
                            name="applicant.first"
                            id="applicant.first"
                            value={formData.applicant.first}
                            required
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="applicant.middle" className="block text-sm font-medium text-gray-700">
                            Applicant Middle Initial
                        </label>
                        <input
                            type="text"
                            name="applicant.middle"
                            id="applicant.middle"
                            value={formData.applicant.middle}
                            required
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="applicant.last" className="block text-sm font-medium text-gray-700">
                            Applicant Last Name
                        </label>
                        <input
                            type="text"
                            name="applicant.last"
                            id="applicant.last"
                            value={formData.applicant.last}
                            required
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="primaryPhone.number" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="primaryPhone.number"
                            id="primaryPhone.number"
                            value={formData.primaryPhone.number}
                            required
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="primaryPhone.type" className="block text-sm font-medium text-gray-700">
                            Phone Type
                        </label>
                        <select
                            name="primaryPhone.type"
                            id="primaryPhone.type"
                            value={formData.primaryPhone.type}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">-Select-</option>
                            <option value="1">Home</option>
                            <option value="2">Cell</option>
                            <option value="3">Work</option>
                            <option value="4">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="caseName" className="block text-sm font-medium text-gray-700">
                            Case Name
                        </label>
                        <input
                            type="text"
                            name="caseName"
                            id="caseName"
                            value={formData.caseName}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="providerId" className="block text-sm font-medium text-gray-700">
                            Provider ID
                        </label>
                        <input
                            type="text"
                            name="providerId"
                            id="providerId"
                            value={formData.providerId}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                            Provider's Patient ID
                        </label>
                        <input
                            type="text"
                            name="patientId"
                            id="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="submissionType" className="block text-sm font-medium text-gray-700">
                            Submission Type
                        </label>
                        <select
                            type="select"
                            name="submissionType"
                            id="submissionType"
                            value={formData.submissionType}
                            required
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            {SUBMISSION_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewApplicationModal;