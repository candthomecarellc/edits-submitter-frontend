import { useOutletContext } from 'react-router-dom';

const Tasks = () => {
    const { application } = useOutletContext();

    return (
        <div className="mt-6 bg-gray-700 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-white">Tasks</h3>
            </div>

            <div className="border-t border-white px-4 py-5 sm:px-6">
                <div className="flex items-center justify-end mb-4">
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add Task
                    </button>
                </div>
                <ul className="divide-y divide-gray-200">
                    <li className="py-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <span className="ml-3 text-sm text-gray-300">Review income documentation</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </li>
                    <li className="py-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <span className="ml-3 text-sm text-gray-300">Verify address information</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Tasks;