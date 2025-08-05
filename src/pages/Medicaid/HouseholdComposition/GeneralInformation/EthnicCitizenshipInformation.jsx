import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Radio, DatePicker } from '../../../../components/Form';
import { ETHNICITY_OPTIONS } from '../../../../constants/selectOptions';
import { ALIEN_INDICATOR } from '../../../../constants/WMS_Codes/alien';
import { FED_CHARGE_CD } from '../../../../constants/WMS_Codes/fedChargeCD';

const EthnicCitizenshipInformation = () => {
    const { member, setMember } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');

    const [formData, setFormData] = useState({
        ethnicity: {
            hispanic: member?.ethnicity?.hispanic || '',
            indian: member?.ethnicity?.indian || '',
            asian: member?.ethnicity?.asian || '',
            black: member?.ethnicity?.black || '',
            pacificIslander: member?.ethnicity?.pacificIslander || '',
            white: member?.ethnicity?.white || '',
        },
        aci: member?.aci || '',
        alienNumber: member?.alienNumber || '',
        alienDateOfEntry: member?.alienDateOfEntry || '',
        alienDateEnteredCountry: member?.alienDateEnteredCountry || '',
        fedChargeCd: member?.fedChargeCd || '',
        fedChargeDate: member?.fedChargeDate || '',
    });

    const status = member?.generalInformation?.ethnicCitizenshipInformation;
    const [fieldStatuses, setFieldStatuses] = useState({
        hispanic: status?.hispanic || 'empty',
        indian: status?.indian || 'empty',
        asian: status?.asian || 'empty',
        black: status?.black || 'empty',
        pacificIslander: status?.pacificIslander || 'empty',
        white: status?.white || 'empty',
        aci: status?.aci || 'empty',
        alienNumber: status?.alienNumber || 'empty',
        alienDateOfEntry: status?.alienDateOfEntry || 'empty',
        alienDateEnteredCountry: status?.alienDateEnteredCountry || 'empty',
        fedChargeCd: status?.fedChargeCd || 'empty',
        fedChargeDate: status?.fedChargeDate || 'empty',
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
            ethnicity: {
                hispanic: member?.ethnicity?.hispanic || '',
                indian: member?.ethnicity?.indian || '',
                asian: member?.ethnicity?.asian || '',
                black: member?.ethnicity?.black || '',
                pacificIslander: member?.ethnicity?.pacificIslander || '',
                white: member?.ethnicity?.white || '',
            },
            aci: member?.aci || '',
            alienNumber: member?.alienNumber || '',
            alienDateOfEntry: member?.alienDateOfEntry || '',
            alienDateEnteredCountry: member?.alienDateEnteredCountry || '',
            fedChargeCd: member?.fedChargeCd || '',
            fedChargeDate: member?.fedChargeDate || '',
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
        console.log(fieldStatuses);

        try {
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            const response = await axios.patch(
                `http://localhost:3000/api/v1/application/${applicationId}/household-member/${memberId}`,
                {
                    ...formData,
                    generalInformation: {
                        ethnicCitizenshipInformation: fieldStatuses,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Ethnic/Citizenship Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            The ethnic/citizenship information of the member.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-4">
                        <Radio
                            name="ethnicity.hispanic"
                            id="ethnicity.hispanic"
                            label="Hispanic/Latino"
                            value={formData.ethnicity.hispanic}
                            options={ETHNICITY_OPTIONS}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.hispanic}
                            onStatusChange={(newStatus) => handleStatusChange('hispanic', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-4">
                        <Radio
                            name="ethnicity.indian"
                            id="ethnicity.indian"
                            label="Native American/Alaskan Native"
                            value={formData.ethnicity.indian}
                            options={ETHNICITY_OPTIONS}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.indian}
                            onStatusChange={(newStatus) => handleStatusChange('indian', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-4">
                        <Radio
                            name="ethnicity.asian"
                            id="ethnicity.asian"
                            label="Asian"
                            value={formData.ethnicity.asian}
                            options={ETHNICITY_OPTIONS}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.asian}
                            onStatusChange={(newStatus) => handleStatusChange('asian', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-4">
                        <Radio
                            name="ethnicity.black"
                            id="ethnicity.black"
                            label="Black/African American"
                            value={formData.ethnicity.black}
                            options={ETHNICITY_OPTIONS}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.black}
                            onStatusChange={(newStatus) => handleStatusChange('black', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-4">
                        <Radio
                            name="ethnicity.pacificIslander"
                            id="ethnicity.pacificIslander"
                            label="Native Hawaiian/Pacific Islander"
                            value={formData.ethnicity.pacificIslander}
                            options={ETHNICITY_OPTIONS}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.pacificIslander}
                            onStatusChange={(newStatus) => handleStatusChange('pacificIslander', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-4">
                        <Radio
                            name="ethnicity.white"
                            id="ethnicity.white"
                            label="White"
                            value={formData.ethnicity.white}
                            options={ETHNICITY_OPTIONS}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.white}
                            onStatusChange={(newStatus) => handleStatusChange('white', newStatus)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 border border-gray-200 rounded-md p-4">
                    <div className="col-span-4">
                        <Select
                            name="aci"
                            id="aci"
                            label="Alien Citizenship Indicator"
                            value={formData.aci}
                            onChange={handleChange}
                            options={ALIEN_INDICATOR}
                            required
                            disabled={!isEditing}
                            status={fieldStatuses.aci}
                            onStatusChange={(newStatus) => handleStatusChange('aci', newStatus)}
                        />
                    </div>

                    <div className="col-span-4">
                        <Input
                            type="alienNumber"
                            name="alienNumber"
                            id="alienNumber"
                            label="Alien Registration Number"
                            value={formData.alienNumber}
                            onChange={handleChange}
                            maxLength={10}
                            disabled={!isEditing}
                            status={fieldStatuses.alienNumber}
                            onStatusChange={(newStatus) => handleStatusChange('alienNumber', newStatus)}
                        />
                    </div>

                    <div className="col-span-4">
                        <DatePicker
                            type="alienDateOfEntry"
                            name="alienDateOfEntry"
                            id="alienDateOfEntry"
                            label="Alien Date of Entry/Date of Status"
                            value={formData.alienDateOfEntry}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.alienDateOfEntry}
                            onStatusChange={(newStatus) => handleStatusChange('alienDateOfEntry', newStatus)}
                        />
                    </div>

                    <div className="col-span-4">
                        <DatePicker
                            type="alienDateEnteredCountry"
                            name="alienDateEnteredCountry"
                            id="alienDateEnteredCountry"
                            label="Alien Date Entered Country"
                            value={formData.alienDateEnteredCountry}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.alienDateEnteredCountry}
                            onStatusChange={(newStatus) => handleStatusChange('alienDateEnteredCountry', newStatus)}
                        />
                    </div>

                    <div className="col-span-4">
                        <Select
                            name="fedChargeCd"
                            id="fedChargeCd"
                            label="Federal Charge Code"
                            value={formData.fedChargeCd}
                            onChange={handleChange}
                            options={FED_CHARGE_CD}
                            disabled={!isEditing}
                            status={fieldStatuses.fedChargeCd}
                            onStatusChange={(newStatus) => handleStatusChange('fedChargeCd', newStatus)}
                        />
                    </div>

                    <div className="col-span-4">
                        <DatePicker
                            type="fedChargeDate"
                            name="fedChargeDate"
                            id="fedChargeDate"
                            label="Federal Charge Date"
                            value={formData.fedChargeDate}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.fedChargeDate}
                            onStatusChange={(newStatus) => handleStatusChange('fedChargeDate', newStatus)}
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

export default EthnicCitizenshipInformation; 