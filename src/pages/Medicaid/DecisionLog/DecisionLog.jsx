import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DecisionLog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [decisionLogData, setDecisionLogData] = useState(null);

  const [error, setError] = useState('');

  useEffect(() => {
    // Get decision log data from navigation state
    const { decisionLogData: passedData, caseUniqueId } = location.state || {};
    
    if (passedData) {
      setDecisionLogData(passedData);
    } else if (caseUniqueId) {
      setError(`No decision log data found for case ID: ${caseUniqueId}`);
    } else {
      setError('No decision log data provided');
    }
  }, [location.state]);

  const handleBackToResponse = () => {
    navigate('/application/response');
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    // Assuming date format is MMDDCCYY
    if (dateString.length === 8) {
      const month = dateString.substring(0, 2);
      const day = dateString.substring(2, 4);
      const year = dateString.substring(4, 8);
      return `${month}/${day}/${year}`;
    }
    return dateString;
  };

  const getDecisionCodeColor = (decisionCode) => {
    switch (decisionCode) {
      case 'AC': return 'bg-green-100 text-green-800';
      case 'CL': return 'bg-gray-100 text-gray-800';
      case 'RJ': return 'bg-red-100 text-red-800';
      case 'DF': return 'bg-yellow-100 text-yellow-800';
      case 'CD': return 'bg-blue-100 text-blue-800';
      case 'DE': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Decision Log</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleBackToResponse}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Back to Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!decisionLogData) {
    const { caseUniqueId } = location.state || {};
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Decision Log Found</h2>
            <p className="text-gray-600 mb-6">
              {caseUniqueId 
                ? `No decision log data found for case ID: ${caseUniqueId}`
                : 'No decision log data provided'
              }
            </p>
            <button
              onClick={handleBackToResponse}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Back to Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Decision Log</h1>
            <p className="text-gray-600 mt-2">Case ID: {decisionLogData.Case_Unique_ID || 'N/A'}</p>
          </div>
          <button
            onClick={handleBackToResponse}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Response
          </button>
        </div>

        {/* Decision Log Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Case Name</h3>
            <p className="text-xl font-bold text-blue-900">{decisionLogData.Case_Name || 'N/A'}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800">Decision Status</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDecisionCodeColor(decisionLogData.Decision_Code)}`}>
              {decisionLogData.Decision_Code}
            </span>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-800">Provider No</h3>
            <p className="text-xl font-bold text-purple-900">{decisionLogData.Provider_No || 'N/A'}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Case Number</h3>
            <p className="text-xl font-bold text-blue-900">{decisionLogData.Case_Number || 'N/A'}</p>
          </div>
        </div>

        {/* Main Decision Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Decision Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <span className="text-sm font-medium text-gray-600">File Name</span>
              <p className="text-sm text-gray-900">{decisionLogData.File_Name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Eligibility From Date</span>
              <p className="text-sm text-gray-900">{formatDate(decisionLogData.Eligibility_From_Date)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Eligibility To Date</span>
              <p className="text-sm text-gray-900">{formatDate(decisionLogData.Eligibility_To_Date)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Decision Rendered Date</span>
              <p className="text-sm text-gray-900">{formatDate(decisionLogData.Decision_Rendered_Date)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Submission Type</span>
              <p className="text-sm text-gray-900">
                {decisionLogData.Submission_Type === 'N' ? 'New' : 
                 decisionLogData.Submission_Type === 'R' ? 'Resubmit' : 
                 decisionLogData.Submission_Type || 'N/A'}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Deferral Number</span>
              <p className="text-sm text-gray-900">{decisionLogData.Deferral_Number || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Deferral Date</span>
              <p className="text-sm text-gray-900">{formatDate(decisionLogData.Deferral_Date)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Active App Reg No</span>
              <p className="text-sm text-gray-900">{decisionLogData.Active_App_Reg_No || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Decision Reason Records */}
        {decisionLogData.Decision_Reason_Record && decisionLogData.Decision_Reason_Record.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Decision Reason Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason Code
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Move To End Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {decisionLogData.Decision_Reason_Record.map((reasonRecord, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {reasonRecord.Case_Reason_Code}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {reasonRecord.Case_Reason_Description || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {reasonRecord.Move_To_End_Remarks || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Deferral Information */}
        {(decisionLogData.Deferral_Resource_Record?.Institution_Or_Resource || 
          decisionLogData.Deferral_Remark_Record?.Remarks) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Deferral Information</h2>
            
            {decisionLogData.Deferral_Resource_Record?.Institution_Or_Resource && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-medium text-yellow-800 mb-3">Resource Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-yellow-700">Institution/Resource</span>
                    <p className="text-sm text-yellow-800">{decisionLogData.Deferral_Resource_Record.Institution_Or_Resource}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-yellow-700">Account Type</span>
                    <p className="text-sm text-yellow-800">{decisionLogData.Deferral_Resource_Record.Account_Type || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-yellow-700">Account Number</span>
                    <p className="text-sm text-yellow-800">{decisionLogData.Deferral_Resource_Record.Account_No || 'N/A'}</p>
                  </div>
                  {decisionLogData.Deferral_Resource_Record.Documentation_Needed && (
                    <div className="mt-3">
                      <span className="text-sm font-medium text-yellow-700">Documentation Needed</span>
                      <p className="text-sm text-yellow-800">{decisionLogData.Deferral_Resource_Record.Documentation_Needed}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-yellow-700">Date</span>
                    <p className="text-sm text-yellow-800">{formatDate(decisionLogData.Deferral_Resource_Record.Date?.slice(0, 7))} to {formatDate(decisionLogData.Deferral_Resource_Record.Date?.slice(7, 14))}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-yellow-700">Amount</span>
                    <p className="text-sm text-yellow-800">{decisionLogData.Deferral_Resource_Record.Amount || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}

            {decisionLogData.Deferral_Remark_Record?.Remarks && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-orange-800 mb-2">Deferral Remarks</h3>
                <p className="text-sm text-orange-800">{decisionLogData.Deferral_Remark_Record.Remarks}</p>
              </div>
            )}
          </div>
        )}

        {/* Household Member Records */}
        {decisionLogData.Household_Member_Record && decisionLogData.Household_Member_Record.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Household Members</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CIN
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Dates
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {decisionLogData.Household_Member_Record.map((member, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <p className="font-medium">{member.First_Name} {member.Last_Name}</p>
                          <p className="text-xs text-gray-500">Line: {member.Household_Line_No}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {member.MA_Individual_Status_Description || member.MA_Individual_Status_Code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                        {member.CIN || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          {member.Service_From_Date1 && (
                            <div>
                              <span className="text-xs text-gray-500">From: </span>
                              {formatDate(member.Service_From_Date1)}
                            </div>
                          )}
                          {member.Service_To_Date1 && (
                            <div>
                              <span className="text-xs text-gray-500">To: </span>
                              {formatDate(member.Service_To_Date1)}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionLog;
