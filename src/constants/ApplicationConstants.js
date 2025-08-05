export const APPLICATION_STATUS = [
    {
        value: 'editing',
        label: 'Editing',
        color: 'bg-yellow-100 text-yellow-800 border border-yellow-700',
        hover: 'The application is incomplete. Please complete the application.'
    },
    {
        value: 'completed',
        label: 'Completed',
        color: 'bg-blue-100 text-blue-800 border border-blue-700',
        hover: 'The application is complete. Please create the batch file for review.'
    },
    {
        value: 'review',
        label: 'Review',
        color: 'bg-blue-100 text-blue-800 border border-blue-700',
        hover: 'The application batch file has been created and is in the process of final review.'
    },
    {
        value: 'confirmed',
        label: 'Confirmed',
        color: 'bg-green-100 text-green-800 border border-green-700',
        hover: 'The application batch file has been reviewed and confirmed. It is ready to be submitted to HRA.'
    },
    {
        value: 'submitted',
        label: 'Submitted',
        color: 'bg-gray-100 text-gray-800 border border-gray-700',
        hover: 'The application batch file has been submitted to HRA.'
    },
    {
        value: 'approved',
        label: 'Approved',
        color: 'bg-green-100 text-green-800 border border-green-700',
        hover: 'The application batch file has been submitted to HRA and they approved it.'
    },
    {
        value: 'rejected',
        label: 'Rejected',
        color: 'bg-red-100 text-red-800 border border-red-700',
        hover: 'The application batch file has been submitted to HRA and they rejected it.'
    }
]

export const status = (value) => {
    return APPLICATION_STATUS.find(status => status.value === value);
}