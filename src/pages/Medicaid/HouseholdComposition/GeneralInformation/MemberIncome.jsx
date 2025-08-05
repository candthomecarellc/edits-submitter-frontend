import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Checkbox, DatePicker, Select } from '../../../../components/Form';

const OtherInformation = () => {
    const { member, setMember } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');

    const [formData, setFormData] = useState({
        selfEmployed: member?.selfEmployed || false,
        changedJob: member?.changedJob || false,
        lastJobDate: member?.lastJobDate || '',
        employerName: member?.employerName || '',
        childIdentifier: member?.childIdentifier || '',
        chronicCareIndicator: member?.chronicCareIndicator || '',
    });

    const status = member?.generalInformation?.memberIncome;
    const [fieldStatuses, setFieldStatuses] = useState({
        selfEmployed: status?.selfEmployed || 'empty',
        changedJob: status?.changedJob || 'empty',
        lastJobDate: status?.lastJobDate || 'empty',
        employerName: status?.employerName || 'empty',
        childIdentifier: status?.childIdentifier || 'empty',
        chronicCareIndicator: status?.chronicCareIndicator || 'empty',
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
        setFormData(prev => ({
            ...prev,
            selfEmployed: member?.selfEmployed || false,
            changedJob: member?.changedJob || false,
            lastJobDate: member?.lastJobDate || '',
            employerName: member?.employerName || '',
            childIdentifier: member?.childIdentifier || '',
            chronicCareIndicator: member?.chronicCareIndicator || '',
        }));
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
                        memberIncome: fieldStatuses,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setSuccess('Applicant information updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update applicant information');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.checked
        }));
    }

    const childIdentifierOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ];

    const chronicCareIndicatorOptions = [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Member Income</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Income information of the member.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-6">
                        <Checkbox
                            name="selfEmployed"
                            id="selfEmployed"
                            label="Self Employed"
                            value={formData.selfEmployed}
                            checked={formData.selfEmployed}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.selfEmployed}
                            onStatusChange={(newStatus) => handleStatusChange('selfEmployed', newStatus)}
                        />
                    </div>

                    <div className="col-span-6">
                        <Checkbox
                            name="changedJob"
                            id="changedJob"
                            label="Recently Changed Jobs"
                            value={formData.changedJob}
                            checked={formData.changedJob}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.changedJob}
                            onStatusChange={(newStatus) => handleStatusChange('changedJob', newStatus)}
                        />
                    </div>
                    
                    <div className="col-span-6">
                        <DatePicker
                            name="lastJobDate"
                            id="lastJobDate"
                            label="Last Job Date"
                            value={formData.lastJobDate}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.lastJobDate}
                            onStatusChange={(newStatus) => handleStatusChange('lastJobDate', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-6">
                        <Input
                            type="text"
                            name="employerName"
                            id="employerName"
                            label="Employer Name"
                            value={formData.employerName}
                            onChange={handleChange}
                            maxLength={30}
                            pattern="^[a-zA-Z0-9\s]*$"
                            patternError="Please enter a valid name."
                            disabled={!isEditing}
                            status={fieldStatuses.employerName}
                            onStatusChange={(newStatus) => handleStatusChange('employerName', newStatus)}
                        />
                    </div>

                    <div className="col-span-6">
                        <Select
                            name="childIdentifier"
                            id="childIdentifier"
                            label="Child Identifier"
                            value={formData.childIdentifier}
                            onChange={handleChange}
                            options={childIdentifierOptions}
                            disabled={!isEditing}
                            status={fieldStatuses.childIdentifier}
                            onStatusChange={(newStatus) => handleStatusChange('childIdentifier', newStatus)}
                        />
                    </div>

                    <div className="col-span-6">
                        <Select
                            name="chronicCareIndicator"
                            id="chronicCareIndicator"
                            label="Chronic Care Indicator"
                            value={formData.chronicCareIndicator}
                            onChange={handleChange}
                            options={chronicCareIndicatorOptions}
                            disabled={!isEditing}
                            status={fieldStatuses.chronicCareIndicator}
                            onStatusChange={(newStatus) => handleStatusChange('chronicCareIndicator', newStatus)}
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

export default OtherInformation; 