import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Select, Checkbox } from '../../../components/Form';
import { SHELTER_TYPES } from '../../../constants/WMS_Codes/shelterTypes';
import { WATER_PERIODS } from '../../../constants/selectOptions';
import { ADDITIONAL_ALLOWANCE_TYPES } from '../../../constants/WMS_Codes/additionalAllowanceTypes';
import { BUDGET_TYPES } from '../../../constants/WMS_Codes/budgetTypes';
import { FUEL_TYPE } from '../../../constants/fuelType';
import { PERIOD } from '../../../constants/WMS_Codes/period';

const HomeAddress = () => {
    const { application, setApplication } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const renewal = application.submitionType === 'renewal';

    const [formData, setFormData] = useState({
        shelterType: application?.householdExpense?.shelterType || '',
        shelterAmount: application?.householdExpense?.shelterAmount || '',
        shelterPeriod: application?.householdExpense?.shelterPeriod || '',
        shelterNoChange: application?.householdExpense?.shelterNoChange || '',
        waterCostPeriod: application?.householdExpense?.waterCostPeriod || '',
        waterCostAmount: application?.householdExpense?.waterCostAmount || '',
        addType: application?.householdExpense?.addType || '',
        addAmount: application?.householdExpense?.addAmount || '',
        budgetType: application?.householdExpense?.budgetType || '',
        fuelType: application?.householdExpense?.fuelType || '',
        freeHousing: application?.householdExpense?.freeHousing || '',
        nursingHome: application?.householdExpense?.nursingHome || '',
        blindDisableChronicallyIll: application?.householdExpense?.blindDisableChronicallyIll || '',
    });

    const status = application?.householdExpense?.fieldStatus?.housingExpense;
    const [fieldStatuses, setFieldStatuses] = useState({
        shelterType: status?.shelterType || 'empty',
        shelterAmount: status?.shelterAmount || 'empty',
        shelterPeriod: status?.shelterPeriod || 'empty',
        shelterNoChange: status?.shelterNoChange || 'empty',
        waterCostPeriod: status?.waterCostPeriod || 'empty',
        waterCostAmount: status?.waterCostAmount || 'empty',
        addType: status?.addType || 'empty',
        addAmount: status?.addAmount || 'empty',
        budgetType: status?.budgetType || 'empty',
        fuelType: status?.fuelType || 'empty',
        freeHousing: status?.freeHousing || 'empty',
        nursingHome: status?.nursingHome || 'empty',
        blindDisableChronicallyIll: status?.blindDisableChronicallyIll || 'empty',
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
            shelterType: application?.householdExpense?.shelterType || '',
            shelterAmount: application?.householdExpense?.shelterAmount || '',
            shelterPeriod: application?.householdExpense?.shelterPeriod || '',
            shelterNoChange: application?.householdExpense?.shelterNoChange || '',
            waterCostPeriod: application?.householdExpense?.waterCostPeriod || '',
            waterCostAmount: application?.householdExpense?.waterCostAmount || '',
            addType: application?.householdExpense?.addType || '',
            addAmount: application?.householdExpense?.addAmount || '',
            budgetType: application?.householdExpense?.budgetType || '',
            fuelType: application?.householdExpense?.fuelType || '',
            freeHousing: application?.householdExpense?.freeHousing || '',
            nursingHome: application?.householdExpense?.nursingHome || '',
            blindDisableChronicallyIll: application?.householdExpense?.blindDisableChronicallyIll || '',
        }));
        setIsEditing(false);
        setError('');
        setFieldStatuses(prev => ({
            ...prev,
            shelterType: status?.shelterType || 'empty',
            shelterAmount: status?.shelterAmount || 'empty',
            shelterPeriod: status?.shelterPeriod || 'empty',
            shelterNoChange: status?.shelterNoChange || 'empty',
            waterCostPeriod: status?.waterCostPeriod || 'empty',
            waterCostAmount: status?.waterCostAmount || 'empty',
            addType: status?.addType || 'empty',
            addAmount: status?.addAmount || 'empty',
            budgetType: status?.budgetType || 'empty',
            fuelType: status?.fuelType || 'empty',
            freeHousing: status?.freeHousing || 'empty',
            nursingHome: status?.nursingHome || 'empty',
            blindDisableChronicallyIll: status?.blindDisableChronicallyIll || 'empty',
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
                        ...formData,
                        fieldStatus:{
                            housingExpense: fieldStatuses,
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
                shelterType: response.data.data.householdExpense?.shelterType || '',
                shelterAmount: response.data.data.householdExpense?.shelterAmount || '',
                shelterPeriod: response.data.data.householdExpense?.shelterPeriod || '',
                shelterNoChange: response.data.data.householdExpense?.shelterNoChange || '',
                waterCostPeriod: response.data.data.householdExpense?.waterCostPeriod || '',
                waterCostAmount: response.data.data.householdExpense?.waterCostAmount || '',
                addType: response.data.data.householdExpense?.addType || '',
                addAmount: response.data.data.householdExpense?.addAmount || '',
                budgetType: response.data.data.householdExpense?.budgetType || '',
                fuelType: response.data.data.householdExpense?.fuelType || '',
                freeHousing: response.data.data.householdExpense?.freeHousing || '',
                nursingHome: response.data.data.householdExpense?.nursingHome || '',
                blindDisableChronicallyIll: response.data.data.householdExpense?.blindDisableChronicallyIll || '',
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
        }));
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Housing Expense</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the housing expenses
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className={`col-span-${renewal ? 6 : 4} border border-gray-200 rounded-md p-4`}>
                        <div className={`grid grid-cols-${renewal ? 2 : 1} gap-6`}>
                            <div className="col-span-1">
                                <Select
                                    name="shelterType"
                                    id="shelterType"
                                    label="Shelter Type"
                                    value={formData.shelterType}
                                    onChange={handleChange}
                                    options={SHELTER_TYPES}
                                    required
                                    disabled={!isEditing}
                                    status={fieldStatuses.shelterType}
                                    onStatusChange={(newStatus) => handleStatusChange('shelterType', newStatus)}
                                />
                            </div>
                            <div className="col-span-1">
                                <Input
                                    type="shelterAmount"
                                    name="shelterAmount"
                                    id="shelterAmount"
                                    label="Shelter Amount"
                                    value={formData.shelterAmount}
                                    onChange={handleChange}
                                    maxLength={7}
                                    pattern="^[0-9]*$"
                                    patternError="Please enter a valid number"
                                    disabled={!isEditing}
                                    status={fieldStatuses.shelterAmount}
                                    onStatusChange={(newStatus) => handleStatusChange('shelterAmount', newStatus)}
                                />
                            </div>
                            { renewal &&
                                <div className="col-span-1">
                                    <Select
                                        name="shelterPeriod"
                                        id="shelterPeriod"
                                        label="Shelter Period"
                                        value={formData.shelterPeriod}
                                        onChange={handleChange}
                                        options={PERIOD}
                                        disabled={!isEditing}
                                        status={fieldStatuses.shelterPeriod}
                                        onStatusChange={(newStatus) => handleStatusChange('shelterPeriod', newStatus)}
                                    />
                                </div>
                            }
                            { renewal &&
                                <div className="col-span-1">
                                    <Checkbox
                                        name="shelterNoChange"
                                        id="shelterNoChange"
                                        label="Check here if the shelter has not changed"
                                        checked={formData.shelterNoChange}
                                        value={formData.shelterNoChange}
                                        onChange={handleCheckboxChange}
                                        disabled={!isEditing}
                                        status={fieldStatuses.shelterNoChange}
                                        onStatusChange={(newStatus) => handleStatusChange('shelterNoChange', newStatus)}
                                    />
                                </div>
                            }
                        </div>
                    </div>

                    <div className={`col-span-${renewal ? 3 : 4} border border-gray-200 rounded-md p-4`}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <Select
                                    name="waterCostPeriod"
                                    id="waterCostPeriod"
                                    label="Water Bill Period"
                                    value={formData.waterCostPeriod}
                                    onChange={handleChange}
                                    options={WATER_PERIODS}
                                    disabled={!isEditing}
                                    status={fieldStatuses.waterCostPeriod}
                                    onStatusChange={(newStatus) => handleStatusChange('waterCostPeriod', newStatus)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    type="waterCostAmount"
                                    name="waterCostAmount"
                                    id="waterCostAmount"
                                    label="Water Bill Amount"
                                    value={formData.waterCostAmount}
                                    onChange={handleChange}
                                    maxLength={7}
                                    pattern="^[0-9]*$"
                                    patternError="Please enter a valid number"
                                    disabled={!isEditing}
                                    status={fieldStatuses.waterCostAmount}
                                    onStatusChange={(newStatus) => handleStatusChange('waterCostAmount', newStatus)}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className={`col-span-${renewal ? 3 : 4} border border-gray-200 rounded-md p-4`}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <Select
                                    name="addType"
                                    id="addType"
                                    label="Additional Allowance Type"
                                    value={formData.addType}
                                    onChange={handleChange}
                                    options={ADDITIONAL_ALLOWANCE_TYPES}
                                    disabled={!isEditing}
                                    status={fieldStatuses.addType}
                                    onStatusChange={(newStatus) => handleStatusChange('addType', newStatus)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    type="addAmount"
                                    name="addAmount"
                                    id="addAmount"
                                    label="Additional Allowance Amount"
                                    value={formData.addAmount}
                                    onChange={handleChange}
                                    maxLength={7}
                                    pattern="^[0-9]*$"
                                    patternError="Please enter a valid number"
                                    disabled={!isEditing}
                                    status={fieldStatuses.addAmount}
                                    onStatusChange={(newStatus) => handleStatusChange('addAmount', newStatus)}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-span-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <Select
                                    name="budgetType"
                                    id="budgetType"
                                    label="Budget Type"
                                    value={formData.budgetType}
                                    onChange={handleChange}
                                    options={BUDGET_TYPES}
                                    required
                                    disabled={!isEditing}
                                    status={fieldStatuses.budgetType}
                                    onStatusChange={(newStatus) => handleStatusChange('budgetType', newStatus)}
                                />
                            </div>

                            <div className="col-span-2">
                                <Select
                                    name="fuelType"
                                    id="fuelType"
                                    label="Fuel Type"
                                    value={formData.fuelType}
                                    onChange={handleChange}
                                    options={FUEL_TYPE}
                                    disabled={!isEditing}
                                    status={fieldStatuses.fuelType}
                                    onStatusChange={(newStatus) => handleStatusChange('fuelType', newStatus)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-8 pt-6 flex items-end justify-end">
                        <div className="pr-6">
                            <Checkbox
                                name="freeHousing"
                                id="freeHousing"
                                label="Do you receive free housing as part of your pay?"
                                checked={formData.freeHousing}
                                value={formData.freeHousing}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.freeHousing}
                                onStatusChange={(newStatus) => handleStatusChange('freeHousing', newStatus)}
                            />
                            <Checkbox
                                name="nursingHome"
                                id="nursingHome"
                                label="Any applying member receiving nursing home care in any medical institution?"
                                checked={formData.nursingHome}
                                value={formData.nursingHome}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing}
                                status={fieldStatuses.nursingHome}
                                onStatusChange={(newStatus) => handleStatusChange('nursingHome', newStatus)}
                            />
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
                        </div>
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

export default HomeAddress; 