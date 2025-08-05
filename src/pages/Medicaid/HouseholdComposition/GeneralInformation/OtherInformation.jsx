import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select } from '../../../../components/Form';
import { TASA } from '../../../../constants/WMS_Codes/tasa';
import { EMPLOYABILITY } from '../../../../constants/WMS_Codes/employability';
import { CBIC_CC, CBIC_CDC } from '../../../../constants/WMS_Codes/cbic';
import { BCS } from '../../../../constants/WMS_Codes/bcs';
import { SSI_INDICATOR } from '../../../../constants/WMS_Codes/ssiIndicator';

const OtherInformation = () => {
    const { member, setMember } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const applicationId = localStorage.getItem('edits-submitter.currentApplicationId');
    const memberId = localStorage.getItem('edits-submitter.currentMemberId');
    
    const [formData, setFormData] = useState({
        ssn: member?.ssn || '',
        tasa: member?.tasa || '',
        emp: member?.emp || '',
        ssi: member?.ssi || '',
        bcs: member?.bcs || '',
        cbicCc: member?.cbicCc || '',
        cbicCdc: member?.cbicCdc || '',
        pid: member?.pid || '',
    });

    const status = member?.generalInformation?.otherInformation;
    const [fieldStatuses, setFieldStatuses] = useState({
        ssn: status?.ssn || 'empty',
        tasa: status?.tasa || 'empty',
        emp: status?.emp || 'empty',
        ssi: status?.ssi || 'empty',
        bcs: status?.bcs || 'empty',
        cbicCc: status?.cbicCc || 'empty',
        cbicCdc: status?.cbicCdc || 'empty',
        pid: status?.pid || 'empty',
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
            ssn: member?.ssn || '',
            tasa: member?.tasa || '',
            emp: member?.emp || '',
            ssi: member?.ssi || '',
            bcs: member?.bcs || '',
            cbicCc: member?.cbicCc || '',
            cbicCdc: member?.cbicCdc || '',
            pid: member?.pid || '',
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
                    generalInformation: {
                        otherInformation: fieldStatuses
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

    const pidOptions = [
        { value: '1', label: 'Yes' },
        { value: '2', label: 'No' },
    ];

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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Other Information</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Other information of the member.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-6">
                        <Input
                            type="text"
                            name="ssn"
                            id="ssn"
                            label="Social Security Number"
                            value={formData.ssn}
                            onChange={handleChange}
                            maxLength={9}
                            pattern="^[0-9]*$"
                            patternError="Please enter a valid Social Security Number"
                            disabled={!isEditing}
                            status={fieldStatuses.ssn}
                            onStatusChange={(newStatus) => handleStatusChange('ssn', newStatus)}
                        />
                    </div>

                    <div className="col-span-6">
                        <Select
                            name="tasa"
                            id="tasa"
                            label="Teen Age Service Act (TASA)"
                            value={formData.tasa}
                            options={TASA}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.tasa}
                            onStatusChange={(newStatus) => handleStatusChange('tasa', newStatus)}
                        />
                    </div>
                    
                    <div className="col-span-6">
                        <Select
                            name="emp"
                            id="emp"
                            label="Employability"
                            value={formData.emp}
                            options={EMPLOYABILITY}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.emp}
                            onStatusChange={(newStatus) => handleStatusChange('emp', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-6">
                        <Select
                            name="ssi"
                            id="ssi"
                            label="Supplemental Security Income (SSI)"
                            value={formData.ssi}
                            options={SSI_INDICATOR}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.ssi}
                            onStatusChange={(newStatus) => handleStatusChange('ssi', newStatus)}
                        />
                    </div>
                    
                    <div className="col-span-6">
                        <Select
                            name="bcs"
                            id="bcs"
                            label="Bureau of Child Support (BCS)"
                            value={formData.bcs}
                            options={BCS}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.bcs}
                            onStatusChange={(newStatus) => handleStatusChange('bcs', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-6">
                        <Select
                            name="cbicCc"
                            id="cbicCc"
                            label="Common Benefit Identification Card Code (CBIC CC)"
                            value={formData.cbicCc}
                            options={CBIC_CC}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.cbicCc}
                            onStatusChange={(newStatus) => handleStatusChange('cbicCc', newStatus)}
                        />
                    </div>
                        
                    <div className="col-span-6">
                        <Select
                            name="cbicCdc"
                            id="cbicCdc"
                            label="Common Benefit Identification Card Delivery Code (CBIC CDC)"
                            value={formData.cbicCdc}
                            options={CBIC_CDC}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.cbicCdc}
                            onStatusChange={(newStatus) => handleStatusChange('cbicCdc', newStatus)}
                        />
                    </div>

                    <div className="col-span-6">
                        <Select
                            name="pid"
                            id="pid"
                            label="Primary Insurance Designation"
                            value={formData.pid}
                            options={pidOptions}
                            onChange={handleChange}
                            disabled={!isEditing}
                            status={fieldStatuses.pid}
                            onStatusChange={(newStatus) => handleStatusChange('pid', newStatus)}
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