import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, DatePicker, Select, Checkbox } from '../../../components/Form';
import { CHRONIC_CARE_CON } from '../../../constants/WMS_Codes/chronicCareCON';
import { PERIOD } from '../../../constants/WMS_Codes/period';

const HomeAddress = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const renewal = application.submissionType === 'renewal';

    const chronicCare = application?.householdExpense?.chronicCare;
    const [formData, setFormData] = useState({
        chronicCareDateIns: chronicCare.chronicCareDateIns ? chronicCare.chronicCareDateIns.split('T')[0] : '',
        chronicCarePia: chronicCare?.chronicCarePia || '',
        chronicCareCon: chronicCare?.chronicCareCon || '',
        chronicCareAmount: chronicCare?.chronicCareAmount || '',
        chronicCareLoc: chronicCare?.chronicCareLoc || '',
        chronicCarePeriod: chronicCare?.chronicCarePeriod || '',
        blindDisableChronicallyIll: application?.householdExpense?.blindDisableChronicallyIll || '',
    });

    const status = application?.householdExpense?.fieldStatus?.otherExpenses;
    const [fieldStatuses, setFieldStatuses] = useState({
        chronicCareDateIns: status?.chronicCareDateIns || 'empty',
        chronicCarePia: status?.chronicCarePia || 'empty',
        chronicCareCon: status?.chronicCareCon || 'empty',
        chronicCareAmount: status?.chronicCareAmount || 'empty',
        chronicCareLoc: status?.chronicCareLoc || 'empty',
        chronicCarePeriod: status?.chronicCarePeriod || 'empty',
        blindDisableChronicallyIll: application?.householdExpense?.fieldStatus?.housingExpense?.blindDisableChronicallyIll || 'empty',
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
            chronicCareDateIns: chronicCare.chronicCareDateIns ? chronicCare.chronicCareDateIns.split('T')[0] : '',
            chronicCarePia: chronicCare?.chronicCarePia || '',
            chronicCareCon: chronicCare?.chronicCareCon || '',
            chronicCareAmount: chronicCare?.chronicCareAmount || '',
            chronicCareLoc: chronicCare?.chronicCareLoc || '',
            chronicCarePeriod: chronicCare?.chronicCarePeriod || '',
            blindDisableChronicallyIll: application?.householdExpense?.blindDisableChronicallyIll || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            chronicCareDateIns: status?.chronicCareDateIns || 'empty',
            chronicCarePia: status?.chronicCarePia || 'empty',
            chronicCareCon: status?.chronicCareCon || 'empty',
            chronicCareAmount: status?.chronicCareAmount || 'empty',
            chronicCareLoc: status?.chronicCareLoc || 'empty',
            chronicCarePeriod: status?.chronicCarePeriod || 'empty',
            blindDisableChronicallyIll: application?.householdExpense?.fieldStatus?.housingExpense?.blindDisableChronicallyIll || 'empty',
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
                        blindDisableChronicallyIll: formData.blindDisableChronicallyIll,
                        chronicCare: {
                            chronicCareDateIns: formData.chronicCareDateIns,
                            chronicCarePia: formData.chronicCarePia,
                            chronicCareCon: formData.chronicCareCon,
                            chronicCareAmount: formData.chronicCareAmount,
                            chronicCareLoc: formData.chronicCareLoc,
                            chronicCarePeriod: formData.chronicCarePeriod,
                        },
                        fieldStatus: {
                            housingExpense: {
                                blindDisableChronicallyIll: fieldStatuses.blindDisableChronicallyIll,
                            },
                            otherExpenses: {
                                ...status,
                                chronicCareDateIns: fieldStatuses.chronicCareDateIns,
                                chronicCarePia: fieldStatuses.chronicCarePia,
                                chronicCareCon: fieldStatuses.chronicCareCon,
                                chronicCareAmount: fieldStatuses.chronicCareAmount,
                                chronicCareLoc: fieldStatuses.chronicCareLoc,
                                chronicCarePeriod: fieldStatuses.chronicCarePeriod,
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

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.checked
        }))
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Chronic Care</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The chronic care information for the applicant.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {!renewal &&
                    <div className="col-span-4">
                        <DatePicker
                            type="chronicCareDateIns"
                            name="chronicCareDateIns"
                            id="chronicCareDateIns"
                            label="Chronic Care Date Ins"
                            value={formData.chronicCareDateIns}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.chronicCareDateIns}
                            onStatusChange={(newStatus) => handleStatusChange('chronicCareDateIns', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-4">
                        <Input
                            type="chronicCarePia"
                            name="chronicCarePia"
                            id="chronicCarePia"
                            label="Chronic Care PIA"
                            value={formData.chronicCarePia}
                            onChange={handleChange}
                            maxLength={1}
                            pattern="^[a-zA-Z]$"
                            patternError="Please enter a single letter"
                            disabled={!isEditing}
                            status={fieldStatuses.chronicCarePia}
                            onStatusChange={(newStatus) => handleStatusChange('chronicCarePia', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-4">
                        <Select
                            type="chronicCareCon"
                            name="chronicCareCon"
                            id="chronicCareCon"
                            label="Chronic Care Con"
                            value={formData.chronicCareCon}
                            options={CHRONIC_CARE_CON}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.chronicCareCon}
                            onStatusChange={(newStatus) => handleStatusChange('chronicCareCon', newStatus)}
                        />
                    </div>}

                    {renewal &&
                    <div className="col-span-4 flex items-center">
                        <Checkbox
                            name="blindDisableChronicallyIll"
                            id="blindDisableChronicallyIll"
                            label="Are you or anyone who lives with you blind, disabled or chronically ill?"
                            checked={formData.blindDisableChronicallyIll}
                            value={formData.blindDisableChronicallyIll}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.blindDisableChronicallyIll}
                            onStatusChange={(newStatus) => handleStatusChange('blindDisableChronicallyIll', newStatus)}
                        />
                    </div>}

                    <div className="col-span-4">
                        <Input
                            type="chronicCareAmount"
                            name="chronicCareAmount"
                            id="chronicCareAmount"
                            label="Chronic Care Amount"
                            value={formData.chronicCareAmount}
                            onChange={handleChange}
                            maxLength={7}
                            pattern="^[1-9][0-9]*$"
                            patternError="Please enter a valid number"
                            disabled={!isEditing}
                            status={fieldStatuses.chronicCareAmount}
                            onStatusChange={(newStatus) => handleStatusChange('chronicCareAmount', newStatus)}
                        />
                    </div>

                    {!renewal &&
                    <div className="col-span-4">
                        <Input
                            type="chronicCareLoc"
                            name="chronicCareLoc"
                            id="chronicCareLoc"
                            label="Chronic Care Loc"
                            value={formData.chronicCareLoc}
                            onChange={handleChange}
                            maxLength={2}
                            pattern="^[1-9][0-9]*$"
                            patternError="Please enter a valid number"
                            disabled={!isEditing}
                            status={fieldStatuses.chronicCareLoc}
                            onStatusChange={(newStatus) => handleStatusChange('chronicCareLoc', newStatus)}
                        />
                    </div>}

                    {renewal &&
                    <div className="col-span-4">
                        <Select
                            type="chronicCarePeriod"
                            name="chronicCarePeriod"
                            id="chronicCarePeriod"
                            label="Chronic Care Period"
                            value={formData.chronicCarePeriod}
                            options={PERIOD}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.chronicCarePeriod}
                            onStatusChange={(newStatus) => handleStatusChange('chronicCarePeriod', newStatus)}
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

export default HomeAddress; 