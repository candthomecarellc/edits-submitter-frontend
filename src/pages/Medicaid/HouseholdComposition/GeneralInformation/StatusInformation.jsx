import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Checkbox, Select, DatePicker, Radio } from '../../../../components/Form';
import { MARITAL_STATUS } from '../../../../constants/WMS_Codes/maritalStatus';
import { EDUCATION_LEVEL } from '../../../../constants/educationLevel';
import { STUDENT_TYPES } from '../../../../constants/selectOptions';

const StatusInformation = () => {
    const { member, setMember } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');

    const [formData, setFormData] = useState({
        applying: member?.applying || false,
        responsibleAdult: member?.responsibleAdult || false,
        veteran: member?.veteran || false,
        pregnant: member?.pregnant || false,
        pregnantDueDate: member?.pregnantDueDate || '',
        maritalStatus: member?.maritalStatus || '',
        studentId: member?.studentId || 0,
        studentType: member?.studentType || '',
        educationLevel: member?.educationLevel || 0,
    });

    const status = member?.generalInformation?.statusInformation;
    const [fieldStatuses, setFieldStatuses] = useState(status);

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
            applying: member?.applying || false,
            responsibleAdult: member?.responsibleAdult || false,
            veteran: member?.veteran || false,
            pregnant: member?.pregnant || false,
            pregnantDueDate: member?.pregnantDueDate || '',
            maritalStatus: member?.maritalStatus || '',
            studentId: member?.studentId || 0,
            studentType: member?.studentType || '',
            educationLevel: member?.educationLevel || 0,
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
                        statusInformation: fieldStatuses,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("response", response);
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Status Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The status information of the member.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-6">
                    <div className="pb-6">
                            <Checkbox
                                name="applying"
                                id="applying"
                                label="Is the member applying for health insurance?"
                                value={formData.applying}
                                checked={formData.applying}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.applying}
                                onStatusChange={(newStatus) => handleStatusChange('applying', newStatus)}
                            />
                        </div>
                    
                        <div className="pb-6">
                            <Checkbox
                                name="responsibleAdult"
                                id="responsibleAdult"
                                label="Is the member responsible for any applying child?"
                                value={formData.responsibleAdult}
                                checked={formData.responsibleAdult}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.responsibleAdult}
                                onStatusChange={(newStatus) => handleStatusChange('responsibleAdult', newStatus)}
                            />
                        </div>
                    
                        <div className="pb-6">
                            <Checkbox
                                name="veteran"
                                id="veteran"
                                label="Veteran"
                                value={formData.veteran}
                                checked={formData.veteran}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.veteran}
                                onStatusChange={(newStatus) => handleStatusChange('veteran', newStatus)}
                            />
                        </div>
                            
                        <div className="pb-6">
                            <Checkbox
                                name="pregnant"
                                id="pregnant"
                                label="Pregnant"
                                value={formData.pregnant}
                                checked={formData.pregnant}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.pregnant}
                                onStatusChange={(newStatus) => handleStatusChange('pregnant', newStatus)}
                            />
                        </div>
                            
                        <div className="pb-6">
                            <DatePicker
                                name="pregnantDueDate"
                                id="pregnantDueDate"
                                label="Pregnant Due Date"
                                value={formData.pregnantDueDate}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.pregnantDueDate}
                                onStatusChange={(newStatus) => handleStatusChange('pregnantDueDate', newStatus)}
                            />
                        </div>
                    </div>

                    <div className="col-span-6">
                        <div className="pb-6">
                            <Select
                                name="maritalStatus"
                                id="maritalStatus"
                                label="Marital Status"
                                value={formData.maritalStatus}
                                options={MARITAL_STATUS}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.maritalStatus}
                                onStatusChange={(newStatus) => handleStatusChange('maritalStatus', newStatus)}
                            />
                        </div>
                        
                        <div className="grid grid-cols-6 gap-6 border border-gray-200 rounded-md p-4">
                            <div className="col-span-6">
                                <Input
                                    name="studentId"
                                    id="studentId"
                                    label="Student ID"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    maxLength={9}
                                    disabled={!isEditing}
                                    status={fieldStatuses.studentId}
                                    onStatusChange={(newStatus) => handleStatusChange('studentId', newStatus)}
                                />
                            </div>

                            <div className="col-span-3">
                                <Select
                                    name="educationLevel"
                                    id="educationLevel"
                                    label="Education Level"
                                    value={formData.educationLevel}
                                    options={EDUCATION_LEVEL}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.educationLevel}
                                    onStatusChange={(newStatus) => handleStatusChange('educationLevel', newStatus)}
                                />
                            </div>
                        
                            <div className="col-span-3">
                                <Radio
                                    name="studentType"
                                    id="studentType"
                                    label="Student Type"
                                    value={formData.studentType}
                                    options={STUDENT_TYPES}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.studentType}
                                    onStatusChange={(newStatus) => handleStatusChange('studentType', newStatus)}
                                />
                            </div>
                        </div>
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

export default StatusInformation; 