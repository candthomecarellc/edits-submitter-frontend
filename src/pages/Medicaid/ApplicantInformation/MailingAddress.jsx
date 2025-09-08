import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Checkbox, Select } from '../../../components/Form';
import { STATE_CODES } from '../../../constants/WMS_Codes/stateCodes'


const MailingAddress = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        sameAsHomeAddress: application?.mailSame || false,
        house: application?.mailingAddress?.house || '',
        apartmentNumber: application?.mailingAddress?.apartment || '',
        streetName: application?.mailingAddress?.street || '',
        city: application?.mailingAddress?.city || '',
        state: application?.mailingAddress?.state || '',
        zipCode: application?.mailingAddress?.zip || '',
    });

    const status = application?.fieldStatus?.mailingAddress;
    const [fieldStatuses, setFieldStatuses] = useState({
        sameAsHomeAddress: status?.sameAsHomeAddress || 'empty',
        house: status?.house || 'empty',
        apartmentNumber: status?.apartmentNumber || 'empty',
        streetName: status?.streetName || 'empty',
        city: status?.city || 'empty',
        state: status?.state || 'empty',
        zip: status?.zip || 'empty',
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
            sameAsHomeAddress: application?.mailSame === true ? true : false,
            house: application?.mailingAddress?.house || '',
            apartmentNumber: application?.mailingAddress?.apartment || '',
            streetName: application?.mailingAddress?.street || '',
            city: application?.mailingAddress?.city || '',
            state: application?.mailingAddress?.state || '',
            zipCode: application?.mailingAddress?.zip || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            sameAsHomeAddress: status?.sameAsHomeAddress || 'empty',
            house: status?.house || 'empty',
            apartmentNumber: status?.apartmentNumber || 'empty',
            streetName: status?.streetName || 'empty',
            city: status?.city || 'empty',
            state: status?.state || 'empty',
            zip: status?.zip || 'empty',
        }));
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
                    mailSame: formData.sameAsHomeAddress,
                    mailingAddress: {
                        house: formData.house,
                        apartment: formData.apartmentNumber,
                        street: formData.streetName,
                        city: formData.city,
                        state: formData.state,
                        zip: formData.zipCode,
                    },
                    fieldStatus: {
                        mailingAddress: fieldStatuses,
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
                mailingAddress: response.data.data.mailingAddress
            }));
            setSuccess('Mailing address updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update mailing address');
        } finally {
            setLoading(false);
        }
    };

    const handleSameAsHomeAddressChange = (e) => {
        setFormData(prev => ({
            ...prev,
            sameAsHomeAddress: e.target.checked
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Mailing Address</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The address where the applicant wants to receive the mail.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Checkbox
                            id="sameAsHomeAddress"
                            name="sameAsHomeAddress"
                            label="Same as Home Address"
                            checked={formData.sameAsHomeAddress}
                            value={formData.sameAsHomeAddress}
                            onChange={handleSameAsHomeAddressChange}
                            disabled={!isEditing}
                            status={fieldStatuses.sameAsHomeAddress}
                            onStatusChange={(newStatus) => handleStatusChange('sameAsHomeAddress', newStatus)}
                        />
                    </div>
                </div>
                
                {!formData.sameAsHomeAddress && (
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-4">
                            <Input
                                type="house"
                                name="house"
                                id="house"
                                label="House Number"
                                value={formData.house}
                                maxLength={9}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.house}
                                onStatusChange={(newStatus) => handleStatusChange('house', newStatus)}
                            />
                        </div>

                        <div className="col-span-4">
                            <Input
                                type="apartmentNumber"
                                name="apartmentNumber"
                                id="apartmentNumber"
                                label="Apartment Number"
                                value={formData.apartmentNumber}
                                maxLength={5}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.apartmentNumber}
                                onStatusChange={(newStatus) => handleStatusChange('apartmentNumber', newStatus)}
                            />
                        </div>

                        <div className="col-span-4">
                            <Input
                                type="streetName"
                                name="streetName"
                                id="streetName"
                                label="Street Name"
                                value={formData.streetName}
                                maxLength={30}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.streetName}
                                onStatusChange={(newStatus) => handleStatusChange('streetName', newStatus)}
                            />
                        </div>

                        <div className="col-span-4">
                            <Input
                                type="city"
                                name="city"
                                id="city"
                                label="City"
                                value={formData.city}
                                maxLength={15}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.city}
                                onStatusChange={(newStatus) => handleStatusChange('city', newStatus)}
                            />
                        </div>

                        <div className="col-span-4">
                            <Select
                                name="state"
                                id="state"
                                label="State"
                                value={formData.state}
                                options={STATE_CODES}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.state}
                                onStatusChange={(newStatus) => handleStatusChange('state', newStatus)}
                            />
                        </div>

                        <div className="col-span-4">
                            <Input
                                type="zipCode"
                                name="zipCode"
                                id="zipCode"
                                label="Zip Code"
                                value={formData.zipCode}
                                maxLength={9}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.zip}
                                onStatusChange={(newStatus) => handleStatusChange('zip', newStatus)}
                            />
                        </div>
                    </div>
                )}

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

export default MailingAddress; 