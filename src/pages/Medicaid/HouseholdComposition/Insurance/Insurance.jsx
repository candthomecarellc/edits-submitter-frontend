import HealthInsurance from './HealthInsurance';
import MedicalExpenses from './MedicalExpenses';
import LivingOutside from './LivingOutside';
import HealthPlan from './HealthPlan';

const Insurance = () => {
    return (
        <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Insurance Information</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Update the member's insurance information
                    </p>
                </div>
            </div>

            <HealthInsurance />
            <MedicalExpenses />
            <LivingOutside />
            <HealthPlan />
        </div>
    );
};

export default Insurance; 