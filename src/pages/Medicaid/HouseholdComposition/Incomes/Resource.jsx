import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Checkbox } from '../../../../components/Form';
import { RESOURCE_CD } from '../../../../constants/WMS_Codes/resourceCD';
import { UTXN2_FLAG } from '../../../../constants/utxn2flag';
import { PERIOD } from '../../../../constants/WMS_Codes/period';
import { CTG } from '../../../../constants/WMS_Codes/ctg';

const Resource = ({ resource }) => {
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
        ctg: resource?.ctg || '',
        value: resource?.value || '',
        period: resource?.period || '',
        cd: resource?.cd || '',
        utxn2Flag: resource?.utxn2Flag || '',
        noChange: resource?.noChange || '',
    });

    const [fieldStatuses, setFieldStatuses] = useState({
        ctg: resource?.fieldStatus?.ctg || 'default',
        value: resource?.fieldStatus?.value || 'default',
        period: resource?.fieldStatus?.period || 'default',
        cd: resource?.fieldStatus?.cd || 'default',
        utxn2Flag: resource?.fieldStatus?.utxn2Flag || 'default',
        noChange: resource?.fieldStatus?.noChange || 'default',
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
            ctg: resource?.ctg || '',
            value: resource?.value || '',
            period: resource?.period || '',
            cd: resource?.cd || '',
            utxn2Flag: resource?.utxn2Flag || '',
            noChange: resource?.noChange || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(resource?.fieldStatus);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            setMember(prev => ({
                ...prev,
                income: {
                    ...prev.income,
                    resource: prev.income.resource.filter(item => item._id !== resource._id)
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
            // Update the member state with the new resource data
            const updatedResource = {
                ...resource,
                ...formData,
                fieldStatus: fieldStatuses,
            };
            // console.log("updatedResource", updatedResource);

            // Update the member's resource array and get the updated member
            const updatedMember = {
                ...member,
                income: {
                    ...member.income,
                    resource: member.income.resource.map(item => 
                        item._id === resource._id ? updatedResource : item
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Resource Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The resource information of the member.
                        </p>
                    </div>
                    {isEditing && (
                        <div>
                            <Button
                                variant="danger"
                                onClick={handleDelete}
                            >
                                Delete Resource
                            </Button>
                        </div>
                    )}
                </div>

                <div className={`grid gap-6 border border-gray-200 rounded-md p-4 ${renewal ? 'grid-cols-4' : 'grid-cols-10'}`}>
                    { renewal &&
                    <div className={renewal ? 'col-span-4' : 'col-span-10'}>
                        <Checkbox
                            name="noChange"
                            id="noChange"
                            label="Check here if the resource information has not changed"
                            value={formData.noChange}
                            checked={formData.noChange}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.noChange}
                            onStatusChange={(newStatus) => handleStatusChange('noChange', newStatus)}
                        />
                    </div>}
                    
                    {!renewal &&
                    <div className="col-span-2">
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

                    <div className="col-span-2">
                        <Input
                            type="number"
                            name="value"
                            id="value"
                            label="Resource Value"
                            value={formData.value}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.value}
                            onStatusChange={(newStatus) => handleStatusChange('value', newStatus)}
                        />
                    </div>

                    {!renewal &&
                    <div className="col-span-2">
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
                    </div>}

                    <div className="col-span-2">
                        <Select
                            name="cd"
                            id="cd"
                            label="CD"
                            value={formData.cd}
                            onChange={handleChange}
                            options={RESOURCE_CD}
                            disabled={!isEditing}
                            status={fieldStatuses.cd}
                            onStatusChange={(newStatus) => handleStatusChange('cd', newStatus)}
                        />
                    </div>

                    {!renewal &&
                    <div className="col-span-2">
                        <Select
                            name="utxn2Flag"
                            id="utxn2Flag"
                            label="UTXN2 Flag"
                            value={formData.utxn2Flag}
                            onChange={handleChange}
                            options={UTXN2_FLAG}
                            disabled={!isEditing}
                            status={fieldStatuses.utxn2Flag}
                            onStatusChange={(newStatus) => handleStatusChange('utxn2Flag', newStatus)}
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

export default Resource;