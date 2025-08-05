import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Checkbox, DatePicker } from '../../../../components/Form';

const LivingOutside = () => {
    const { member, setMember } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');
    
    const [formData, setFormData] = useState({
        parentDeceased: member?.parentDeceased || '',
        parentLivingOutside: member?.parentLivingOutside || '',
        parentPrivacy: member?.parentPrivacy || '',
        parentOutside: {
            name: member?.parentOutside?.name || '',
            dob: member?.parentOutside?.dob || '',
            street: member?.parentOutside?.street || '',
            city: member?.parentOutside?.city || '',
            ssn: member?.parentOutside?.ssn || '',
        },
        spouseDeceased: member?.spouseDeceased || '',
        spouseLivingOutside: member?.spouseLivingOutside || '',
        spousePrivacy: member?.spousePrivacy || '',
        spouseOutside: {
            name: member?.spouseOutside?.name || '',
            dob: member?.spouseOutside?.dob || '',
            street: member?.spouseOutside?.street || '',
            city: member?.spouseOutside?.city || '',
            ssn: member?.spouseOutside?.ssn || '',
        }
    });

    const status = member?.insuranceInformation?.deceasedOrLivingOutside;
    const [fieldStatuses, setFieldStatuses] = useState({
        parentDeceased: status?.parentDeceased || '',
        parentLivingOutside: status?.parentLivingOutside || '',
        parentPrivacy: status?.parentPrivacy || '',
        parentName: status?.parentName || '',
        parentDob: status?.parentDob || '',
        parentStreet: status?.parentStreet || '',
        parentCity: status?.parentCity || '',
        parentSsn: status?.parentSsn || '',
        spouseDeceased: status?.spouseDeceased || '',
        spouseLivingOutside: status?.spouseLivingOutside || '',
        spousePrivacy: status?.spousePrivacy || '',
        spouseName: status?.spouseName || '',
        spouseDob: status?.spouseDob || '',
        spouseStreet: status?.spouseStreet || '',
        spouseCity: status?.spouseCity || '',
        spouseSsn: status?.spouseSsn || '',
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
            parentDeceased: member?.parentDeceased || '',
            parentLivingOutside: member?.parentLivingOutside || '',
            parentPrivacy: member?.parentPrivacy || '',
            parentOutside: {
                name: member?.parentOutside?.name || '',
                dob: member?.parentOutside?.dob || '',
                street: member?.parentOutside?.street || '',
                city: member?.parentOutside?.city || '',
                ssn: member?.parentOutside?.ssn || '',
            },
            spouseDeceased: member?.spouseDeceased || '',
            spouseLivingOutside: member?.spouseLivingOutside || '',
            spousePrivacy: member?.spousePrivacy || '',
            spouseOutside: {
                name: member?.spouseOutside?.name || '',
                dob: member?.spouseOutside?.dob || '',
                street: member?.spouseOutside?.street || '',
                city: member?.spouseOutside?.city || '',
                ssn: member?.spouseOutside?.ssn || '',
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
                    insuranceInformation: {
                        deceasedOrLivingOutside: fieldStatuses,
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Deceased or Living Outside</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            If the member's parent or spouse is deceased or living outside the household, please provide the information below.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-12">
                        <Checkbox
                            name="parentDeceased"
                            id="parentDeceased"
                            label="Is The Member's Parent Deceased?"
                            value={formData.parentDeceased}
                            checked={formData.parentDeceased}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.parentDeceased}
                            onStatusChange={(newStatus) => handleStatusChange('parentDeceased', newStatus)}
                        />
                    </div>

                    <div className="col-span-12">
                        <Checkbox
                            name="parentLivingOutside"
                            id="parentLivingOutside"
                            label="Is The Member's Parent Living Outside The Household?"
                            value={formData.parentLivingOutside}
                            checked={formData.parentLivingOutside}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.parentLivingOutside}
                            onStatusChange={(newStatus) => handleStatusChange('parentLivingOutside', newStatus)}
                        />
                    </div>

                    {formData.parentLivingOutside && (
                        <div className="col-span-12">
                            <Checkbox
                                name="parentPrivacy"
                                id="parentPrivacy"
                                label="Check If You Fear Physical Or Emotional Harm For Providing Information About The Parent."
                                value={formData.parentPrivacy}
                                checked={formData.parentPrivacy}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.parentPrivacy}
                                onStatusChange={(newStatus) => handleStatusChange('parentPrivacy', newStatus)}
                            />
                        </div>
                    )}

                    {formData.parentLivingOutside && !formData.parentPrivacy && (
                        <div className="col-span-3">
                            <Input
                                type="text"
                                name="parentOutside.name"
                                id="parentOutside.name"
                                label="Name"
                                value={formData.parentOutside.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.parentName}
                                onStatusChange={(newStatus) => handleStatusChange('parentName', newStatus)}
                            />
                        </div>
                    )}

                    {formData.parentLivingOutside && !formData.parentPrivacy && (
                        <div className="col-span-2">
                            <DatePicker
                                name="parentOutside.dob"
                                id="parentOutside.dob"
                                label="Date of Birth"
                                value={formData.parentOutside.dob}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.parentDob}
                                onStatusChange={(newStatus) => handleStatusChange('parentDob', newStatus)}
                            />
                        </div>
                    )}

                    {formData.parentLivingOutside && !formData.parentPrivacy && (
                        <div className="col-span-2">
                            <Input
                                type="text"
                                name="parentOutside.street"
                                id="parentOutside.street"
                                label="Street"
                                value={formData.parentOutside.street}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.parentStreet}
                                onStatusChange={(newStatus) => handleStatusChange('parentStreet', newStatus)}
                            />
                        </div>
                    )}

                    {formData.parentLivingOutside && !formData.parentPrivacy && (
                        <div className="col-span-2">
                            <Input
                                type="text"
                                name="parentOutside.city"
                                id="parentOutside.city"
                                label="City"
                                value={formData.parentOutside.city}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.parentCity}
                                onStatusChange={(newStatus) => handleStatusChange('parentCity', newStatus)}
                            />
                        </div>
                    )}

                    {formData.parentLivingOutside && !formData.parentPrivacy && (
                        <div className="col-span-3">
                            <Input
                                type="text"
                                name="parentOutside.ssn"
                                id="parentOutside.ssn"
                                label="SSN"
                                value={formData.parentOutside.ssn}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.parentSsn}
                                onStatusChange={(newStatus) => handleStatusChange('parentSsn', newStatus)}
                            />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-12">
                        <Checkbox
                            name="spouseDeceased"
                            id="spouseDeceased"
                            label="Is The Member's Spouse Deceased?"
                            value={formData.spouseDeceased}
                            checked={formData.spouseDeceased}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.spouseDeceased}
                            onStatusChange={(newStatus) => handleStatusChange('spouseDeceased', newStatus)}
                        />
                    </div>

                    <div className="col-span-12">
                        <Checkbox
                            name="spouseLivingOutside"
                            id="spouseLivingOutside"
                            label="Is The Member's Spouse Living Outside The Household?"
                            value={formData.spouseLivingOutside}
                            checked={formData.spouseLivingOutside}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.spouseLivingOutside}
                            onStatusChange={(newStatus) => handleStatusChange('spouseLivingOutside', newStatus)}
                        />
                    </div>

                    {formData.spouseLivingOutside && (
                        <div className="col-span-12">
                            <Checkbox
                                name="spousePrivacy"
                                id="spousePrivacy"
                                label="Check If You Fear Physical Or Emotional Harm For Providing Information About The Spouse."
                                value={formData.spousePrivacy}
                                checked={formData.spousePrivacy}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.spousePrivacy}
                                onStatusChange={(newStatus) => handleStatusChange('spousePrivacy', newStatus)}
                            />
                        </div>
                    )}

                    {formData.spouseLivingOutside && !formData.spousePrivacy && (
                        <div className="col-span-3">
                            <Input
                                type="text"
                                name="spouseOutside.name"
                                id="spouseOutside.name"
                                label="Name"
                                value={formData.spouseOutside.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.spouseName}
                                onStatusChange={(newStatus) => handleStatusChange('spouseName', newStatus)}
                            />
                        </div>
                    )}

                    {formData.spouseLivingOutside && !formData.spousePrivacy && (
                        <div className="col-span-2">
                            <DatePicker
                                name="spouseOutside.dob"
                                id="spouseOutside.dob"
                                label="Date of Birth"
                                value={formData.spouseOutside.dob}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.spouseDob}
                                onStatusChange={(newStatus) => handleStatusChange('spouseDob', newStatus)}
                            />
                        </div>
                    )}

                    {formData.spouseLivingOutside && !formData.spousePrivacy && (
                        <div className="col-span-2">
                            <Input
                                type="text"
                                name="spouseOutside.street"
                                id="spouseOutside.street"
                                label="Street"
                                value={formData.spouseOutside.street}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.spouseStreet}
                                onStatusChange={(newStatus) => handleStatusChange('spouseStreet', newStatus)}
                            />
                        </div>
                    )}

                    {formData.spouseLivingOutside && !formData.spousePrivacy && (
                        <div className="col-span-2">
                            <Input
                                type="text"
                                name="spouseOutside.city"
                                id="spouseOutside.city"
                                label="City"
                                value={formData.spouseOutside.city}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.spouseCity}
                                onStatusChange={(newStatus) => handleStatusChange('spouseCity', newStatus)}
                            />
                        </div>
                    )}

                    {formData.spouseLivingOutside && !formData.spousePrivacy && (
                        <div className="col-span-3">
                            <Input
                                type="text"
                                name="spouseOutside.ssn"
                                id="spouseOutside.ssn"
                                label="SSN"
                                value={formData.spouseOutside.ssn}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.spouseSsn}
                                onStatusChange={(newStatus) => handleStatusChange('spouseSsn', newStatus)}
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

export default LivingOutside; 