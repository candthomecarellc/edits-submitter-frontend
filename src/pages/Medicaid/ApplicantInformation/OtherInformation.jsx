import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Checkbox, DatePicker } from '../../../components/Form';
import { LANGUAGE_OPTIONS } from '../../../constants/WMS_Codes/language';

const OtherInformation = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        providerId: application?.providerId || '',
        patientId: application?.patientId || '',
        contactName: application?.contactName || '',
        contactPhone: application?.contactPhone || '',
        edc1: application?.edc1 ? application?.edc1.split('T')[0] : '',
        edc2: application?.edc2 ? application?.edc2.split('T')[0] : '',
        languageSpoken: application?.languageSpoken || '',
        languageRead: application?.languageRead || '',
        caseName: application?.caseName || '',
        caseComposition: application?.caseComposition || '',
        clientNoticeLanguage: application?.clientNoticeLanguage || '',
        familyPlanning: application?.familyPlanning || false,
    });

    const status = application?.fieldStatus?.otherInformation;
    const [fieldStatuses, setFieldStatuses] = useState({
        providerId: status?.providerId || 'empty',
        patientId: status?.patientId || 'empty',
        contactName: status?.contactName || 'empty',
        contactPhone: status?.contactPhone || 'empty',
        edc1: status?.edc1 || 'empty',
        edc2: status?.edc2 || 'empty',
        languageSpoken: status?.languageSpoken || 'empty',
        languageRead: status?.languageRead || 'empty',
        caseName: status?.caseName || 'empty',
        caseComposition: status?.caseComposition || 'empty',
        clientNoticeLanguage: status?.clientNoticeLanguage || 'empty',
        familyPlanning: status?.familyPlanning || 'empty',
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
            providerId: application?.providerId || '',
            patientId: application?.patientId || '',
            contactName: application?.contactName || '',
            contactPhone: application?.contactPhone || '',
            edc1: application?.edc1 ? application?.edc1.split('T')[0] : '',
            edc2: application?.edc2 ? application?.edc2.split('T')[0] : '',
            languageSpoken: application?.languageSpoken || '',
            languageRead: application?.languageRead || '',
            caseName: application?.caseName || '',
            caseComposition: application?.caseComposition || '',
            clientNoticeLanguage: application?.clientNoticeLanguage || '',
            familyPlanning: application?.familyPlanning || false,
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            providerId: status?.providerId || 'empty',
            patientId: status?.patientId || 'empty',
            contactName: status?.contactName || 'empty',
            contactPhone: status?.contactPhone || 'empty',
            edc1: status?.edc1 || 'empty',
            edc2: status?.edc2 || 'empty',
            languageSpoken: status?.languageSpoken || 'empty',
            languageRead: status?.languageRead || 'empty',
            caseName: status?.caseName || 'empty',
            caseComposition: status?.caseComposition || 'empty',
            clientNoticeLanguage: status?.clientNoticeLanguage || 'empty',
            familyPlanning: status?.familyPlanning || 'empty',
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
                    providerId: formData.providerId,
                    patientId: formData.patientId,
                    contactName: formData.contactName,
                    contactPhone: formData.contactPhone,
                    edc1: formData.edc1,
                    edc2: formData.edc2,
                    languageSpoken: formData.languageSpoken,
                    languageRead: formData.languageRead,
                    caseName: formData.caseName,
                    caseComposition: formData.caseComposition,
                    clientNoticeLanguage: formData.clientNoticeLanguage,
                    familyPlanning: formData.familyPlanning,
                    fieldStatus: {
                        otherInformation: fieldStatuses,
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
                providerId: response.data.data.providerId,
                patientId: response.data.data.patientId,
                contactName: response.data.data.contactName,
                contactPhone: response.data.data.contactPhone,
                edc1: response.data.data.edc1 ? response.data.data.edc1.split('T')[0] : '',
                edc2: response.data.data.edc2 ? response.data.data.edc2.split('T')[0] : '',
                languageSpoken: response.data.data.languageSpoken,
                languageRead: response.data.data.languageRead,
                caseName: response.data.data.caseName,
                caseComposition: response.data.data.caseComposition,
                clientNoticeLanguage: response.data.data.clientNoticeLanguage,
                familyPlanning: response.data.data.familyPlanning,
            }));
            setSuccess('Applicant information updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update applicant information');
        } finally {
            setLoading(false);
        }
    };

    const handleFamilyPlanningChange = (e) => {
        setFormData(prev => ({
            ...prev,
            familyPlanning: e.target.checked
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
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Other Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Other information about the applicant.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <Input
                                    type="text"
                                    name="providerId"
                                    id="providerId"
                                    label="Provider ID"
                                    value={formData.providerId}
                                    onChange={handleChange}
                                    maxLength={8}
                                    required
                                    pattern="^[0-9]*$"
                                    patternError="Provider ID must be a number"
                                    disabled={!isEditing}
                                    status={fieldStatuses.providerId}
                                    onStatusChange={(newStatus) => handleStatusChange('providerId', newStatus)}
                                />
                            </div>

                            <div className="col-span-2">
                                <Input
                                    type="text"
                                    name="patientId"
                                    id="patientId"
                                    label="Patient ID"
                                    value={formData.patientId}
                                    onChange={handleChange}
                                    maxLength={10}
                                    required
                                    disabled={!isEditing}
                                    status={fieldStatuses.patientId}
                                    onStatusChange={(newStatus) => handleStatusChange('patientId', newStatus)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <Input
                                    type="contactName"
                                    name="contactName"
                                    id="contactName"
                                    label="Contact Name"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    maxLength={28}
                                    pattern="^[a-zA-Z\\s]*$"
                                    patternError="Contact Name must be a valid name"
                                    disabled={!isEditing}
                                    status={fieldStatuses.contactName}
                                    onStatusChange={(newStatus) => handleStatusChange('contactName', newStatus)}
                                />
                            </div>

                            <div className="col-span-2">
                                <Input
                                    type="contactPhone"
                                    name="contactPhone"
                                    id="contactPhone"
                                    label="Contact Phone Number"
                                    value={formData.contactPhone}
                                    onChange={handleChange}
                                    maxLength={10}
                                    pattern="^[0-9]*$"
                                    patternError="Contact Phone Number must be a number"
                                    disabled={!isEditing}
                                    status={fieldStatuses.contactPhone}
                                    onStatusChange={(newStatus) => handleStatusChange('contactPhone', newStatus)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <DatePicker
                                    name="edc1"
                                    id="edc1"
                                    label="EDC1"
                                    value={formData.edc1}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status = {fieldStatuses.edc1}
                                    onStatusChange={(newStatus) => handleStatusChange('edc1', newStatus)}
                                />
                            </div>

                            <div className="col-span-2">
                                <DatePicker
                                    name="edc2"
                                    id="edc2"
                                    label="EDC2"
                                    value={formData.edc2}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    status = {fieldStatuses.edc2}
                                    onStatusChange={(newStatus) => handleStatusChange('edc2', newStatus)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <Select
                                    name="languageSpoken"
                                    id="languageSpoken"
                                    label="Language Spoken"
                                    value={formData.languageSpoken}
                                    onChange={handleChange}
                                    options={LANGUAGE_OPTIONS}
                                    required
                                    disabled={!isEditing}
                                    status={fieldStatuses.languageSpoken}
                                    onStatusChange={(newStatus) => handleStatusChange('languageSpoken', newStatus)}
                                />
                            </div>

                            <div className="col-span-2">
                                <Select
                                    name="languageRead"
                                    id="languageRead"
                                    label="Language Read"
                                    value={formData.languageRead}
                                    onChange={handleChange}
                                    options={LANGUAGE_OPTIONS}
                                    required
                                    disabled={!isEditing}
                                    status={fieldStatuses.languageRead}
                                    onStatusChange={(newStatus) => handleStatusChange('languageRead', newStatus)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="text"
                            name="caseName"
                            id="caseName"
                            label="Case Name"
                            value={formData.caseName}
                            onChange={handleChange}
                            maxLength={28}
                            pattern="^[a-zA-Z\s\.]*$"
                            patternError="Case Name must be a valid name"
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.caseName}
                            onStatusChange={(newStatus) => handleStatusChange('caseName', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Input
                            type="caseComposition"
                            name="caseComposition"
                            id="caseComposition"
                            label="Case Composition"
                            value={formData.caseComposition}
                            onChange={handleChange}
                            maxLength={2}
                            pattern="^[0-9]*$"
                            patternError="Case Composition must be a number"
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.caseComposition}
                            onStatusChange={(newStatus) => handleStatusChange('caseComposition', newStatus)}
                        />
                    </div>

                    <div className="col-span-3">
                        <Select
                            name="clientNoticeLanguage"
                            id="clientNoticeLanguage"
                            label="Client Notice Language"
                            value={formData.clientNoticeLanguage}
                            options={[{value: 'english', label: 'English'}, {value: 'spanish', label: 'Spanish'}]}
                            onChange={handleChange}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.clientNoticeLanguage}
                            onStatusChange={(newStatus) => handleStatusChange('clientNoticeLanguage', newStatus)}
                        />
                    </div>

                    <div className="col-span-12 flex items-end gap-2">
                        <Checkbox
                            name="familyPlanning"
                            id="familyPlanning"
                            label="If I am not eligible for Medicaid coverage, I want Family Planning Services only"
                            checked={formData.familyPlanning}
                            value={formData.familyPlanning}
                            onChange={handleFamilyPlanningChange}
                            disabled={!isEditing}
                            status={fieldStatuses.familyPlanning}
                            onStatusChange={(newStatus) => handleStatusChange('familyPlanning', newStatus)}
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

export default OtherInformation; 