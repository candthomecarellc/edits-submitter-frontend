import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Checkbox } from '../../../components/Form';

const HomeAddress = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        homeless: application?.homeless || false,
        houseNumber: application?.residence?.house || '',
        phoneNumber: application?.residence?.phone || '',
        apartmentNumber: application?.residence?.apartment || '',
        streetName: application?.residence?.street || '',
        city: application?.residence?.city || '',
        state: application?.residence?.state || '',
        zipCode: application?.residence?.zip || '',
        county: application?.residence?.county || '',
    });

    const status = application?.fieldStatus?.homeAddress;
    const [fieldStatuses, setFieldStatuses] = useState({
        homeless: status?.homeless || 'empty',
        houseNumber: status?.houseNumber || 'empty',
        phoneNumber: status?.phoneNumber || 'empty',
        apartmentNumber: status?.apartmentNumber || 'empty',
        streetName: status?.streetName || 'empty',
        city: status?.city || 'empty',
        state: status?.state || 'empty',
        zip: status?.zip || 'empty',
        county: status?.county || 'empty',
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
            homeless: application?.homeless || false,
            houseNumber: application?.residence?.house || '',
            phoneNumber: application?.residence?.phone || '',
            apartmentNumber: application?.residence?.apartment || '',
            streetName: application?.residence?.street || '',
            city: application?.residence?.city || '',
            state: application?.residence?.state || '',
            zipCode: application?.residence?.zip || '',
            county: application?.residence?.county || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            homeless: status?.homeless || 'empty',
            houseNumber: status?.houseNumber || 'empty',
            phoneNumber: status?.phoneNumber || 'empty',
            apartmentNumber: status?.apartmentNumber || 'empty',
            streetName: status?.streetName || 'empty',
            city: status?.city || 'empty',
            state: status?.state || 'empty',
            zip: status?.zip || 'empty',
            county: status?.county || 'empty',
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
                    residence: {
                        house: formData.houseNumber,
                        phone: formData.phoneNumber,
                        apartment: formData.apartmentNumber,
                        street: formData.streetName,
                        city: formData.city,
                        state: formData.state,
                        zip: formData.zipCode,
                        county: formData.county,
                    },
                    homeless: formData.homeless,
                    fieldStatus: {
                        homeAddress: fieldStatuses,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setApplication(prev => ({
                ...prev,
                residence: response.data.data.residence,
                homeless: response.data.data.homeless,
            }));
            setFieldStatuses(response.data.data.fieldStatus.homeAddress);
            setSuccess('Applicant information updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update applicant information');
        } finally {
            setLoading(false);
        }
    };

    const handleHomelessChange = (e) => {
        setFormData(prev => ({
            ...prev,
            homeless: e.target.checked
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Home Address</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The address where the applicant lives.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Checkbox
                            name="homeless"
                            id="homeless"
                            label="Check here if the applicant is homeless"
                            checked={formData.homeless}
                            value={formData.homeless}
                            onChange={handleHomelessChange}
                            disabled={!isEditing}
                            status={fieldStatuses.homeless}
                            onStatusChange={(newStatus) => handleStatusChange('homeless', newStatus)}
                        />
                    </div>
                </div>

                {!formData.homeless && (
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-6">
                            <Input
                                type="houseNumber"
                                name="houseNumber"
                                id="houseNumber"
                                label="House Number"
                                value={formData.houseNumber}
                                required={true}
                                maxLength={9}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.houseNumber}
                                onStatusChange={(newStatus) => handleStatusChange('houseNumber', newStatus)}
                            />
                        </div>

                        <div className="col-span-6">
                            <Input
                                type="phoneNumber"
                                name="phoneNumber"
                                id="phoneNumber"
                                label="Phone Number"
                                value={formData.phoneNumber}
                                maxLength={10}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.phoneNumber}
                                onStatusChange={(newStatus) => handleStatusChange('phoneNumber', newStatus)}
                            />
                        </div>

                        <div className="col-span-3">
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

                        <div className="col-span-9">
                            <Input
                                type="streetName"
                                name="streetName"
                                id="streetName"
                                label="Street Name"
                                value={formData.streetName}
                                required={true}
                                maxLength={21}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.streetName}
                                onStatusChange={(newStatus) => handleStatusChange('streetName', newStatus)}
                            />
                        </div>

                        <div className="col-span-3">
                            <Input
                                type="city"
                                name="city"
                                id="city"
                                label="City"
                                value={formData.city}
                                onChange={handleChange}
                                required={true}
                                maxLength={15}
                                disabled={!isEditing}
                                status={fieldStatuses.city}
                                onStatusChange={(newStatus) => handleStatusChange('city', newStatus)}
                            />
                        </div>

                        <div className="col-span-3">
                            <Input
                                type="state"
                                name="state"
                                id="state"
                                label="State"
                                value={formData.state}
                                onChange={handleChange}
                                required={true}
                                maxLength={2}
                                disabled={!isEditing}
                                status={fieldStatuses.state}
                                onStatusChange={(newStatus) => handleStatusChange('state', newStatus)}
                            />
                        </div>

                        <div className="col-span-3">
                            <Input
                                type="zip"
                                name="zip"
                                id="zip"
                                label="Zip Code"
                                value={formData.zipCode}
                                onChange={handleChange}
                                required={true}
                                maxLength={9}
                                disabled={!isEditing}
                                status={fieldStatuses.zip}
                                onStatusChange={(newStatus) => handleStatusChange('zip', newStatus)}
                            />
                        </div>

                        <div className="col-span-3">
                            <Input
                                type="county"
                                name="county"
                                id="county"
                                label="County"
                                value={formData.county}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.county}
                                onStatusChange={(newStatus) => handleStatusChange('county', newStatus)}
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

export default HomeAddress; 