import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Radio } from '../../../components/Form';
import { SSI_DM, SSI_LA } from '../../../constants/ssi';

const HomeAddress = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);

    const ssi = application?.householdExpense?.ssi;
    const [formData, setFormData] = useState({
        ssiDm: ssi?.ssiDm || '',
        ssiLa: ssi?.ssiLa || '',
        ssiNoDm: ssi?.ssiNoDm || '',
        ssiNoAll: ssi?.ssiNoAll || '',
    });

    const status = application?.householdExpense?.fieldStatus?.otherExpenses;
    const [fieldStatuses, setFieldStatuses] = useState({
        ssiDm: status?.ssiDm || 'empty',
        ssiLa: status?.ssiLa || 'empty',
        ssiNoDm: status?.ssiNoDm || 'empty',
        ssiNoAll: status?.ssiNoAll || 'empty',
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
            ssiDm: ssi?.ssiDm || '',
            ssiLa: ssi?.ssiLa || '',
            ssiNoDm: ssi?.ssiNoDm || '',
            ssiNoAll: ssi?.ssiNoAll || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            ssiDm: status?.ssiDm || 'empty',
            ssiLa: status?.ssiLa || 'empty',
            ssiNoDm: status?.ssiNoDm || 'empty',
            ssiNoAll: status?.ssiNoAll || 'empty',
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
                        ssi: {
                            ssiDm: formData.ssiDm,
                            ssiLa: formData.ssiLa,
                            ssiNoDm: formData.ssiNoDm,
                            ssiNoAll: formData.ssiNoAll,
                        },
                        fieldStatus: {
                            otherExpenses: {
                                ...status,
                                ssiDm: fieldStatuses.ssiDm,
                                ssiLa: fieldStatuses.ssiLa,
                                ssiNoDm: fieldStatuses.ssiNoDm,
                                ssiNoAll: fieldStatuses.ssiNoAll,
                            }
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">SSI Related</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            SSI is a program that provides financial assistance to low-income individuals and families.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                        <Select
                            name="ssiDm"
                            id="ssiDm"
                            label="SSI DM"
                            value={formData.ssiDm}
                            onChange={handleChange}
                            options={SSI_DM}
                            disabled={!isEditing}
                            status={fieldStatuses.ssiDm}
                            onStatusChange={(newStatus) => handleStatusChange('ssiDm', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Radio
                            type="ssiLa"
                            name="ssiLa"
                            id="ssiLa"
                            label="SSI LA"
                            value={formData.ssiLa}
                            onChange={handleChange}
                            options={SSI_LA}
                            disabled={!isEditing}
                            status={fieldStatuses.ssiLa}
                            onStatusChange={(newStatus) => handleStatusChange('ssiLa', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="ssiNoDm"
                            name="ssiNoDm"
                            id="ssiNoDm"
                            label="SSI No-DM"
                            value={formData.ssiNoDm}
                            onChange={handleChange}
                            maxLength={1}
                            pattern="^[0-9]$"
                            patternError="SSI No-DM must be a number"
                            disabled={!isEditing}
                            status={fieldStatuses.ssiNoDm}
                            onStatusChange={(newStatus) => handleStatusChange('ssiNoDm', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="ssiNoAll"
                            name="ssiNoAll"
                            id="ssiNoAll"
                            label="SSI No-All"
                            value={formData.ssiNoAll}
                            onChange={handleChange}
                            maxLength={2}
                            pattern="^[0-9]*$"
                            patternError="SSI No-All must be a number"
                            disabled={!isEditing}
                            status={fieldStatuses.ssiNoAll}
                            onStatusChange={(newStatus) => handleStatusChange('ssiNoAll', newStatus)}
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

export default HomeAddress; 