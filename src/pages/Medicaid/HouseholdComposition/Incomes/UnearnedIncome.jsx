import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Checkbox } from '../../../../components/Form';
import { UNEARNED_INCOME_CD } from '../../../../constants/WMS_Codes/unearnedIncomeCD';
import { UNEARNED_INCOME_SOURCES } from '../../../../constants/WMS_Codes/unearnedIncomeSources';
import { PERIOD } from '../../../../constants/WMS_Codes/period';
import { CTG } from '../../../../constants/WMS_Codes/ctg';

const UnearnedIncome = ({ income }) => {
    const { member, setMember, application } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');
    const renewal = application.submissionType === 'renewal';

    const [formData, setFormData] = useState({
        ctg: income?.ctg || '',
        source: income?.source || '',
        amount: income?.amount || '',
        period: income?.period || '',
        cd1: income?.cd1 || '',
        exempt1: income?.exempt1 || '',
        cd2: income?.cd2 || '',
        exempt2: income?.exempt2 || '',
        noChange: income?.noChange || false,
    });

    const [fieldStatuses, setFieldStatuses] = useState({
        ctg: income?.fieldStatus?.ctg || 'default',
        source: income?.fieldStatus?.source || 'default',
        amount: income?.fieldStatus?.amount || 'default',
        period: income?.fieldStatus?.period || 'default',
        cd1: income?.fieldStatus?.cd1 || 'default',
        exempt1: income?.fieldStatus?.exempt1 || 'default',
        cd2: income?.fieldStatus?.cd2 || 'default',
        exempt2: income?.fieldStatus?.exempt2 || 'default',
        noChange: income?.fieldStatus?.noChange || 'default',
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
            ctg: income?.ctg || '',
            source: income?.source || '',
            amount: income?.amount || '',
            period: income?.period || '',
            cd1: income?.cd1 || '',
            exempt1: income?.exempt1 || '',
            cd2: income?.cd2 || '',
            exempt2: income?.exempt2 || '',
            noChange: income?.noChange || false,
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(income?.fieldStatus);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this unearned income?')) {
            setMember(prev => ({
                ...prev,
                income: {
                    ...prev.income,
                    unearnedIncome: prev.income.unearnedIncome.filter(item => item._id !== income._id)
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Update the member state with the new unearned income data
            const updatedUnearnedIncome = {
                ...income,
                ...formData,
                fieldStatus: fieldStatuses,
            };
            // console.log("updatedUnearnedIncome", updatedUnearnedIncome);

            // Update the member's unearned income array and get the updated member
            const updatedMember = {
                ...member,
                income: {
                    ...member.income,
                    unearnedIncome: member.income.unearnedIncome.map(item => 
                        item._id === income._id ? updatedUnearnedIncome : item
                    )
                }
            };
            
            // console.log("updatedMember", updatedMember);
            
            // Update local state
            setMember(updatedMember);

            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            const response = await axios.patch(
                `http://localhost:3000/api/v1/application/${applicationId}/household-member/${memberId}`,
                updatedMember,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            
            // Update with server response if needed
            if (response.data.data) {
                setMember(response.data.data);
            }

            setSuccess('Applicant information updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update applicant information');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Unearned Income Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The unearned income information of the member.
                        </p>
                    </div>
                    {isEditing && (
                        <div>
                            <Button
                                variant="danger"
                                onClick={handleDelete}
                            >
                                Delete Income
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    { renewal &&
                    <div className="col-span-12">
                        <Checkbox
                            name="noChange"
                            id="noChange"
                            label="Check here if the unearned income information has not changed"
                            value={formData.noChange}
                            checked={formData.noChange}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.noChange}
                            onStatusChange={(newStatus) => handleStatusChange('noChange', newStatus)}
                        />
                    </div>}
                    
                    {!renewal &&
                    <div className="col-span-3">
                        <Select
                            name="ctg"
                            id="ctg"
                            label="Category"
                            value={formData.ctg}
                            onChange={handleChange}
                            options={CTG}
                            disabled={!isEditing}
                            status={fieldStatuses.ctg}
                            onStatusChange={(newStatus) => handleStatusChange('ctg', newStatus)}
                        />
                    </div>}

                    <div className="col-span-3">
                        <Select
                            name="source"
                            id="source"
                            label="Source"
                            value={formData.source}
                            onChange={handleChange}
                            options={UNEARNED_INCOME_SOURCES}
                            disabled={!isEditing}
                            status={fieldStatuses.source}
                            onStatusChange={(newStatus) => handleStatusChange('source', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="number"
                            name="amount"
                            id="amount"
                            label="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.amount}
                            onStatusChange={(newStatus) => handleStatusChange('amount', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Select
                            name="period"
                            id="period"
                            label="Period"
                            value={formData.period}
                            onChange={handleChange}
                            options={PERIOD}
                            disabled={!isEditing}
                            status={fieldStatuses.period}
                            onStatusChange={(newStatus) => handleStatusChange('period', newStatus)}
                        />
                    </div>

                    {!renewal &&
                    <div className="col-span-3">
                        <Select
                            name="cd1"
                            id="cd1"
                            label="CD 1"
                            value={formData.cd1}
                            onChange={handleChange}
                            options={UNEARNED_INCOME_CD}
                            disabled={!isEditing}
                            status={fieldStatuses.cd1}
                            onStatusChange={(newStatus) => handleStatusChange('cd1', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-3">
                        <Input
                            type="text"
                            name="exempt1"
                            id="exempt1"
                            label="Exempt 1"
                            value={formData.exempt1}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.exempt1}
                            onStatusChange={(newStatus) => handleStatusChange('exempt1', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-3">
                        <Select
                            name="cd2"
                            id="cd2"
                            label="CD 2"
                            value={formData.cd2}
                            onChange={handleChange}
                            options={UNEARNED_INCOME_CD}
                            disabled={!isEditing}
                            status={fieldStatuses.cd2}
                            onStatusChange={(newStatus) => handleStatusChange('cd2', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-3">
                        <Input
                            type="text"
                            name="exempt2"
                            id="exempt2"
                            label="Exempt 2"
                            value={formData.exempt2}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.exempt2}
                            onStatusChange={(newStatus) => handleStatusChange('exempt2', newStatus)}
                        />
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

export default UnearnedIncome;