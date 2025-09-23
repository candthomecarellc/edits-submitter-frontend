import PersonalInformation from './PersonalInformation';
import StatusInformation from './StatusInformation';
import MemberIncome from './MemberIncome';
import EthnicCitizenshipInformation from './EthnicCitizenshipInformation';
import OtherInformation from './OtherInformation';
import { useOutletContext } from 'react-router-dom';

const GeneralInformation = () => {
    const { application } = useOutletContext();
    const renewal = application.submissionType === 'renewal';
    return (
        <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">General Information</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Update the member's information
                    </p>
                </div>
            </div>

            <PersonalInformation />
            <StatusInformation />
            {!renewal && <MemberIncome />}
            <EthnicCitizenshipInformation />
            <OtherInformation />
        </div>
    );
};

export default GeneralInformation; 