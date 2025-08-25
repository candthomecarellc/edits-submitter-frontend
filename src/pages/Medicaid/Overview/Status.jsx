import { useOutletContext } from 'react-router-dom';
import { Button } from '../../../components/Form';
import { useState } from 'react';
import { status } from '../../../constants/ApplicationConstants';

const Status = () => {
    const { application } = useOutletContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const statusCount = {
        error: 0,
        review: 0,
        confirmed: 0,
        default: 0,
    };

    console.log('Applicant Information:');
    Object.keys(application.fieldStatus).forEach(page => {
        console.log(' ', page,':');
        Object.keys(application.fieldStatus[page]).forEach(field => {
            if(application.fieldStatus[page][field] === 'default') statusCount.default++; 
            else if(application.fieldStatus[page][field] === 'review') statusCount.review++; 
            else if(application.fieldStatus[page][field] === 'confirmed') statusCount.confirmed++; 
            else if(application.fieldStatus[page][field] === 'error') statusCount.error++;
            console.log('  ', field, ': ', application.fieldStatus[page][field]);
        })
    });
    console.log('Household Expense:');
    Object.keys(application.householdExpense.fieldStatus).forEach(page => {
        console.log(' ', page,':');
        Object.keys(application.householdExpense.fieldStatus[page]).forEach(field => {
            if(application.householdExpense.fieldStatus[page][field] === 'default') statusCount.default++; 
            else if(application.householdExpense.fieldStatus[page][field] === 'review') statusCount.review++; 
            else if(application.householdExpense.fieldStatus[page][field] === 'confirmed') statusCount.confirmed++; 
            else if(application.householdExpense.fieldStatus[page][field] === 'error') statusCount.error++; 
            console.log('  ', field, ': ', application.householdExpense.fieldStatus[page][field]);
        })
    });
    console.log('Household Composition:');
    application?.householdMember.forEach(member => {
        console.log(' ', member.lineNumber, ':');
        console.log('  General Information:')
        Object.keys(member.generalInformation).forEach(page => {
            console.log('   ', page,':');
            Object.keys(member.generalInformation[page]).forEach(field => {
                if(member.generalInformation[page][field] === 'default') statusCount.default++; 
                else if(member.generalInformation[page][field] === 'review') statusCount.review++; 
                else if(member.generalInformation[page][field] === 'confirmed') statusCount.confirmed++; 
                else if(member.generalInformation[page][field] === 'error') statusCount.error++; 
                console.log('    ', field, ': ', member.generalInformation[page][field]);
            });
        });
        console.log('  Incomes:');
        Object.keys(member.income).forEach(type => {
            console.log('   ', type,':');
            member.income[type].forEach(income => {
                console.log('    ', income.index, ':');
                Object.keys(income.fieldStatus).forEach(field => {
                    if(income.fieldStatus[field] === 'default') statusCount.default++; 
                    else if(income.fieldStatus[field] === 'review') statusCount.review++; 
                    else if(income.fieldStatus[field] === 'confirmed') statusCount.confirmed++; 
                    else if(income.fieldStatus[field] === 'error') statusCount.error++;
                    console.log('     ', field, ': ', income.fieldStatus[field]);
                });
            });
        });
        console.log('  Insurance Information:');
        Object.keys(member.insuranceInformation).forEach(page => {
            console.log('   ', page,':');
            Object.keys(member.insuranceInformation[page]).forEach(field => {
                if(member.insuranceInformation[page][field] === 'default') statusCount.default++; 
                else if(member.insuranceInformation[page][field] === 'review') statusCount.review++; 
                else if(member.insuranceInformation[page][field] === 'confirmed') statusCount.confirmed++; 
                else if(member.insuranceInformation[page][field] === 'error') statusCount.error++;
                console.log('    ', field, ': ', member.insuranceInformation[page][field]);
            });
        });
    });

    const handleSubmitApplication = async () => {
        if (!application?._id) {
            setSubmitError('Application ID not found');
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess('');

        try {
            const accessToken = localStorage.getItem('edits-submitter.accessToken');
            
            const response = await fetch(`http://localhost:3000/api/v1/application/${application._id}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit application');
            }

            const result = await response.json();
            
            if (result.success) {
                setSubmitSuccess('Application submitted successfully!');
                // Optionally refresh the application data or redirect
            } else {
                throw new Error(result.message || 'Failed to submit application');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            setSubmitError(error.message || 'Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Application Status</h3>
                    {statusCount.error === 0 && statusCount.review === 0 && (
                        <Button
                            variant="primary"
                            onClick={handleSubmitApplication}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    )}
                </div>
                
                {/* Error and Success Messages */}
                {submitError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{submitError}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {submitSuccess && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{submitSuccess}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Status Overview */}
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                            {status(application.status).label}
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="bg-red-50 p-3 rounded-lg">
                                <div className="text-red-700 font-semibold">Required Fields</div>
                                <div className="text-2xl font-bold text-red-600">{statusCount.error}</div>
                                <div className="text-red-600">remaining</div>
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-lg">
                                <div className="text-yellow-700 font-semibold">Review Needed</div>
                                <div className="text-2xl font-bold text-yellow-600">{statusCount.review}</div>
                                <div className="text-yellow-600">fields</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                                <div className="text-green-700 font-semibold">Confirmed</div>
                                <div className="text-2xl font-bold text-green-600">{statusCount.confirmed}</div>
                                <div className="text-green-600">fields</div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <div className="text-blue-700 font-semibold">Optional</div>
                                <div className="text-2xl font-bold text-blue-600">{statusCount.default}</div>
                                <div className="text-blue-600">remaining</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 py-3 sm:px-6">
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                Progress
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-indigo-600">
                                75%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                        <div className="w-1/4 bg-green-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                        <div className="w-1/4 bg-yellow-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                        <div className="w-1/4 bg-red-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                        <div className="w-1/4 bg-blue-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                    </div>
                </div>
            </div>

            {/* Required Documents */}
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Required Documents</h4>
                <ul className="divide-y divide-gray-200">
                    <li className="py-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="ml-2 text-sm text-gray-900">Proof of Income</span>
                        </div>
                        <span className="text-sm text-red-600">Required</span>
                    </li>
                    <li className="py-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="ml-2 text-sm text-gray-900">ID Verification</span>
                        </div>
                        <span className="text-sm text-red-600">Required</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Status;