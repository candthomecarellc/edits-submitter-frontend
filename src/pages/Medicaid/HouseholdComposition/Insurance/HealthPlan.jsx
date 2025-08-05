import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Checkbox } from '../../../../components/Form';

const HealthPlan = () => {
    const { member, setMember } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');
    
    const [formData, setFormData] = useState({
        healthPlan: member?.healthPlan || '',
        currentDoctor: member?.currentDoctor || '',
        healthInsurance: {
            healthPlan: {
                healthPlanName: member?.healthInsurance?.healthPlan?.healthPlanName || '',
                preferredDoctor: member?.healthInsurance?.healthPlan?.preferredDoctor || '',
            }
        }
    });

    const status = member?.insuranceInformation?.healthPlan;
    const [fieldStatuses, setFieldStatuses] = useState({
        healthPlan: status?.healthPlan || '',
        healthPlanName: status?.healthPlanName || '',
        currentDoctor: status?.currentDoctor || '',
        preferredDoctor: status?.preferredDoctor || '',
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

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.checked
        }));
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
            healthPlan: member?.healthPlan || '',
            currentDoctor: member?.currentDoctor || '',
            healthInsurance: {
                healthPlan: {
                    healthPlanName: member?.healthInsurance?.healthPlan?.healthPlanName || '',
                    preferredDoctor: member?.healthInsurance?.healthPlan?.preferredDoctor || '',
                }
            }
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
                    healthInsurance: {
                        healthPlan: {
                            ...formData.healthInsurance.healthPlan,
                        }
                    },
                    insuranceInformation: {
                        healthPlan: fieldStatuses,
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Health Plan</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the member's health plan information
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-6 flex items-center pt-6">
                        <Checkbox
                            name="healthPlan"
                            id="healthPlan"
                            label="The Member Does Not Want To Be In A Health Plan."
                            value={formData.healthPlan}
                            checked={formData.healthPlan}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.healthPlan}
                            onStatusChange={(newStatus) => handleStatusChange('healthPlan', newStatus)}
                        />
                    </div>

                    <div className="col-span-6">
                        <Input
                            type="text"
                            name="healthInsurance.healthPlan.healthPlanName"
                            id="healthInsurance.healthPlan.healthPlanName"
                            label="Health Plan Name"
                            value={formData.healthInsurance.healthPlan.healthPlanName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.healthPlanName}
                            onStatusChange={(newStatus) => handleStatusChange('healthPlanName', newStatus)}
                        />
                    </div>

                    <div className="col-span-6 flex items-center pt-6">
                        <Checkbox
                            name="currentDoctor"
                            id="currentDoctor"
                            label="The Member Prefers The Current Doctor."
                            value={formData.currentDoctor}
                            checked={formData.currentDoctor}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.currentDoctor}
                            onStatusChange={(newStatus) => handleStatusChange('currentDoctor', newStatus)}
                        />
                    </div>

                    <div className="col-span-6">
                        <Input
                            type="text"
                            name="healthInsurance.healthPlan.preferredDoctor"
                            id="healthInsurance.healthPlan.preferredDoctor"
                            label="Preferred Doctor Name"
                            value={formData.healthInsurance.healthPlan.preferredDoctor}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.preferredDoctor}
                            onStatusChange={(newStatus) => handleStatusChange('preferredDoctor', newStatus)}
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

export default HealthPlan; 