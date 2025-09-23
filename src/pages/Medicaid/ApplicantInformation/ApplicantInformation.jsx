import PersonalDetails from './PersonalDetails';
import HomeAddress from './HomeAddress';
import MailingAddress from './MailingAddress';
import SecondMailingAddress from './SecondMailingAddress';
import OtherInformation from './OtherInformation';
import RenewalInformation from './RenewalInformation';
import { useOutletContext } from 'react-router-dom';

const ApplicantInformation = () => {
    const { application } = useOutletContext();
    const renewal = application.submissionType === 'renewal';
    return (
        <div className="p-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Applicant Information</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Update the applicant's personal information
                    </p>
                </div>
            </div>

            <PersonalDetails />
            <HomeAddress />
            <MailingAddress />
            {!renewal && <SecondMailingAddress />}
            <OtherInformation />
            {renewal && <RenewalInformation />}
        </div>
    );
};

export default ApplicantInformation; 