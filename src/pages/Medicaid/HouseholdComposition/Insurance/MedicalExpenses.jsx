import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Checkbox } from '../../../../components/Form';

const MedicalExpenses = () => {
    const { member, setMember } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');
    
    const [formData, setFormData] = useState({
        healthInsurance: {
            monthBilled: member?.healthInsurance?.monthBilled || '',
            moveInState: member?.healthInsurance?.moveInState || '',
            moveInCounty: member?.healthInsurance?.moveInCounty || '',
        },
        recentMedicalBill: member?.recentMedicalBill || '',
        oldMedicalBill: member?.oldMedicalBill || '',
        pendingLawsuit: member?.pendingLawsuit || '',
        injured: member?.injured || '',
        recentMoveIn: member?.recentMoveIn || '',
    });

    const status = member?.insuranceInformation?.medicalExpense;
    const [fieldStatuses, setFieldStatuses] = useState({
        recentMedicalBill: status?.recentMedicalBill || '',
        monthBilled: status?.monthBilled || '',
        oldMedicalBill: status?.oldMedicalBill || '',
        pendingLawsuit: status?.pendingLawsuit || '',
        injured: status?.injured || '',
        recentMoveIn: status?.recentMoveIn || '',
        moveInState: status?.moveInState || '',
        moveInCounty: status?.moveInCounty || '',
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
            healthInsurance: {
                monthBilled: member?.healthInsurance?.monthBilled || '',
                moveInState: member?.healthInsurance?.moveInState || '',
                moveInCounty: member?.healthInsurance?.moveInCounty || '',
            },
            recentMedicalBill: member?.recentMedicalBill || '',
            oldMedicalBill: member?.oldMedicalBill || '',
            pendingLawsuit: member?.pendingLawsuit || '',
            injured: member?.injured || '',
            recentMoveIn: member?.recentMoveIn || '',
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
                        ...formData.healthInsurance,
                    },
                    insuranceInformation: {
                        medicalExpense: fieldStatuses,
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
                ...response.data.data,
            }))
            setSuccess('Applicant information updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update applicant information');
        } finally {
            setLoading(false);
        }
    };

    const monthOptions = [
        { value: '1', label: '1 Month Ago' },
        { value: '2', label: '2 Months Ago' },
        { value: '3', label: '3 Months Ago' },
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Medical Expenses</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the member's medical expenses information
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-12">
                        <Checkbox
                            name="recentMedicalBill"
                            id="recentMedicalBill"
                            label="Does The Member Have A Medical Bill In The Last 3 Months?"
                            value={formData.recentMedicalBill}
                            checked={formData.recentMedicalBill}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.recentMedicalBill}
                            onStatusChange={(newStatus) => handleStatusChange('recentMedicalBill', newStatus)}
                        />
                    </div>

                    {formData.recentMedicalBill && (
                        <div className="col-span-6">
                            <Select
                                name="healthInsurance.monthBilled"
                                id="healthInsurance.monthBilled"
                                label="Month Billed"
                                value={formData.healthInsurance.monthBilled}
                                onChange={handleChange}
                                options={monthOptions}
                                disabled={!isEditing}
                                status={fieldStatuses.monthBilled}
                                onStatusChange={(newStatus) => handleStatusChange('monthBilled', newStatus)}
                            />
                        </div>
                    )}

                    <div className="col-span-12">
                        <Checkbox
                            name="oldMedicalBill"
                            id="oldMedicalBill"
                            label="Does The Member Have A Medical Bill Before The Last 3 Months?"
                            value={formData.oldMedicalBill}
                            checked={formData.oldMedicalBill}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.oldMedicalBill}
                            onStatusChange={(newStatus) => handleStatusChange('oldMedicalBill', newStatus)}
                        />
                    </div>

                    <div className="col-span-12">
                        <Checkbox
                            name="pendingLawsuit"
                            id="pendingLawsuit"
                            label="Does The Member Have A Pending Lawsuit?"
                            value={formData.pendingLawsuit}
                            checked={formData.pendingLawsuit}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.pendingLawsuit}
                            onStatusChange={(newStatus) => handleStatusChange('pendingLawsuit', newStatus)}
                        />
                    </div>

                    <div className="col-span-12">
                        <Checkbox
                            name="injured"
                            id="injured"
                            label="Was The Member Injured By Someone?"
                            value={formData.injured}
                            checked={formData.injured}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.injured}
                            onStatusChange={(newStatus) => handleStatusChange('injured', newStatus)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-12">
                        <Checkbox
                            name="recentMoveIn"
                            id="recentMoveIn"
                            label="Has The Member moved into this county from another state or New York State county within the past three months?"
                            value={formData.recentMoveIn}
                            checked={formData.recentMoveIn}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.recentMoveIn}
                            onStatusChange={(newStatus) => handleStatusChange('recentMoveIn', newStatus)}
                        />
                    </div>

                    {formData.recentMoveIn && (
                        <div className="col-span-6">
                            <Input
                                type="text"
                                name="healthInsurance.moveInState"
                                id="healthInsurance.moveInState"
                                label="State"
                                value={formData.healthInsurance.moveInState}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.moveInState}
                                onStatusChange={(newStatus) => handleStatusChange('moveInState', newStatus)}
                            />
                        </div>
                    )}

                    {formData.recentMoveIn && (
                        <div className="col-span-6">
                            <Input
                                type="text"
                                name="healthInsurance.moveInCounty"
                                id="healthInsurance.moveInCounty"
                                label="County"
                                value={formData.healthInsurance.moveInCounty}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.moveInCounty}
                                onStatusChange={(newStatus) => handleStatusChange('moveInCounty', newStatus)}
                            />
                        </div>
                    )}
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

export default MedicalExpenses; 