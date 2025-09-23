import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Checkbox, Select, DatePicker, Radio } from '../../../../components/Form';
import { PERIOD } from '../../../../constants/WMS_Codes/period';

const TPHIInformation = () => {
    const { member, setMember, application } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');

    const [formData, setFormData] = useState(member?.tphi);

    const status = member?.insuranceInformation?.tphi;
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
        setFormData(member?.tphi);
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
                    tphi: formData,
                    insuranceInformation: {
                        tphi: fieldStatuses,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            // console.log("response", response);
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">TPHI Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The TPHI information of the member.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                        <Checkbox
                            name="noChange"
                            id="noChange"
                            label="Check here if the TPHI information has not changed"
                            value={formData.noChange}
                            checked={formData.noChange}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.noChange}
                            onStatusChange={(newStatus) => handleStatusChange('noChange', newStatus)}
                        />
                    </div>

                    { !formData.noChange &&
                        <div className="col-span-12">
                            <Checkbox
                                name="tphi"
                                id="tphi"
                                label="Does the member have a spouse or parent who can provide other health insurance?"
                                value={formData.tphi}
                                checked={formData.tphi}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.tphi}
                                onStatusChange={(newStatus) => handleStatusChange('tphi', newStatus)}
                            />
                        </div>
                    }

                    { formData.tphi && !formData.noChange && <div className="col-span-4">
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            label="Name of Spouse or Parent"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={28}
                            pattern="^[a-zA-Z\s]*$"
                            patternError="Please enter a valid name"
                            disabled={!isEditing}
                            status={fieldStatuses.name}
                            onStatusChange={(newStatus) => handleStatusChange('name', newStatus)}
                        />
                    </div> }

                    { formData.tphi && !formData.noChange && <div className="col-span-8">
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            label="Address of Spouse or Parent"
                            value={formData.address}
                            onChange={handleChange}
                            maxLength={28}
                            disabled={!isEditing}
                            status={fieldStatuses.address}
                            onStatusChange={(newStatus) => handleStatusChange('address', newStatus)}
                        />
                    </div> }
                            
                    { formData.tphi && !formData.noChange && <div className="col-span-4">
                        <Input
                            type="text"
                            name="insurer"
                            id="insurer"
                            label="Name of Insurer"
                            value={formData.insurer}
                            onChange={handleChange}
                            maxLength={28}
                            disabled={!isEditing}
                            status={fieldStatuses.insurer}
                            onStatusChange={(newStatus) => handleStatusChange('insurer', newStatus)}
                        />
                    </div> }
                                
                    { formData.tphi && !formData.noChange && <div className="col-span-4">
                        <Input
                            type="text"
                            name="amount"
                            id="amount"
                            label="Premium Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            maxLength={7}
                            pattern="^[0-9]*$"
                            patternError="Amount must be a valid number"
                            disabled={!isEditing}
                            status={fieldStatuses.amount}
                            onStatusChange={(newStatus) => handleStatusChange('amount', newStatus)}
                        />
                    </div> }
                            
                    { formData.tphi && !formData.noChange && <div className="col-span-4">
                        <Select
                            name="period"
                            id="period"
                            label="Period"
                            options={PERIOD}
                            value={formData.period}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.period}
                            onStatusChange={(newStatus) => handleStatusChange('period', newStatus)}
                        />
                    </div> }
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

export default TPHIInformation; 