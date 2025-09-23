import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Checkbox, DatePicker } from '../../../../components/Form';

const HealthInsurance = () => {
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
        healthInsurance: {
            medicaidCardId: member?.healthInsurance?.medicaidCardId || '',
            familyHealthPlusCardId: member?.healthInsurance?.familyHealthPlusCardId || '',
            personsCovered: member?.healthInsurance?.personsCovered || '',
            costOfPolicy: member?.healthInsurance?.costOfPolicy || '',
            endDateOfCoverage: member?.healthInsurance?.endDateOfCoverage || '',
            medicareAmount: member?.healthInsurance?.medicareAmount || '',
            medicareNoChange: member?.healthInsurance?.medicareNoChange || '',
        },
        medicaid: member?.medicaid || '',
        familyHealthPlus: member?.familyHealthPlus || '',
        commercialInsurance: member?.commercialInsurance || '',
        medicare: member?.medicare || '',
        medicalAssistance: member?.medicalAssistance || '',
        jobHealthInsurance: member?.jobHealthInsurance || '',
    });

    const status = member?.insuranceInformation?.healthInsurance;
    const [fieldStatuses, setFieldStatuses] = useState({
        medicaid: status?.medicaid || 'default',
        medicaidCardId: status?.medicaidCardId || 'default',
        familyHealthPlus: status?.familyHealthPlus || 'default',
        familyHealthPlusCardId: status?.familyHealthPlusCardId || 'default',
        commercialInsurance: status?.commercialInsurance || 'default',
        personsCovered: status?.personsCovered || 'default',
        costOfPolicy: status?.costOfPolicy || 'default',
        endDateOfCoverage: status?.endDateOfCoverage || 'default',
        medicareAmount: status?.medicareAmount || 'default',
        medicareNoChange: status?.medicareNoChange || 'default',
        medicare: status?.medicare || 'default',
        medicalAssistance: status?.medicalAssistance || 'default',
        jobHealthInsurance: status?.jobHealthInsurance || 'default',
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
        const { name, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: checked
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: checked
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
            healthInsurance: {
                medicaidCardId: member?.healthInsurance?.medicaidCardId || '',
                familyHealthPlusCardId: member?.healthInsurance?.familyHealthPlusCardId || '',
                personsCovered: member?.healthInsurance?.personsCovered || '',
                costOfPolicy: member?.healthInsurance?.costOfPolicy || '',
                endDateOfCoverage: member?.healthInsurance?.endDateOfCoverage || '',
                medicareAmount: member?.healthInsurance?.medicareAmount || '',
                medicareNoChange: member?.healthInsurance?.medicareNoChange || '',
            },
            medicaid: member?.medicaid || '',
            familyHealthPlus: member?.familyHealthPlus || '',
            commercialInsurance: member?.commercialInsurance || '',
            medicare: member?.medicare || '',
            medicalAssistance: member?.medicalAssistance || '',
            jobHealthInsurance: member?.jobHealthInsurance || '',
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
                        healthInsurance: fieldStatuses,
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Health Insurance</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the member's health insurance information
                        </p>
                    </div>
                </div>

                {!renewal &&
                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-6">
                        <div className="">
                            <Checkbox
                                name="medicaid"
                                id="medicaid"
                                label="Check If The Member Has Or Had Medicaid."
                                value={formData.medicaid}
                                checked={formData.medicaid}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.medicaid}
                                onStatusChange={(newStatus) => handleStatusChange('medicaid', newStatus)}
                            />
                        </div>

                        {formData.medicaid && (
                            <div className="pt-6">
                                <Input
                                    type="text"
                                    name="healthInsurance.medicaidCardId"
                                    id="healthInsurance.medicaidCardId"
                                    label="Benefit Card/Plan Card ID Number"
                                    value={formData.healthInsurance.medicaidCardId}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.medicaidCardId}
                                    onStatusChange={(newStatus) => handleStatusChange('medicaidCardId', newStatus)}
                                />
                            </div>
                        )}
                    </div>

                    <div className="col-span-6">
                        <div className="">
                            <Checkbox
                                name="familyHealthPlus"
                                id="familyHealthPlus"
                                label="Check If The Member Has Or Had Family Health Plus."
                                value={formData.familyHealthPlus}
                                checked={formData.familyHealthPlus}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.familyHealthPlus}
                                onStatusChange={(newStatus) => handleStatusChange('familyHealthPlus', newStatus)}
                            />
                        </div>

                        {formData.familyHealthPlus && (
                            <div className="pt-6">
                                <Input
                                    type="text"
                                    name="healthInsurance.familyHealthPlusCardId"
                                    id="healthInsurance.familyHealthPlusCardId"
                                    label="Benefit Card/Plan Card ID Number"
                                    value={formData.healthInsurance.familyHealthPlusCardId}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status={fieldStatuses.familyHealthPlusCardId}
                                    onStatusChange={(newStatus) => handleStatusChange('familyHealthPlusCardId', newStatus)}
                                />
                            </div>
                        )}
                    </div>
                </div>}

                {!renewal &&
                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-12">
                        <Checkbox
                            name="commercialInsurance"
                            id="commercialInsurance"
                            label="Does The Member Have Commercial Health Insurance?"
                            value={formData.commercialInsurance}
                            checked={formData.commercialInsurance}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.commercialInsurance}
                            onStatusChange={(newStatus) => handleStatusChange('commercialInsurance', newStatus)}
                        />
                    </div>

                    {formData.commercialInsurance && (
                        <div className="col-span-4">
                            <Input
                                type="number"
                                name="healthInsurance.personsCovered"
                                id="healthInsurance.personsCovered"
                                label="Number of Persons Covered"
                                value={formData.healthInsurance.personsCovered}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.personsCovered}
                                onStatusChange={(newStatus) => handleStatusChange('personsCovered', newStatus)}
                            />
                        </div>
                    )}

                    {formData.commercialInsurance && (
                        <div className="col-span-4">
                            <Input
                                type="number"
                                name="healthInsurance.costOfPolicy"
                                id="healthInsurance.costOfPolicy"
                                label="Cost of Policy"
                                value={formData.healthInsurance.costOfPolicy}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.costOfPolicy}
                                onStatusChange={(newStatus) => handleStatusChange('costOfPolicy', newStatus)}
                            />
                        </div>
                    )}

                    {formData.commercialInsurance && (
                        <div className="col-span-4">
                            <DatePicker
                                name="healthInsurance.endDateOfCoverage"
                                id="healthInsurance.endDateOfCoverage"
                                label="End Date of Coverage"
                                value={formData.healthInsurance.endDateOfCoverage}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.endDateOfCoverage}
                                onStatusChange={(newStatus) => handleStatusChange('endDateOfCoverage', newStatus)}
                            />
                        </div>
                    )}
                </div>}

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-12">
                        <Checkbox
                            name="medicare"
                            id="medicare"
                            label="Does The Member Have Medicare?"
                            value={formData.medicare}
                            checked={formData.medicare}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.medicare}
                            onStatusChange={(newStatus) => handleStatusChange('medicare', newStatus)}
                        />
                    </div>

                    { application.submissionType === 'renewal' &&
                        <div className="col-span-12">
                            <Checkbox
                                name="healthInsurance.medicareNoChange"
                                id="healthInsurance.medicareNoChange"
                                label="Check here if the Medicare information has not changed"
                                value={formData.healthInsurance.medicareNoChange}
                                checked={formData.healthInsurance.medicareNoChange}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.medicareNoChange}
                                onStatusChange={(newStatus) => handleStatusChange('medicareNoChange', newStatus)}
                            />
                        </div>
                    }

                    { renewal && !formData.healthInsurance.medicareNoChange && formData.medicare &&
                        <div className="col-span-12">
                            <Input
                                type="healthInsurance.medicareAmount"
                                name="healthInsurance.medicareAmount"
                                id="healthInsurance.medicareAmount"
                                label="Medicare Premium Amount"
                                value={formData.healthInsurance.medicareAmount}
                                onChange={handleChange}
                                pattern="^[0-9]*$"
                                patternError="Please enter a valid number"
                                disabled={!isEditing}
                                status={fieldStatuses.medicareAmount}
                                onStatusChange={(newStatus) => handleStatusChange('medicareAmount', newStatus)}
                            />
                        </div>
                    }

                    {!renewal &&
                    <div className="col-span-12">
                        <Checkbox
                            name="medicalAssistance"
                            id="medicalAssistance"
                            label="Is The Member Applying For Medical Assistance?"
                            value={formData.medicalAssistance}
                            checked={formData.medicalAssistance}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.medicalAssistance}
                            onStatusChange={(newStatus) => handleStatusChange('medicalAssistance', newStatus)}
                        />
                    </div>}

                    {!renewal &&
                    <div className="col-span-12">
                        <Checkbox
                            name="jobHealthInsurance"
                            id="jobHealthInsurance"
                            label="Does The Member's Current Job Offer Health Insurance?"
                            value={formData.jobHealthInsurance}
                            checked={formData.jobHealthInsurance}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.jobHealthInsurance}
                            onStatusChange={(newStatus) => handleStatusChange('jobHealthInsurance', newStatus)}
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

export default HealthInsurance; 