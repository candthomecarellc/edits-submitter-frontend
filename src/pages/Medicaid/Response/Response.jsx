import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Response = () => {
  const navigate = useNavigate();
  const { application } = useOutletContext();
  const [responseLogData, setResponseLogData] = useState(null);
  const [error, setError] = useState('');
  const [expandedMembers, setExpandedMembers] = useState(new Set());


  useEffect(() => {
    if (application?.responseLog) {
      setResponseLogData(application.responseLog);
    } else {
      setError('No response log data found for this application');
    }
  }, [application]);

  // Check if there's deferral information
  const deferralInfo = responseLogData && (
    responseLogData.Deferral_Resource_Record?.Institution_Or_Resource ||
    responseLogData.Deferral_Resource_Record?.Account_Type ||
    responseLogData.Deferral_Resource_Record?.Account_No ||
    responseLogData.Deferral_Resource_Record?.Documentation_Needed ||
    responseLogData.Deferral_Resource_Record?.Date ||
    responseLogData.Deferral_Resource_Record?.Amount ||
    responseLogData.Deferral_Remark_Record?.Remarks
  );

  const handleBackToApplication = () => {
    navigate('/application/overview');
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

  const getBatchStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 border border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getDecisionCodeColor = (decisionCode) => {
    switch (decisionCode) {
      case 'Active': return 'bg-green-50 border border-green-200 text-green-800';
      case 'Closed': return 'bg-gray-50 border border-gray-200 text-gray-800';
      case 'Rejected': return 'bg-red-50 border border-red-200 text-red-800';
      case 'Deferral': return 'bg-yellow-50 border border-yellow-200 text-yellow-800';
      case 'Cancel Deferral': return 'bg-blue-50 border border-blue-200 text-blue-800';
      case 'Deferral Extension': return 'bg-purple-50 border border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border border-gray-200 text-gray-800';
    }
  };

  const toggleMemberExpansion = (index) => {
    const newExpandedMembers = new Set(expandedMembers);
    if (newExpandedMembers.has(index)) {
      newExpandedMembers.delete(index);
    } else {
      newExpandedMembers.add(index);
    }
    setExpandedMembers(newExpandedMembers);
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Response Log</h2>
            <p className="text-gray-600 mb-6">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!responseLogData) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Response Log Found</h2>
            <p className="text-gray-600 mb-6">No response log data available for this application.</p>
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
            <h1 className="text-3xl font-bold text-gray-800">Response Log</h1>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Unique Case ID</h3>
            <p className="text-xl font-bold text-blue-900">{responseLogData.Unique_Case_ID || 'N/A'}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Case Name</h3>
            <p className="text-xl font-bold text-blue-900">{responseLogData.Case_Name || 'N/A'}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Provider No</h3>
            <p className="text-xl font-bold text-blue-900">{responseLogData.Provider_No || 'N/A'}</p>
          </div>
          <div className={`${getDecisionCodeColor(responseLogData.Decision_Code)} rounded-lg p-4`}>
            <h3 className="text-sm font-medium">Decision Code</h3>
            <p className="text-xl font-bold">{responseLogData.Decision_Code || 'N/A'}</p>
          </div>
        </div>

        {/* File Information */}
        <div className={`${getBatchStatusColor(responseLogData.Batch_File_Status)} rounded-lg p-6 mb-8`}>
          <h2 className="text-xl font-semibold mb-4">File Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <span className="text-sm font-medium">File Name</span>
              <p className="text-sm">{responseLogData.File_Name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Date Received</span>
              <p className="text-sm">{formatDate(responseLogData.Date_Received)}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Batch File Status</span>
              <p className="text-sm">{responseLogData.Batch_File_Status || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Status Reason</span>
              <p className="text-sm">{responseLogData.Batch_File_Status_Reason || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Case Message Records */}
        {responseLogData.Case_Message_Record && responseLogData.Case_Message_Record.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Case Message Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Error Code
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Error Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {responseLogData.Case_Message_Record.map((messageRecord, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          messageRecord.Error_Code === 'Passed Application Completeness' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                          {messageRecord.Error_Code}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {messageRecord.Error_Message || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Decision Information */}
        <div className={`${getDecisionCodeColor(responseLogData.Decision_Code)} rounded-lg p-6 mb-8`}>
          <h2 className="text-xl font-semibold mb-4">Decision Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <span className="text-sm font-medium">Decision Code</span>
              <p className="text-sm">{responseLogData.Decision_Code || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Case Number</span>
              <p className="text-sm">{responseLogData.Case_Number || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Eligibility Period</span>
              <p className="text-sm">{formatDate(responseLogData.Eligibility_From_Date)} to {formatDate(responseLogData.Eligibility_To_Date)}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Decision Rendered Date</span>
              <p className="text-sm">{formatDate(responseLogData.Decision_Rendered_Date)}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Submission Type</span>
              <p className="text-sm">
                {responseLogData.Submission_Type === 'N' ? 'New' : 
                 responseLogData.Submission_Type === 'R' ? 'Resubmit' : 
                 responseLogData.Submission_Type || 'N/A'}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium">Deferral Number</span>
              <p className="text-sm">{responseLogData.Deferral_Number || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Deferral Date</span>
              <p className="text-sm">{formatDate(responseLogData.Deferral_Date)}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Active App Reg No</span>
              <p className="text-sm">{responseLogData.Active_App_Reg_No || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Decision Reason Records */}
        {responseLogData.Decision_Reason_Record && responseLogData.Decision_Reason_Record.length > 0 && (
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
                  {responseLogData.Decision_Reason_Record.map((reasonRecord, index) => (
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
        {deferralInfo && (
          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-yellow-800 mb-3">Deferral Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-yellow-700">Institution/Resource</span>
                  <p className="text-sm text-yellow-800">{responseLogData.Deferral_Resource_Record.Institution_Or_Resource}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-yellow-700">Account Type</span>
                  <p className="text-sm text-yellow-800">{responseLogData.Deferral_Resource_Record.Account_Type || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-yellow-700">Account Number</span>
                  <p className="text-sm text-yellow-800">{responseLogData.Deferral_Resource_Record.Account_No || 'N/A'}</p>
                </div>
                <div className="mt-3">
                  <span className="text-sm font-medium text-yellow-700">Documentation Needed</span>
                  <p className="text-sm text-yellow-800">{responseLogData.Deferral_Resource_Record.Documentation_Needed}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-yellow-700">Date</span>
                  <p className="text-sm text-yellow-800">
                    {responseLogData.Deferral_Resource_Record.Date ? `${formatDate(responseLogData.Deferral_Resource_Record.Date.slice(0, 7))} to ${formatDate(responseLogData.Deferral_Resource_Record.Date.slice(8, 15))}` : 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-yellow-700">Amount</span>
                  <p className="text-sm text-yellow-800">{responseLogData.Deferral_Resource_Record.Amount || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-yellow-700">Deferral Remarks</span>
                  <p className="text-sm text-yellow-800">{responseLogData.Deferral_Remark_Record.Remarks || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Household Member Records */}
        {responseLogData.Household_Member_Record && responseLogData.Household_Member_Record.length > 0 && (
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
                      CIN
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {responseLogData.Household_Member_Record.map((member, index) => (
                    <React.Fragment key={index}>
                      <tr className={`hover:bg-gray-50 cursor-pointer ${expandedMembers.has(index) ? 'bg-gray-50' : ''}`} onClick={() => toggleMemberExpansion(index)}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <svg className={`w-4 h-4 mr-2 transform transition-transform ${expandedMembers.has(index) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <div>
                              <p className="font-medium">{member.First_Name} {member.Last_Name}</p>
                              <p className="text-xs text-gray-500">Line: {member.Household_Line_No}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {member.CIN || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          {member.MA_Individual_Status_Code || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          {member.MA_Individual_Status_Description || '-'}
                        </td>
                      </tr>
                      {expandedMembers.has(index) && (
                        <tr className="bg-blue-50">
                          <td colSpan="5" className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                              {/* NAMI 1 Information */}
                              <div className="col-span-1">
                                <div className="grid grid-cols-4 bg-white rounded-lg p-4 border border-blue-200">
                                  <div className="col-span-1">
                                    <span className="text-xs font-medium text-gray-600">NAMI 1:</span>
                                    <p className="text-sm text-gray-900">{member.NAMI_1 || 'N/A'}</p>
                                  </div>
                                  <div className="col-span-1">
                                    <span className="text-xs font-medium text-gray-600">From Date:</span>
                                    <p className="text-sm text-gray-900">{formatDate(member.From_Date1)}</p>
                                  </div>
                                  <div className="col-span-1">
                                    <span className="text-xs font-medium text-gray-600">Service From Date:</span>
                                    <p className="text-sm text-gray-900">{formatDate(member.Service_From_Date1)}</p>
                                  </div>
                                  <div className="col-span-1">
                                    <span className="text-xs font-medium text-gray-600">Service To Date:</span>
                                    <p className="text-sm text-gray-900">{formatDate(member.Service_To_Date1)}</p>
                                  </div>
                                </div>
                              </div>

                              {/* NAMI 2 Information */}
                              <div className="col-span-1">
                                <div className="grid grid-cols-4 bg-white rounded-lg p-4 border border-blue-200">
                                  <div className="col-span-1">
                                    <span className="text-xs font-medium text-gray-600">NAMI 2:</span>
                                    <p className="text-sm text-gray-900">{member.NAMI_2 || 'N/A'}</p>
                                  </div>
                                  <div className="col-span-1">
                                    <span className="text-xs font-medium text-gray-600">From Date:</span>
                                    <p className="text-sm text-gray-900">{formatDate(member.From_Date2)}</p>
                                  </div>
                                  <div className="col-span-1">
                                    <span className="text-xs font-medium text-gray-600">Service From Date:</span>
                                    <p className="text-sm text-gray-900">{formatDate(member.Service_From_Date2)}</p>
                                  </div>
                                  <div className="col-span-1">
                                    <span className="text-xs font-medium text-gray-600">Service To Date:</span>
                                    <p className="text-sm text-gray-900">{formatDate(member.Service_To_Date2)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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

export default Response;
