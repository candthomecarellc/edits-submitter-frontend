import HousingExpense from './HousingExpense';
import ChildCare from './ChildCare';
import SSI from './SSI';
import ChronicCare from './ChronicCare';
import { useOutletContext } from 'react-router-dom';

const HouseholdExpense = () => {
    const { application } = useOutletContext();
    const renewal = application.submissionType === 'renewal';
    return (
        <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Household Expenses</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Update the household expenses
                    </p>
                </div>
            </div>

            <HousingExpense />
            <ChildCare />
            {!renewal && <SSI />}
            <ChronicCare />
        </div>
    );
};

export default HouseholdExpense; 