import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Checkbox } from '../../../../components/Form';
import { CTG } from '../../../../constants/WMS_Codes/ctg';
import { EARNED_INCOME_SOURCES } from '../../../../constants/WMS_Codes/earnedIncomeSources';
import { PERIOD } from '../../../../constants/WMS_Codes/period';

const EarnedIncome = ({ income }) => {
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
        employerName: income?.employerName || '',
        eid: income?.eid || '',
        employmentStatus: income?.employmentStatus || '',
        amount: income?.amount || '',
        period: income?.period || '',
        insur: income?.insur || '',
        ctSup: income?.ctSup || '',
        wkRel: income?.wkRel || '',
        irwe: income?.irwe || '',
        noChange: income?.noChange || false,
    });

    const [fieldStatuses, setFieldStatuses] = useState({
        ctg: income?.fieldStatus?.ctg ||'default',
        source: income?.fieldStatus?.source ||'default',
        employerName: income?.fieldStatus?.employerName ||'default',
        eid: income?.fieldStatus?.eid ||'default',
        employmentStatus: income?.fieldStatus?.employmentStatus ||'default',
        amount: income?.fieldStatus?.amount ||'default',
        period: income?.fieldStatus?.period ||'default',
        insur: income?.fieldStatus?.insur ||'default',
        ctSup: income?.fieldStatus?.ctSup ||'default',
        wkRel: income?.fieldStatus?.wkRel ||'default',
        irwe: income?.fieldStatus?.irwe ||'default',
        noChange: income?.fieldStatus?.noChange || 'default',
    });

    // Update form data when income prop changes
    // useEffect(() => {
    //     if (income) {
    //         setFormData({
    //             ctg: income?.ctg || '',
    //             src: income?.src || '',
    //             employerName: income?.employerName || '',
    //             eid: income?.eid || '',
    //             employmentStatus: income?.employmentStatus || '',
    //             gross: income?.income?.amount || '',
    //             per: income?.income?.period || '',
    //             insur: income?.insur || '',
    //             ctSup: income?.ctSup || '',
    //             wkRel: income?.wkRel || '',
    //             irwe: income?.irwe || '',
    //         });
    //     }
    // }, [income]);

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
            employerName: income?.employerName || '',
            eid: income?.eid || '',
            employmentStatus: income?.employmentStatus || '',
            amount: income?.amount || '',
            period: income?.period || '',
            insur: income?.insur || '',
            ctSup: income?.ctSup || '',
            wkRel: income?.wkRel || '',
            irwe: income?.irwe || '',
            noChange: income?.noChange || false,
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(income?.fieldStatus);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this earned income?')) {
            setMember(prev => ({
                ...prev,
                income: {
                    ...prev.income,
                    earnedIncome: prev.income.earnedIncome.filter(item => item._id !== income._id)
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
            // Update the member state with the new earned income data
            const updatedEarnedIncome = {
                ...income,
                ...formData,
                fieldStatus: fieldStatuses,
            };
            // console.log("updatedEarnedIncome", updatedEarnedIncome);

            // Update the member's earned income array and get the updated member
            const updatedMember = {
                ...member,
                income: {
                    ...member.income,
                    earnedIncome: member.income.earnedIncome.map(item => 
                        item._id === income._id ? updatedEarnedIncome : item
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

            setSuccess('Earned income updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update earned income');
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

    const eidOptions = [
        { value: '1', label: '1' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
    ];
    
    const employmentStatusOptions = [
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Earned Income - {income?.employerName || `Income ${income?._id?.slice(-8) || 'New'}`}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The earned income information of the member.
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
                    {renewal &&
                    <div className="col-span-12">
                        <Checkbox
                            name="noChange"
                            id="noChange"
                            label="Check here if the earned income information has not changed"
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
                            options={EARNED_INCOME_SOURCES}
                            disabled={!isEditing}
                            status={fieldStatuses.source}
                            onStatusChange={(newStatus) => handleStatusChange('source', newStatus)}
                        />
                    </div>

                    <div className={renewal ? 'col-span-3' : 'col-span-6'}>
                        <Input
                            type="text"
                            name="employerName"
                            id="employerName"
                            label="Employer Name"
                            value={formData.employerName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.employerName}
                            onStatusChange={(newStatus) => handleStatusChange('employerName', newStatus)}
                        />
                    </div>

                    {!renewal &&
                    <div className="col-span-3">
                        <Select
                            name="eid"
                            id="eid"
                            label="Employer ID"
                            value={formData.eid}
                            onChange={handleChange}
                            options={eidOptions}
                            disabled={!isEditing}
                            status={fieldStatuses.eid}
                            onStatusChange={(newStatus) => handleStatusChange('eid', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-3">
                        <Select
                            name="employmentStatus"
                            id="employmentStatus"
                            label="Employment Status"
                            value={formData.employmentStatus}
                            onChange={handleChange}
                            options={employmentStatusOptions}
                            disabled={!isEditing}
                            status={fieldStatuses.employmentStatus}
                            onStatusChange={(newStatus) => handleStatusChange('employmentStatus', newStatus)}
                        />
                    </div>}

                    <div className="col-span-3">
                        <Input
                            type="number"
                            name="amount"
                            id="amount"
                            label="Gross"
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
                        <Input
                            type="text"
                            name="insur"
                            id="insur"
                            label="Insur"
                            value={formData.insur}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.insur}
                            onStatusChange={(newStatus) => handleStatusChange('insur', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-3">
                        <Input
                            type="text"
                            name="ctSup"
                            id="ctSup"
                            label="CT Sup"
                            value={formData.ctSup}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.ctSup}
                            onStatusChange={(newStatus) => handleStatusChange('ctSup', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-3">
                        <Input
                            type="text"
                            name="wkRel"
                            id="wkRel"
                            label="WK Rel"
                            value={formData.wkRel}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.wkRel}
                            onStatusChange={(newStatus) => handleStatusChange('wkRel', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-3">
                        <Input
                            type="text"
                            name="irwe"
                            id="irwe"
                            label="IRWE"
                            value={formData.irwe}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.irwe}
                            onStatusChange={(newStatus) => handleStatusChange('irwe', newStatus)}
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

export default EarnedIncome;