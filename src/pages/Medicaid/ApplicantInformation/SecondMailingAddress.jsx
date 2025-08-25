import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, CheckboxGroup, Checkbox, Select } from '../../../components/Form';
import { PHONE_TYPES } from '../../../constants/phone';

const SecondMailingAddress = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        sameAsHomeAddress: application?.mail2Same || false,
        associateName: application?.mailingAddress2?.associateName || '',
        inCareOf: application?.mailingAddress2?.inCareOf || '',
        phoneNumber: application?.mailingAddress2?.phoneNumber || '',
        phoneType: application?.mailingAddress2?.phoneType || '',
        accessRights: {
            applyRenew: application?.applyOrRenew || false,
            discuss: application?.discuss || false,
            getNotice: application?.getNotice || false,
        },
        apartment: application?.mailingAddress2?.apartment || '',
        streetName: application?.mailingAddress2?.street || '',
        city: application?.mailingAddress2?.city || '',
        state: application?.mailingAddress2?.state || '',
        zip: application?.mailingAddress2?.zip || '',
    });

    const status = application?.fieldStatus?.secondMailingAddress;
    const [fieldStatuses, setFieldStatuses] = useState({
        sameAsHomeAddress: status?.sameAsHomeAddress || 'empty',
        associateName: status?.associateName || 'empty',
        inCareOf: status?.inCareOf || 'empty',
        phoneNumber: status?.phoneNumber || 'empty',
        phoneType: status?.phoneType || 'empty',
        accessRights: status?.accessRights || 'empty',
        streetName: status?.streetName || 'empty',
        apartment: status?.apartment || 'empty',
        city: status?.city || 'empty',
        state: status?.state || 'empty',
        zip: status?.zip || 'empty',
    });

    const accessRightsOptions = [
        { value: 'applyRenew', label: 'Apply for and/or renew Medicaid for me' },
        { value: 'discuss', label: 'Discuss my Medicaid application or case, if needed' },
        { value: 'getNotice', label: 'Get notices and correspondence' }
    ];

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
            sameAsHomeAddress: application?.mail2Same || false,
            associateName: application?.mailingAddress2?.associateName || '',
            inCareOf: application?.mailingAddress2?.inCareOf || '',
            phoneNumber: application?.mailingAddress2?.phoneNumber || '',
            phoneType: application?.mailingAddress2?.phoneType || '',
            accessRights: {
                applyRenew: application?.applyOrRenew || false,
                discuss: application?.discuss || false,
                getNotice: application?.getNotice || false,
            },
            apartment: application?.mailingAddress2?.apartment || '',
            streetName: application?.mailingAddress2?.street || '',
            city: application?.mailingAddress2?.city || '',
            state: application?.mailingAddress2?.state || '',
            zip: application?.mailingAddress2?.zip || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            sameAsHomeAddress: status?.sameAsHomeAddress || 'empty',
            associateName: status?.associateName || 'empty',
            inCareOf: status?.inCareOf || 'empty',
            phoneNumber: status?.phoneNumber || 'empty',
            phoneType: status?.phoneType || 'empty',
            accessRights: status?.accessRights || 'empty',
            apartment:status?.apartment || 'empty',
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
                    mail2Same: formData.sameAsHomeAddress,
                    mailingAddress2: {
                        associateName: formData.associateName,
                        inCareOf: formData.inCareOf,
                        phoneNumber: formData.phoneNumber,
                        phoneType: formData.phoneType,
                        apartment: formData.apartment,
                        street: formData.streetName,
                        city: formData.city,
                        state: formData.state,
                        zip: formData.zip,
                    },
                    applyOrRenew: formData.accessRights.applyRenew,
                    discuss: formData.accessRights.discuss,
                    getNotice: formData.accessRights.getNotice,
                    fieldStatus: {
                        secondMailingAddress: fieldStatuses,
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
                mail2Same: response.data.data.mail2Same,
                mailingAddress2: response.data.data.mailingAddress2,
                applyOrRenew: response.data.data.applyOrRenew,
                discuss: response.data.data.discuss,
                getNotice: response.data.data.getNotice,
                fieldStatus: {
                    ...prev.fieldStatus,
                    secondMailingAddress: response.data.data.fieldStatus?.secondMailingAddress
                }
            }));
            setSuccess('Second mailing address updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update second mailing address');
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Second Mailing Address</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Another address where the applicant wants to receive the mail.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Checkbox
                            name="sameAsHomeAddress"
                            id="sameAsHomeAddress"
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
                                type="associateName"
                                name="associateName"
                                id="associateName"
                                label="Associate Name"
                                value={formData.associateName}
                                maxLength={28}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.associateName}
                                onStatusChange={(newStatus) => handleStatusChange('associateName', newStatus)}
                            />
                        </div>

                        <div className="col-span-4">
                            <Input
                                type="inCareOf"
                                name="inCareOf"
                                id="inCareOf"
                                label="In Care Of Name"
                                value={formData.inCareOf}
                                maxLength={28}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.inCareOf}
                                onStatusChange={(newStatus) => handleStatusChange('inCareOf', newStatus)}
                            />
                        </div>

                        <div className="col-span-4">
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

                        <div className="col-span-4">
                            <Select
                                type="phoneType"
                                name="phoneType"
                                id="phoneType"
                                label="Phone Type"
                                value={formData.phoneType}
                                options={PHONE_TYPES}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.phoneType}
                                onStatusChange={(newStatus) => handleStatusChange('phoneType', newStatus)}
                            />
                        </div>

                        <div className="col-span-12">
                            <CheckboxGroup
                                name="accessRights"
                                id="accessRights"
                                label="I want this contact person to:"
                                value={formData.accessRights}
                                onChange={handleChange}
                                options={accessRightsOptions}
                                disabled={!isEditing}
                                status={fieldStatuses.accessRights}
                                onStatusChange={(newStatus) => handleStatusChange('accessRights', newStatus)}
                            />
                        </div>

                        <div className="col-span-12">
                            <Input
                                type="apartment"
                                name="apartment"
                                id="apartment"
                                label="Apartment"
                                value={formData.apartment}
                                maxLength={35}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.apartment}
                                onStatusChange={(newStatus) => handleStatusChange('apartment', newStatus)}
                            />
                        </div>

                        <div className="col-span-12">
                            <Input
                                type="streetName"
                                name="streetName"
                                id="streetName"
                                label="Street Name"
                                value={formData.streetName}
                                maxLength={35}
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
                            <Input
                                type="state"
                                name="state"
                                id="state"
                                label="State"
                                value={formData.state}
                                maxLength={2}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.state}
                                onStatusChange={(newStatus) => handleStatusChange('state', newStatus)}
                            />
                        </div>

                        <div className="col-span-4">
                            <Input
                                type="zip"
                                name="zip"
                                id="zip"
                                label="Zip Code"
                                value={formData.zip}
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

export default SecondMailingAddress; 