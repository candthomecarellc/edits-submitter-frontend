import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Select, Button } from '../../../components/Form';
import { PHONE_TYPES } from '../../../constants/phone';
import { APPLICATION_TYPES } from '../../../constants/WMS_Codes/applicationTypes';
import { SUBMISSION_TYPES } from '../../../constants/WMS_Codes/submissionTypes';

const PersonalDetails = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const renewal = application.submissionType === 'renewal';

    // startNavGuardFeature
    // const { setEditingForms } = useOutletContext();

    // useEffect(() => {
    // // Report editing state when form data changes
    // const hasChanges = checkForChanges(formData, originalData);
    // setEditingForms(prev => ({
    //     ...prev,
    //     applicantInformation: hasChanges
    // }));
    // }, [formData, originalData, setEditingForms]);

    // const [originalData, setOriginalData] = useState(null);
    // const [hasChanges, setHasChanges] = useState(false);

    // useEffect(() => {
    // setOriginalData(formData);
    // }, []);

    // useEffect(() => {
    // const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
    // setHasChanges(changed);
    
    // // Report to parent
    // setEditingForms(prev => ({
    //     ...prev,
    //     [formName]: changed
    // }));
    // }, [formData, originalData, formName, setEditingForms]);
    // endNavGuardFeature

    const [formData, setFormData] = useState({
        legalFirstName: application?.applicant?.first || '',
        legalMiddleInitial: application?.applicant?.middle || '',
        legalLastName: application?.applicant?.last || '',
        primaryPhone: application?.primaryPhone?.number || '',
        primaryPhoneType: application?.primaryPhone?.type || '',
        anotherPhone: application?.anotherPhone?.number || '',
        anotherPhoneType: application?.anotherPhone?.type || '',
        email: application?.email || '',
        applicationType: application?.applicationType || '',
        submissionType: application?.submissionType || '',
    });

    const status = application?.fieldStatus?.personalDetails;
    const [fieldStatuses, setFieldStatuses] = useState({
        legalFirstName: status?.legalFirstName || 'empty',
        legalMiddleInitial: status?.legalMiddleInitial || 'empty',
        legalLastName: status?.legalLastName || 'empty',
        primaryPhone: status?.primaryPhone || 'empty',
        primaryPhoneType: status?.primaryPhoneType || 'empty',
        anotherPhone: status?.anotherPhone || 'empty',
        anotherPhoneType: status?.anotherPhoneType || 'empty',
        email: status?.email || 'empty',
        applicationType: status?.applicationType || 'empty',
        submissionType: status?.submissionType || 'empty',
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

    const handleStatusChange = (fieldName, newStatus) => {
        setFieldStatuses(prev => ({
            ...prev,
            [fieldName]: newStatus
        }));
    };

    const handleEdit = () => {
        setOriginalData(JSON.parse(JSON.stringify(application)));
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData(prev => ({
            ...prev,
            legalFirstName: application?.applicant?.first || '',
            legalMiddleInitial: application?.applicant?.middle || '',
            legalLastName: application?.applicant?.last || '',
            primaryPhone: application?.primaryPhone?.number || '',
            primaryPhoneType: application?.primaryPhone?.type || '',
            anotherPhone: application?.anotherPhone?.number || '',
            anotherPhoneType: application?.anotherPhone?.type || '',
            email: application?.email || '',
            applicationType: application?.applicationType || '',
            submissionType: application?.submissionType || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            legalFirstName: status?.legalFirstName || 'empty',
            legalMiddleInitial: status?.legalMiddleInitial || 'empty',
            legalLastName: status?.legalLastName || 'empty',
            primaryPhone: status?.primaryPhone || 'empty',
            primaryPhoneType: status?.primaryPhoneType || 'empty',
            anotherPhone: status?.anotherPhone || 'empty',
            anotherPhoneType: status?.anotherPhoneType || 'empty',
            email: status?.email || 'empty',
            applicationType: status?.applicationType || 'empty',
            submissionType: status?.submissionType || 'empty',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            const response = await axios.patch(
                `http://localhost:3000/api/v1/application/${application._id}`,
                {
                    applicationType: formData.applicationType,
                    submissionType: formData.submissionType,
                    applicant: {
                        first: formData.legalFirstName,
                        middle: formData.legalMiddleInitial,
                        last: formData.legalLastName,
                    },
                    email: formData.email,
                    primaryPhone: {
                        type: formData.primaryPhoneType,
                        number: formData.primaryPhone,
                    },
                    anotherPhone: {
                        type: formData.anotherPhoneType,
                        number: formData.anotherPhone,
                    },
                    fieldStatus: {
                        personalDetails: fieldStatuses,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setApplication(prev => ({
                ...prev,
                applicationType: response.data.data.applicationType,
                submissionType: response.data.data.submissionType,
                applicant: response.data.data.applicant,
                email: response.data.data.email,
                primaryPhone: response.data.data.primaryPhone,
                anotherPhone: response.data.data.anotherPhone,
            }));
            setFieldStatuses(response.data.data.fieldStatus.personalDetails);
            setSuccess('Applicant information updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update applicant information');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            {error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{success}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow mb-6 px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Details</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Basic information about the applicant.
                    </p>
                </div>
                <div className={`md:grid md:gap-6 ${renewal ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                    {!renewal &&
                    <div className="col-span-1 sm:col-span-1">
                        <Select
                            name="applicationType"
                            id="applicationType"
                            label="Application Type"
                            value={formData.applicationType}
                            onChange={handleChange}
                            options={APPLICATION_TYPES}
                            required={true}
                            disabled={!isEditing}
                            status={fieldStatuses.applicationType}
                            onStatusChange={(newStatus) => handleStatusChange('applicationType', newStatus)}
                        />
                    </div>}

                    <div className="col-span-1 sm:col-span-1">
                        <Select
                            name="submissionType"
                            id="submissionType"
                            label="Submission Type"
                            value={formData.submissionType}
                            onChange={handleChange}
                            options={SUBMISSION_TYPES}
                            required={true}
                            disabled={!isEditing}
                            status={fieldStatuses.submissionType}
                            onStatusChange={(newStatus) => handleStatusChange('submissionType', newStatus)}
                        />
                    </div>

                    {renewal && 
                    <div className="col-span-1 sm:col-span-1">
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.email}
                            onStatusChange={(newStatus) => handleStatusChange('email', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-2 sm:col-span-1 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <Input
                                    type="text"
                                    name="legalFirstName"
                                    id="legalFirstName"
                                    label="Legal First Name"
                                    value={formData.legalFirstName}
                                    required={true}
                                    maxLength={10}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.legalFirstName}
                                    onStatusChange={(newStatus) => handleStatusChange('legalFirstName', newStatus)}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <Input
                                    type="text"
                                    name="legalMiddleInitial"
                                    id="legalMiddleInitial"
                                    label="Legal Middle Initial"
                                    value={formData.legalMiddleInitial}
                                    required={true}
                                    maxLength={1}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.legalMiddleInitial}
                                    onStatusChange={(newStatus) => handleStatusChange('legalMiddleInitial', newStatus)}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <Input
                                    type="text"
                                    name="legalLastName"
                                    id="legalLastName"
                                    label="Legal Last Name"
                                    value={formData.legalLastName}
                                    required={true}
                                    maxLength={17}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.legalLastName}
                                    onStatusChange={(newStatus) => handleStatusChange('legalLastName', newStatus)}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    label="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.email}
                                    onStatusChange={(newStatus) => handleStatusChange('email', newStatus)}
                                />
                            </div>
                        </div>
                    </div>}

                    {renewal && 
                    <div className="col-span-1 sm:col-span-1">
                        <Input
                            type="primaryPhone"
                            name="primaryPhone"
                            id="primaryPhone"
                            label="Primary Phone"
                            value={formData.primaryPhone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.primaryPhone}
                            onStatusChange={(newStatus) => handleStatusChange('primaryPhone', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-2 sm:col-span-1 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-4">
                                <Input
                                    type="primaryPhone"
                                    name="primaryPhone"
                                    id="primaryPhone"
                                    label="Primary Phone"
                                    value={formData.primaryPhone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.primaryPhone}
                                    onStatusChange={(newStatus) => handleStatusChange('primaryPhone', newStatus)}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <Select
                                    name="primaryPhoneType"
                                    id="primaryPhoneType"
                                    label="Primary Phone Type"
                                    value={formData.primaryPhoneType}
                                    onChange={handleChange}
                                    options={PHONE_TYPES}
                                    disabled={!isEditing}
                                    status={fieldStatuses.primaryPhoneType}
                                    onStatusChange={(newStatus) => handleStatusChange('primaryPhoneType', newStatus)}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <Input
                                    type="anotherPhone"
                                    name="anotherPhone"
                                    id="anotherPhone"
                                    label="Another Phone"
                                    value={formData.anotherPhone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.anotherPhone}
                                    onStatusChange={(newStatus) => handleStatusChange('anotherPhone', newStatus)}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-2">
                                <Select
                                    name="anotherPhoneType"
                                    id="anotherPhoneType"
                                    label="Another Phone Type"
                                    value={formData.anotherPhoneType}
                                    required={true}
                                    onChange={handleChange}
                                    options={PHONE_TYPES}
                                    disabled={!isEditing}
                                    status={fieldStatuses.anotherPhoneType}
                                    onStatusChange={(newStatus) => handleStatusChange('anotherPhoneType', newStatus)}
                                />
                            </div>
                        </div>
                    </div>}
                </div>

                {!isEditing && (
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <Button
                            variant="primary"
                            onClick={handleEdit}
                        >
                            Edit Information
                        </Button>
                    </div>
                )}

                {isEditing && (
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                        >
                            Save Changes
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default PersonalDetails; 