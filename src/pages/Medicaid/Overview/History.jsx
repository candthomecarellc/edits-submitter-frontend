import { useOutletContext } from 'react-router-dom';

const History = () => {
    const { application } = useOutletContext();

    return (
        <div className="mt-6 pb-20 bg-gray-700 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-white">History</h3>
            </div>

            <div className="border-t border-white px-4 py-5 sm:px-6">
                <div className="flow-root">
                    <ul className="-mb-8">
                        <li>
                            <div className="relative pb-8">
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" aria-hidden="true"></span>
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-gray-700">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-300">Status changed to <span className="font-medium text-green-400">Completed</span></p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-400">
                                            <time dateTime="2024-01-20">20 minutes ago</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="relative pb-8">
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" aria-hidden="true"></span>
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-gray-700">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-300">Income documentation uploaded</p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-400">
                                            <time dateTime="2024-01-20">1 hour ago</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="relative pb-8">
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" aria-hidden="true"></span>
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center ring-8 ring-gray-700">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-300">Address information marked for review</p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-400">
                                            <time dateTime="2024-01-20">2 hours ago</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="relative">
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-gray-700">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-300">Application created</p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-400">
                                            <time dateTime="2024-01-20">3 hours ago</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default History;