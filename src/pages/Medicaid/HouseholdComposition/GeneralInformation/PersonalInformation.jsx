import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Radio, DatePicker } from '../../../../components/Form';
import { SEX, GENDER } from '../../../../constants/WMS_Codes/gender';
import { RELATIONSHIP } from '../../../../constants/WMS_Codes/relationship';
import { NAME_TYPES } from '../../../../constants/selectOptions';

const PersonalInformation = () => {
    const { member, setMember } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');

    const [formData, setFormData] = useState({
        lineNumber: member?.lineNumber || '',
        legalName: {
            first: member?.legalName?.first || '',
            middle: member?.legalName?.middle || '',
            last: member?.legalName?.last || '',   
        },
        otherName: {
            code: member?.otherName?.code || '',
            first: member?.otherName?.first || '',
            middle: member?.otherName?.middle || '',
            last: member?.otherName?.last || '',
        },
        dateOfBirth: member?.dateOfBirth || '',
        sex: member?.sex || '',
        gender: member?.gender || '',
        relationshipToApplicant: member?.relationshipToApplicant || '',
        birthCity: member?.birthCity || '',
        birthState: member?.birthState || '',
        birthCountry: member?.birthCountry || '',
        motherName: member?.motherName || '',
    });

    const status = member?.generalInformation?.personalInformation;
    const [fieldStatuses, setFieldStatuses] = useState({
        lineNumber: status?.lineNumber || 'empty',
        legalFirstName: status?.legalFirstName || 'empty',
        legalMiddleInitial: status?.legalMiddleInitial || 'empty',
        legalLastName: status?.legalLastName || 'empty',
        otherNameType: status?.otherNameType || 'empty',
        otherNameFirst: status?.otherNameFirst || 'empty',
        otherNameMiddle: status?.otherNameMiddle || 'empty',
        otherNameLast: status?.otherNameLast || 'empty',
        dateOfBirth: status?.dateOfBirth || 'empty',
        sex: status?.sex || 'empty',
        gender: status?.gender || 'empty',
        relationshipToApplicant: status?.relationshipToApplicant || 'empty',
        birthCity: status?.birthCity || 'empty',
        birthState: status?.birthState || 'empty',
        birthCountry: status?.birthCountry || 'empty',
        motherName: status?.motherName || 'empty',
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
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData({
            lineNumber: member?.lineNumber || '',
            legalName: {
                first: member?.legalName?.first || '',
                middle: member?.legalName?.middle || '',
                last: member?.legalName?.last || '',   
            },
            otherName: {
                code: member?.otherName?.code || '',
                first: member?.otherName?.first || '',
                middle: member?.otherName?.middle || '',
                last: member?.otherName?.last || '',
            },
            dateOfBirth: member?.dateOfBirth || '',
            sex: member?.sex || '',
            gender: member?.gender || '',
            relationshipToApplicant: member?.relationshipToApplicant || '',
            birthCity: member?.birthCity || '',
            birthState: member?.birthState || '',
            birthCountry: member?.birthCountry || '',
            motherName: member?.motherName || '',
        });
        setIsEditing(false);
        setError('');
        setFieldStatuses(status);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            const response = await axios.patch(
                `http://localhost:3000/api/v1/application/${applicationId}/household-member/${memberId}`,
                {
                    ...formData,
                    generalInformation: {
                        personalInformation: fieldStatuses,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setMember(prev => ({
                ...prev,
                applicantName: response.data.data.applicantName
            }));
            setSuccess('Applicant information updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update applicant information');
        } finally {
            setLoading(false);
        }
    };

    const lineNumberOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ];

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
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The personal information of the member.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-2">
                        <Select
                            name="lineNumber"
                            id="lineNumber"
                            label="Line Number"
                            value={formData.lineNumber}
                            onChange={handleChange}
                            options= { lineNumberOptions }
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.lineNumber}
                            onStatusChange={(newStatus) => handleStatusChange('lineNumber', newStatus)}
                        />
                    </div>
                    <div className="col-span-4">
                        <Input
                            type="legalName.first"
                            name="legalName.first"
                            id="legalName.first"
                            label="Legal First Name"
                            value={formData.legalName.first}
                            onChange={handleChange}
                            required
                            maxLength={10}
                            pattern="^[a-zA-Z]*$"
                            patternError="Please enter a valid first name."
                            disabled={!isEditing}
                            status={fieldStatuses.legalFirstName}
                            onStatusChange={(newStatus) => handleStatusChange('legalFirstName', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            type="legalName.middle"
                            name="legalName.middle"
                            id="legalName.middle"
                            label="Legal Middle Initial"
                            value={formData.legalName.middle}
                            onChange={handleChange}
                            required
                            maxLength={1}
                            pattern="^[a-zA-Z]*$"
                            patternError="Please enter the first letter of the middle name."
                            disabled={!isEditing}
                            status={fieldStatuses.legalMiddleInitial}
                            onStatusChange={(newStatus) => handleStatusChange('legalMiddleInitial', newStatus)}
                        />
                    </div>

                    <div className="col-span-4">
                        <Input
                            type="legalName.last"
                            name="legalName.last"
                            id="legalName.last"
                            label="Legal Last Name"
                            value={formData.legalName.last}
                            onChange={handleChange}
                            required
                            maxLength={17}
                            pattern="^[a-zA-Z]*$"
                            patternError="Please enter a valid last name."
                            disabled={!isEditing}
                            status={fieldStatuses.legalLastName}
                            onStatusChange={(newStatus) => handleStatusChange('legalLastName', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Radio
                            name="otherName.code"
                            id="otherName.code"
                            label="Other Name Type"
                            value={formData.otherName.code}
                            onChange={handleChange}
                            options={NAME_TYPES}
                            disabled={!isEditing}
                            status={fieldStatuses.otherNameType}
                            onStatusChange={(newStatus) => handleStatusChange('otherNameType', newStatus)}
                        />
                    </div>

                    <div className="col-span-4">
                        <Input
                            type="otherName.first"
                            name="otherName.first"
                            id="otherName.first"
                            label="Other First Name"
                            value={formData.otherName.first}
                            onChange={handleChange}
                            maxLength={10}
                            pattern="^[a-zA-Z]*$"
                            patternError="Please enter a valid first name."
                            disabled={!isEditing}
                            status={fieldStatuses.otherNameFirst}
                            onStatusChange={(newStatus) => handleStatusChange('otherNameFirst', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            type="otherName.middle"
                            name="otherName.middle"
                            id="otherName.middle"
                            label="Other Middle Initial"
                            value={formData.otherName.middle}
                            onChange={handleChange}
                            maxLength={1}
                            pattern="^[a-zA-Z]*$"
                            patternError="Please enter the first letter of the middle name."
                            disabled={!isEditing}
                            status={fieldStatuses.otherNameMiddle}
                            onStatusChange={(newStatus) => handleStatusChange('otherNameMiddle', newStatus)}
                        />
                    </div>

                    <div className="col-span-4">
                        <Input
                            type="otherName.last"
                            name="otherName.last"
                            id="otherName.last"
                            label="Other Last Name"
                            value={formData.otherName.last}
                            onChange={handleChange}
                            maxLength={17}
                            pattern="^[a-zA-Z]*$"
                            patternError="Please enter a valid last name."
                            disabled={!isEditing}
                            status={fieldStatuses.otherNameLast}
                            onStatusChange={(newStatus) => handleStatusChange('otherNameLast', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <DatePicker
                            name="dateOfBirth"
                            id="dateOfBirth"
                            label="Date of Birth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.dateOfBirth}
                            onStatusChange={(newStatus) => handleStatusChange('dateOfBirth', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Select
                            name="sex"
                            id="sex"
                            label="Sex"
                            value={formData.sex}
                            onChange={handleChange}
                            options={SEX}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.sex}
                            onStatusChange={(newStatus) => handleStatusChange('sex', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Select
                            name="gender"
                            id="gender"
                            label="Gender"
                            value={formData.gender}
                            onChange={handleChange}
                            options={GENDER}
                            disabled={!isEditing}
                            status={fieldStatuses.gender}
                            onStatusChange={(newStatus) => handleStatusChange('gender', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Select
                            name="relationshipToApplicant"
                            id="relationshipToApplicant"
                            label="Relationship to Applicant"
                            value={formData.relationshipToApplicant}
                            onChange={handleChange}
                            options={RELATIONSHIP}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.relationshipToApplicant}
                            onStatusChange={(newStatus) => handleStatusChange('relationshipToApplicant', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="birthCity"
                            name="birthCity"
                            id="birthCity"
                            label="City of Birth"
                            value={formData.birthCity}
                            onChange={handleChange}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.birthCity}
                            onStatusChange={(newStatus) => handleStatusChange('birthCity', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="birthState"
                            name="birthState"
                            id="birthState"
                            label="State of Birth"
                            value={formData.birthState}
                            onChange={handleChange}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.birthState}
                            onStatusChange={(newStatus) => handleStatusChange('birthState', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="birthCountry"
                            name="birthCountry"
                            id="birthCountry"
                            label="Country of Birth"
                            value={formData.birthCountry}
                            onChange={handleChange}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.birthCountry}
                            onStatusChange={(newStatus) => handleStatusChange('birthCountry', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="motherName"
                            name="motherName"
                            id="motherName"
                            label="Mother's Name"
                            value={formData.motherName}
                            onChange={handleChange}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.motherName}
                            onStatusChange={(newStatus) => handleStatusChange('motherName', newStatus)}
                        />
                    </div>
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

export default PersonalInformation; 