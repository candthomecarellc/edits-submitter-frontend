import { useOutletContext } from 'react-router-dom';
import { status } from '../../../constants/ApplicationConstants';

const Information = () => {
    const { application } = useOutletContext();

    return (
        <div className="mt-10 mb-20 overflow-hidden sm:rounded-lg">
            <div className="grid grid-cols-3 gap-10">
                <div className="col-span-1 bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    <dl>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Applicant Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.applicant?.first} {application.applicant?.middle} {application.applicant?.last}
                            </dd>
                        </div>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.email}
                            </dd>
                        </div>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.primaryPhone?.number}
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.residence?.street}<br />
                                {application.residence?.city}, {application.residence?.state} {application.residence?.zip}
                            </dd>
                        </div>
                    </dl>
                </div>
                
                <div className="col-span-1 bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    <dl>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Case ID</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.caseId}
                            </dd>
                        </div>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Case Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.caseName}
                            </dd>
                        </div>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Patient ID</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.patientId}
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Provider ID</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.providerId}
                            </dd>
                        </div>
                    </dl>
                </div>
                
                <div className="col-span-1 bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                    <dl>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                <span className={`px-2 py-1 rounded-full text-xs ${status(application.status).color}`}>{application.status}</span>
                            </dd>
                        </div>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Created By</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {application.createdBy}
                            </dd>
                        </div>
                        <div className="px-4 py-2 border-b border-gray-200 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                { new Date(application.createdAt).toLocaleDateString()}
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                {new Date(application.updatedAt).toLocaleDateString()}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Information;