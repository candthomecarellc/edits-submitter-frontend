import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select } from '../../../components/Form';
import { CHILD_CARE_PERIODS } from '../../../constants/selectOptions';

const ChildCare = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const renewal = application.submissionType === 'renewal';

    const [formData, setFormData] = useState({
        child1Name: application?.householdExpense?.childCare[0]?.name || '',
        child1Month: application?.householdExpense?.childCare[0]?.month || '',
        child1Year: application?.householdExpense?.childCare[0]?.year || '',
        child1Amount: application?.householdExpense?.childCare[0]?.amount || '',
        child1Period: application?.householdExpense?.childCare[0]?.period || '',
        child2Name: application?.householdExpense?.childCare[1]?.name || '',
        child2Month: application?.householdExpense?.childCare[1]?.month || '',
        child2Year: application?.householdExpense?.childCare[1]?.year || '',
        child2Amount: application?.householdExpense?.childCare[1]?.amount || '',
        child2Period: application?.householdExpense?.childCare[1]?.period || '',
        child3Name: application?.householdExpense?.childCare[2]?.name || '',
        child3Month: application?.householdExpense?.childCare[2]?.month || '',
        child3Year: application?.householdExpense?.childCare[2]?.year || '',
        child3Amount: application?.householdExpense?.childCare[2]?.amount || '',
        child3Period: application?.householdExpense?.childCare[2]?.period || '',
    });

    const status = application?.householdExpense?.fieldStatus?.childCare;
    const [fieldStatuses, setFieldStatuses] = useState({
        child1Name: status?.child1Name || 'empty',
        child1Month: status?.child1Month || 'empty',
        child1Year: status?.child1Year || 'empty',
        child1Amount: status?.child1Amount || 'empty',
        child1Period: status?.child1Period || 'empty',
        child2Name: status?.child2Name || 'empty',
        child2Month: status?.child2Month || 'empty',
        child2Year: status?.child2Year || 'empty',
        child2Amount: status?.child2Amount || 'empty',
        child2Period: status?.child2Period || 'empty',
        child3Name: status?.child3Name || 'empty',
        child3Month: status?.child3Month || 'empty',
        child3Year: status?.child3Year || 'empty',
        child3Amount: status?.child3Amount || 'empty',
        child3Period: status?.child3Period || 'empty',
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
            child1Name: application?.householdExpense?.childCare[0]?.name || '',
            child1Month: application?.householdExpense?.childCare[0]?.month || '',
            child1Year: application?.householdExpense?.childCare[0]?.year || '',
            child1Amount: application?.householdExpense?.childCare[0]?.amount || '',
            child1Period: application?.householdExpense?.childCare[0]?.period || '',
            child2Name: application?.householdExpense?.childCare[1]?.name || '',
            child2Month: application?.householdExpense?.childCare[1]?.month || '',
            child2Year: application?.householdExpense?.childCare[1]?.year || '',
            child2Amount: application?.householdExpense?.childCare[1]?.amount || '',
            child2Period: application?.householdExpense?.childCare[1]?.period || '',
            child3Name: application?.householdExpense?.childCare[2]?.name || '',
            child3Month: application?.householdExpense?.childCare[2]?.month || '',
            child3Year: application?.householdExpense?.childCare[2]?.year || '',
            child3Amount: application?.householdExpense?.childCare[2]?.amount || '',
            child3Period: application?.householdExpense?.childCare[2]?.period || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            child1Name: status?.child1Name || 'empty',
            child1Month: status?.child1Month || 'empty',
            child1Year: status?.child1Year || 'empty',
            child1Amount: status?.child1Amount || 'empty',
            child1Period: status?.child1Period || 'empty',
            child2Name: status?.child2Name || 'empty',
            child2Month: status?.child2Month || 'empty',
            child2Year: status?.child2Year || 'empty',
            child2Amount: status?.child2Amount || 'empty',
            child2Period: status?.child2Period || 'empty',
            child3Name: status?.child3Name || 'empty',
            child3Month: status?.child3Month || 'empty',
            child3Year: status?.child3Year || 'empty',
            child3Amount: status?.child3Amount || 'empty',
            child3Period: status?.child3Period || 'empty',
        }))
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
                    householdExpense: {
                        childCare: [
                            {
                                _id: application?.householdExpense?.childCare[0]?._id,
                                name: formData.child1Name,
                                month: formData.child1Month,
                                year: formData.child1Year,
                                amount: formData.child1Amount,
                                period: formData.child1Period,
                            },
                            {
                                _id: application?.householdExpense?.childCare[1]?._id,
                                name: formData.child2Name,
                                month: formData.child2Month,
                                year: formData.child2Year,
                                amount: formData.child2Amount,
                                period: formData.child2Period,
                            },
                            {
                                _id: application?.householdExpense?.childCare[2]?._id,
                                name: formData.child3Name,
                                month: formData.child3Month,
                                year: formData.child3Year,
                                amount: formData.child3Amount,
                                period: formData.child3Period,
                            }
                        ],
                        fieldStatus: {
                            childCare: fieldStatuses,
                        }
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setApplication(prev => ({
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

    const monthOptions = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Child Care</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Add child care information.
                        </p>
                    </div>
                </div>

                <div className={`grid gap-6 ${renewal ? 'grid-cols-6' : 'grid-cols-12'}`}>
                    {!renewal &&
                    <div className="col-span-4">
                        <Input
                            type="child1Name"
                            name="child1Name"
                            id="child1Name"
                            label="Name of Child"
                            value={formData.child1Name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            pattern="^[a-zA-Z\s]*$"
                            patternError="Please enter a valid name"
                            status={fieldStatuses.child1Name}
                            onStatusChange={(newStatus) => handleStatusChange('child1Name', newStatus)}
                        />
                    </div>}

                    <div className="col-span-2">
                        <Select
                            name="child1Month"
                            id="child1Month"
                            label="Month of Birth"
                            value={formData.child1Month}
                            options={monthOptions}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.child1Month}
                            onStatusChange={(newStatus) => handleStatusChange('child1Month', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            name="child1Year"
                            id="child1Year"
                            label="Year of Birth"
                            value={formData.child1Year}
                            onChange={handleChange}
                            maxLength={4}
                            pattern="^20[0-9]{2}$"
                            patternError="Please enter a 4 digit year between 2000 and current year"
                            disabled={!isEditing}
                            status={fieldStatuses.child1Year}
                            onStatusChange={(newStatus) => handleStatusChange('child1Year', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            type="child1Amount"
                            name="child1Amount"
                            id="child1Amount"
                            label="Child Care Amount"
                            value={formData.child1Amount}
                            onChange={handleChange}
                            maxLength={7}
                            pattern="^[0-9]*$"
                            patternError="Please enter a valid number"
                            disabled={!isEditing}
                            status={fieldStatuses.child1Amount}
                            onStatusChange={(newStatus) => handleStatusChange('child1Amount', newStatus)}
                        />
                    </div>

                    {!renewal &&
                    <div className="col-span-2">
                        <Select
                            name="child1Period"
                            id="child1Period"
                            label="Child Care Period"
                            value={formData.child1Period}
                            onChange={handleChange}
                            options={CHILD_CARE_PERIODS}
                            disabled={!isEditing}
                            status={fieldStatuses.child1Period}
                            onStatusChange={(newStatus) => handleStatusChange('child1Period', newStatus)}
                        />
                    </div>}
                </div>

                <div className={`grid gap-6 ${renewal ? 'grid-cols-6' : 'grid-cols-12'}`}>
                    {!renewal &&
                    <div className="col-span-4">
                        <Input
                            type="child2Name"
                            name="child2Name"
                            id="child2Name"
                            label="Name of Child"
                            value={formData.child2Name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            pattern="^[a-zA-Z\s]*$"
                            patternError="Please enter a valid name"
                            status={fieldStatuses.child2Name}
                            onStatusChange={(newStatus) => handleStatusChange('child2Name', newStatus)}
                        />
                    </div>}

                    <div className="col-span-2">
                        <Select
                            name="child2Month"
                            id="child2Month"
                            label="Month of Birth"
                            value={formData.child2Month}
                            options={monthOptions}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.child2Month}
                            onStatusChange={(newStatus) => handleStatusChange('child2Month', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            name="child2Year"
                            id="child2Year"
                            label="Year of Birth"
                            value={formData.child2Year}
                            onChange={handleChange}
                            maxLength={4}
                            pattern="^20[0-9]{2}$"
                            patternError="Please enter a 4 digit year between 2000 and current year"
                            disabled={!isEditing}
                            status={fieldStatuses.child2Year}
                            onStatusChange={(newStatus) => handleStatusChange('child2Year', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            type="child2Amount"
                            name="child2Amount"
                            id="child2Amount"
                            label="Child Care Amount"
                            value={formData.child2Amount}
                            onChange={handleChange}
                            maxLength={7}
                            pattern="^[0-9]*$"
                            patternError="Please enter a valid number"
                            disabled={!isEditing}
                            status={fieldStatuses.child2Amount}
                            onStatusChange={(newStatus) => handleStatusChange('child2Amount', newStatus)}
                        />
                    </div>

                    {!renewal &&
                    <div className="col-span-2">
                        <Select
                            name="child2Period"
                            id="child2Period"
                            label="Child Care Period"
                            value={formData.child2Period}
                            onChange={handleChange}
                            options={CHILD_CARE_PERIODS}
                            disabled={!isEditing}
                            status={fieldStatuses.child2Period}
                            onStatusChange={(newStatus) => handleStatusChange('child2Period', newStatus)}
                        />
                    </div>}
                </div>

                <div className={`grid gap-6 ${renewal ? 'grid-cols-6' : 'grid-cols-12'}`}>
                    {!renewal &&
                    <div className="col-span-4">
                        <Input
                            type="child3Name"
                            name="child3Name"
                            id="child3Name"
                            label="Name of Child"
                            value={formData.child3Name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            pattern="^[a-zA-Z\s]*$"
                            patternError="Please enter a valid name"
                            status={fieldStatuses.child3Name}
                            onStatusChange={(newStatus) => handleStatusChange('child3Name', newStatus)}
                        />
                    </div>}

                    <div className="col-span-2">
                        <Select
                            name="child3Month"
                            id="child3Month"
                            label="Month of Birth"
                            value={formData.child3Month}
                            options={monthOptions}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.child3Month}
                            onStatusChange={(newStatus) => handleStatusChange('child3Month', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            name="child3Year"
                            id="child3Year"
                            label="Year of Birth"
                            value={formData.child3Year}
                            onChange={handleChange}
                            maxLength={4}
                            pattern="^20[0-9]{2}$"
                            patternError="Please enter a 4 digit year between 2000 and current year"
                            disabled={!isEditing}
                            status={fieldStatuses.child3Year}
                            onStatusChange={(newStatus) => handleStatusChange('child3Year', newStatus)}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            type="child3Amount"
                            name="child3Amount"
                            id="child3Amount"
                            label="Child Care Amount"
                            value={formData.child3Amount}
                            onChange={handleChange}
                            maxLength={7}
                            pattern="^[0-9]*$"
                            patternError="Please enter a valid number"
                            disabled={!isEditing}
                            status={fieldStatuses.child3Amount}
                            onStatusChange={(newStatus) => handleStatusChange('child3Amount', newStatus)}
                        />
                    </div>

                    {!renewal &&
                    <div className="col-span-2">
                        <Select
                            name="child3Period"
                            id="child3Period"
                            label="Child Care Period"
                            value={formData.child3Period}
                            onChange={handleChange}
                            options={CHILD_CARE_PERIODS}
                            disabled={!isEditing}
                            status={fieldStatuses.child3Period}
                            onStatusChange={(newStatus) => handleStatusChange('child3Period', newStatus)}
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

export default ChildCare; 