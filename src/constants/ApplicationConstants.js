export const APPLICATION_STATUS = [
    {
        value: 'editing',
        label: 'Editing',
        color: 'bg-slate-100 text-slate-800 border border-slate-700',
        hover: 'The application is incomplete. Please complete the application.'
    },
    {
        value: 'completed',
        label: 'Completed',
        color: 'bg-purple-100 text-purple-800 border border-purple-700',
        hover: 'The application is complete and ready for final revision.'
    },
    {
        value: 'review',
        label: 'Review',
        color: 'bg-yellow-100 text-yellow-800 border border-yellow-700',
        hover: 'The application is in the process of final revision before submission.'
    },
    {
        value: 'confirmed',
        label: 'Confirmed',
        color: 'bg-lime-100 text-lime-800 border border-lime-700',
        hover: 'The application has been reviewed and confirmed. It is ready to be submitted to HRA.'
    },
    {
        value: 'ready',
        label: 'Ready',
        color: 'bg-indigo-100 text-indigo-800 border border-indigo-700',
        hover: 'The application is marked for submission.'
    },
    {
        value: 'submitted',
        label: 'Submitted',
        color: 'bg-sky-100 text-sky-800 border border-sky-700',
        hover: 'The application batch file has been submitted to HRA.'
    },
    {
        value: 'error',
        label: 'Error',
        color: 'bg-pink-100 text-pink-800 border border-pink-700',
        hover: 'The application batch file could not be parsed by HRA.'
    },
    {
        value: 'approved',
        label: 'Approved',
        color: 'bg-green-100 text-green-800 border border-green-700',
        hover: 'The application batch file has been approved by HRA.'
    },
    {
        value: 'deferral',
        label: 'Deferral',
        color: 'bg-orange-100 text-orange-800 border border-orange-700',
        hover: 'The application batch file has been deferred by HRA.'
    },
    {
        value: 'rejected',
        label: 'Rejected',
        color: 'bg-red-100 text-red-800 border border-red-700',
        hover: 'The application batch file has been rejected by HRA.'
    }
]

export const status = (value) => {
    return APPLICATION_STATUS.find(status => status.value === value);
}
