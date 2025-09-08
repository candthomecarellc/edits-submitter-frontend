import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Checkbox, DatePicker } from '../../../components/Form';
import { RENEWAL_TYPES } from '../../../constants/WMS_Codes/renewalTypes';
import { LOCATION_CODES } from '../../../constants/WMS_Codes/locationCodes';
import { PERIOD } from '../../../constants/WMS_Codes/period';

const RenewalInformation = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        noOfAdults: application?.noOfAdults || '',
        noOfChildren: application?.noOfChildren || '',
        caseNumber: application?.caseNumber || '',
        renewalType: application?.renewalType || '',
        locationCode: application?.locationCode || '',
        noticeDate: application?.noticeDate?.toString().split('T')[0] || '',
        rviCode: application?.rviCode || '',
        property: {
            homeOwner: application?.property?.homeOwner || '',
            homeEquity: application?.property?.homeEquity || '',
            other: application?.property?.other || '',
            otherAddress: application?.property?.otherAddress || '',
            otherValue: application?.property?.otherValue || '',
            otherIncome: application?.property?.otherIncome || '',
            otherPeriod: application?.property?.otherPeriod || '',
        },
    });

    const status = application?.fieldStatus?.renewalInformation;
    const [fieldStatuses, setFieldStatuses] = useState({
        noOfAdults: status?.noOfAdults || 'empty',
        noOfChildren: status?.noOfChildren || 'empty',
        caseNumber: status?.caseNumber || 'empty',
        renewalType: status?.renewalType || 'empty',
        locationCode: status?.locationCode || 'empty',
        noticeDate: status?.noticeDate || 'empty',
        rviCode: status?.rviCode || 'empty',
        homeOwner: status?.homeOwner || 'empty',
        homeEquity: status?.homeEquity || 'empty',
        other: status?.other || 'empty',
        otherAddress: status?.otherAddress || 'empty',
        otherValue: status?.otherValue || 'empty',
        otherIncome: status?.otherIncome || 'empty',
        otherPeriod: status?.otherPeriod || 'empty',
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
            noOfAdults: application?.noOfAdults || '',
            noOfChildren: application?.noOfChildren || '',
            caseNumber: application?.caseNumber || '',
            renewalType: application?.renewalType || '',
            locationCode: application?.locationCode || '',
            noticeDate: application?.noticeDate?.toString().split('T')[0] || '',
            rviCode: application?.rviCode || '',
            property: {
                homeOwner: application?.property?.homeOwner || '',
                homeEquity: application?.property?.homeEquity || '',
                other: application?.property?.other || '',
                otherAddress: application?.property?.otherAddress || '',
                otherValue: application?.property?.otherValue || '',
                otherIncome: application?.property?.otherIncome || '',
                otherPeriod: application?.property?.otherPeriod || '',
            },
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            noOfAdults: status?.noOfAdults || 'empty',
            noOfChildren: status?.noOfChildren || 'empty',
            caseNumber: status?.caseNumber || 'empty',
            renewalType: status?.renewalType || 'empty',
            locationCode: status?.locationCode || 'empty',
            noticeDate: status?.noticeDate || 'empty',
            rviCode: status?.rviCode || 'empty',
            homeOwner: status?.homeOwner || 'empty',
            homeEquity: status?.homeEquity || 'empty',
            other: status?.other || 'empty',
            otherAddress: status?.otherAddress || 'empty',
            otherValue: status?.otherValue || 'empty',
            otherIncome: status?.otherIncome || 'empty',
            otherPeriod: status?.otherPeriod || 'empty',
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
                    noOfAdults: formData.noOfAdults || '',
                    noOfChildren: formData.noOfChildren || '',
                    caseNumber: formData.caseNumber || '',
                    renewalType: formData.renewalType || '',
                    locationCode: formData.locationCode || '',
                    noticeDate: formData.noticeDate || '',
                    rviCode: formData.rviCode || '',
                    property: {
                        homeOwner: formData.property.homeOwner || '',
                        homeEquity: formData.property.homeEquity || '',
                        other: formData.property.other || '',
                        otherAddress: formData.property.otherAddress || '',
                        otherValue: formData.property.otherValue || '',
                        otherIncome: formData.property.otherIncome || '',
                        otherPeriod: formData.property.otherPeriod || '',
                    },
                    fieldStatus: {
                        renewalInformation: fieldStatuses,
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
                noOfAdults: response.data.data.noOfAdults,
                noOfChildren: response.data.data.noOfChildren,
                caseNumber: response.data.data.caseNumber,
                renewalType: response.data.data.renewalType,
                locationCode: response.data.data.locationCode,
                noticeDate: response.data.data.noticeDate || '',
                rviCode: response.data.data.rviCode || '',
                property: {
                    homeOwner: response.data.data.property.homeOwner,
                    homeEquity: response.data.data.property.homeEquity,
                    other: response.data.data.property.other,
                    otherAddress: response.data.data.property.otherAddress,
                    otherValue: response.data.data.property.otherValue,
                    otherIncome: response.data.data.property.otherIncome,
                    otherPeriod: response.data.data.property.otherPeriod,
                },
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
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Renewal Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Enter if Submition Type Renewal.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                        <Input
                            type="text"
                            name="noOfAdults"
                            id="noOfAdults"
                            label="Number of Adults"
                            value={formData.noOfAdults}
                            onChange={handleChange}
                            maxLength={2}
                            required
                            pattern="^[0-9]*$"
                            patternError="Number of Adults must be a number"
                            disabled={!isEditing}
                            status={fieldStatuses.noOfAdults}
                            onStatusChange={(newStatus) => handleStatusChange('noOfAdults', newStatus)}
                        />
                    </div>
                    <div className="col-span-3">
                        <Input
                            type="text"
                            name="noOfChildren"
                            id="noOfChildren"
                            label="Number of Children"
                            value={formData.noOfChildren}
                            onChange={handleChange}
                            maxLength={2}
                            required
                            pattern="^[0-9]*$"
                            disabled={!isEditing}
                            status={fieldStatuses.noOfChildren}
                            onStatusChange={(newStatus) => handleStatusChange('noOfChildren', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="caseNumber"
                            name="caseNumber"
                            id="caseNumber"
                            label="Case Number"
                            value={formData.caseNumber}
                            onChange={handleChange}
                            maxLength={12}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.caseNumber}
                            onStatusChange={(newStatus) => handleStatusChange('caseNumber', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Select
                            name="renewalType"
                            id="renewalType"
                            label="Renewal Type"
                            options={RENEWAL_TYPES}
                            value={formData.renewalType}
                            onChange={handleChange}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.renewalType}
                            onStatusChange={(newStatus) => handleStatusChange('renewalType', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Select
                            name="locationCode"
                            id="locationCode"
                            label="Location Code"
                            options={LOCATION_CODES}
                            value={formData.locationCode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.locationCode}
                            onStatusChange={(newStatus) => handleStatusChange('locationCode', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <DatePicker
                            type="noticeDate"
                            name="noticeDate"
                            id="noticeDate"
                            label="Notice Date"
                            value={formData.noticeDate}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.noticeDate}
                            onStatusChange={(newStatus) => handleStatusChange('noticeDate', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="rviCode"
                            name="rviCode"
                            id="rviCode"
                            label="RVI Code"
                            value={formData.rviCode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.rviCode}
                            onStatusChange={(newStatus) => handleStatusChange('rviCode', newStatus)}
                        />
                    </div>

                    <div className="col-span-6">
                        <Checkbox
                            name="property.homeOwner"
                            id="property.homeOwner"
                            label="Do You Own or Co-Own Your Home?"
                            value={formData.property.homeOwner}
                            checked={formData.property.homeOwner}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.homeOwner}
                            onStatusChange={(newStatus) => handleStatusChange('homeOwner', newStatus)}
                        />
                    </div>

                    { formData.property.homeOwner &&
                        <div className="col-span-6">
                            <Checkbox
                                name="property.homeEquity"
                                id="property.homeEquity"
                                label="Is your home equity value more than $750,000?"
                                value={formData.property.homeEquity}
                                checked={formData.property.homeEquity}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.homeEquity}
                                onStatusChange={(newStatus) => handleStatusChange('homeEquity', newStatus)}
                            />
                        </div> 
                    }

                    <div className="col-span-12">
                        <Checkbox
                            name="property.other"
                            id="property.other"
                            label="Do You Own Real Estate/Real Property other than your primary residence?"
                            value={formData.property.other}
                            checked={formData.property.other}
                            onChange={handleCheckboxChange}
                            disabled={!isEditing}
                            status={fieldStatuses.other}
                            onStatusChange={(newStatus) => handleStatusChange('other', newStatus)}
                        />
                    </div>

                    { formData.property.other &&
                        <div className="col-span-3">
                            <Input
                                type="property.otherAddress"
                                name="property.otherAddress"
                                id="property.otherAddress"
                                label="Address of Property"
                                value={formData.property.otherAddress}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.otherAddress}
                                onStatusChange={(newStatus) => handleStatusChange('otherAddress', newStatus)}
                            />
                        </div>
                    }

                    { formData.property.other &&
                        <div className="col-span-3">
                            <Input
                                type="property.otherValue"
                                name="property.otherValue"
                                id="property.otherValue"
                                label="Value of Property"
                                value={formData.property.otherValue}
                                onChange={handleChange}
                                pattern="^[0-9]*$"
                                patternError="Please enter a valid number"
                                disabled={!isEditing}
                                status={fieldStatuses.otherValue}
                                onStatusChange={(newStatus) => handleStatusChange('otherValue', newStatus)}
                            />
                        </div>
                    }

                    { formData.property.other &&
                        <div className="col-span-3">
                            <Input
                                type="property.otherIncome"
                                name="property.otherIncome"
                                id="property.otherIncome"
                                label="Income from Property"
                                value={formData.property.otherIncome}
                                onChange={handleChange}
                                pattern="^[0-9]*$"
                                patternError="Please enter a valid number"
                                disabled={!isEditing}
                                status={fieldStatuses.otherIncome}
                                onStatusChange={(newStatus) => handleStatusChange('otherIncome', newStatus)}
                            />
                        </div>
                    }

                    { formData.property.other &&
                        <div className="col-span-3">
                            <Select
                                name="property.otherPeriod"
                                id="property.otherPeriod"
                                label="Period"
                                options={PERIOD}
                                value={formData.property.otherPeriod}
                                onChange={handleChange}
                                disabled={!isEditing}
                                status={fieldStatuses.otherPeriod}
                                onStatusChange={(newStatus) => handleStatusChange('otherPeriod', newStatus)}
                            />
                        </div>
                    }
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

export default RenewalInformation; 