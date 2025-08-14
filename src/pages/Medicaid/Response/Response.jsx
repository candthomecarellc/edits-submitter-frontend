import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Response = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState({
    batchLog: null,
    receptionLog: null,
    decisionLog: null,
    budgetLog: null
  });
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState({});
  const [expandedRecords, setExpandedRecords] = useState(new Set());

  const toggleRecordExpansion = (index) => {
    const newExpanded = new Set(expandedRecords);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRecords(newExpanded);
  };

  const isRecordExpanded = (index) => expandedRecords.has(index);

  const handleCaseClick = (caseRecord) => {
    // Check if the case has a message record with 'Passed Application Completeness'
    const hasPassedCompleteness = caseRecord.Case_Message_Record?.some(
      message => message.Error_Code === 'Passed Application Completeness'
    );
    
    if (hasPassedCompleteness) {
      // Find the corresponding decision log data for this case
      const decisionLogData = logData?.decisionLog?.find(
        decision => decision.Case_Unique_ID === caseRecord.Unique_Case_ID
      );
      
      if (decisionLogData) {
        // Navigate to the decision log page with the decision log data
        navigate('/application/decision-log', { 
          state: { decisionLogData } 
        });
      } else {
        // If no decision log found, show an error or navigate with empty data
        navigate('/application/decision-log', { 
          state: { decisionLogData: null, caseUniqueId: caseRecord.Unique_Case_ID } 
        });
      }
    }
  };

  const requiredFileTypes = [
    { key: 'batchLog', prefix: 'EDITSPLUS_BatchList', name: 'Batch Log' },
    { key: 'receptionLog', prefix: 'EDITSPLUS_ReceptionLog', name: 'Reception Log' },
    { key: 'decisionLog', prefix: 'EDITSPLUS_AppDecision', name: 'Decision Log' },
    { key: 'budgetLog', prefix: 'BudgetLog', name: 'Budget Log' }
  ];

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      // Validate file name starts with the required prefix
      const requiredPrefix = requiredFileTypes.find(type => type.key === fileType)?.prefix;
      if (file.name.startsWith(requiredPrefix)) {
        setSelectedFiles(prev => ({
          ...prev,
          [fileType]: file
        }));
        setError('');
        setUploadStatus(prev => ({
          ...prev,
          [fileType]: 'selected'
        }));
      } else {
        setError(`File must start with "${requiredPrefix}"`);
        setSelectedFiles(prev => ({
          ...prev,
          [fileType]: null
        }));
        setUploadStatus(prev => ({
          ...prev,
          [fileType]: 'invalid'
        }));
      }
    } else {
      setError('Please select a valid .txt file');
      setSelectedFiles(prev => ({
        ...prev,
        [fileType]: null
      }));
      setUploadStatus(prev => ({
        ...prev,
        [fileType]: 'invalid'
      }));
    }
  };

  const handleFileUpload = async () => {
    // Check if all required files are selected
    const missingFiles = requiredFileTypes.filter(type => !selectedFiles[type.key]);
    if (missingFiles.length > 0) {
      setError(`Please select all required files: ${missingFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      
      // Add all files to FormData with the same field name 'files'
      Object.entries(selectedFiles).forEach(([key, file]) => {
        if (file) {
          formData.append('files', file);
        }
      });

      const response = await axios.post(
        'http://localhost:3000/api/v1/notice/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setLogData(response.data.data);
        // Update upload status for all files
        Object.keys(selectedFiles).forEach(key => {
          setUploadStatus(prev => ({
            ...prev,
            [key]: 'uploaded'
          }));
        });
      } else {
        setError(response.data.message || 'Failed to process files');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'selected': return 'text-blue-600';
      case 'uploaded': return 'text-green-600';
      case 'invalid': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'selected': return '📁';
      case 'uploaded': return '✅';
      case 'invalid': return '❌';
      default: return '📄';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Response Management</h1>
        
        {/* File Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Response Log Files</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please upload all 4 required log files. Each file must be a .txt file and start with the specified prefix.
          </p>
          
          {/* File Upload Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {requiredFileTypes.map((fileType) => (
              <div key={fileType.key} className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-700">{fileType.name}</h3>
                  <span className={`text-sm ${getStatusColor(uploadStatus[fileType.key])}`}>
                    {getStatusIcon(uploadStatus[fileType.key])}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <input
                    type="file"
                    accept=".txt"
                    onChange={(e) => handleFileChange(e, fileType.key)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full"
                  />
                  
                  {selectedFiles[fileType.key] && (
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Selected: {selectedFiles[fileType.key].name}</p>
                      <p className="text-xs text-gray-500">Size: {(selectedFiles[fileType.key].size / 1024).toFixed(1)} KB</p>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    <p>Required prefix: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{fileType.prefix}</span></p>
                    <p>File type: .txt only</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <button
              onClick={handleFileUpload}
              disabled={loading || Object.values(selectedFiles).some(file => !file)}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              {loading ? 'Uploading Files...' : 'Upload All Files'}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              {error}
            </div>
          )}
        </div>

                 {/* Response Log Data Summary and Table */}
         {logData?.receptionLog?.length > 0 && (
           <div className="mt-8">
             <h2 className="text-xl font-semibold text-gray-700 mb-4">Response Log Data</h2>
             
             {/* Summary Cards */}
             <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                 <h3 className="text-sm font-medium text-blue-800">Total Records</h3>
                 <p className="text-2xl font-bold text-blue-900">{logData?.receptionLog?.length}</p>
               </div>
               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                 <h3 className="text-sm font-medium text-green-800">Success Status</h3>
                 <p className="text-2xl font-bold text-green-900">
                   {logData?.receptionLog?.filter(record => {
                     return record.Batch_File_Status === 'Passed';
                   }).length}
                 </p>
               </div>
               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                 <h3 className="text-sm font-medium text-red-800">Failed Status</h3>
                 <p className="text-2xl font-bold text-red-900">
                   {logData?.receptionLog?.filter(record => {
                     return record.Batch_File_Status === 'Failed';
                   }).length}
                 </p>
               </div>
               <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                 <h3 className="text-sm font-medium text-purple-800">Total Cases</h3>
                 <p className="text-2xl font-bold text-purple-900">
                   {logData?.receptionLog?.reduce((total, record) => {
                     return total + (record.Case_Record?.length || 0);
                   }, 0)}
                 </p>
               </div>
               <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                 <h3 className="text-sm font-medium text-orange-800">Total Messages</h3>
                 <p className="text-2xl font-bold text-orange-900">
                   {logData?.receptionLog?.reduce((total, record) => {
                     return total + (record.Case_Record?.reduce((caseTotal, caseRecord) => {
                       return caseTotal + (caseRecord.Case_Message_Record?.length || 0);
                     }, 0) || 0);
                   }, 0)}
                 </p>
               </div>
             </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expand
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Received
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Reason
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cases
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logData?.receptionLog?.map((record, index) => {

                    // Determine status color based on various status values
                    const getStatusColor = (status) => {
                      if (status === 'Passed') return 'bg-green-100 text-green-800';
                      if (status === 'Failed') return 'bg-red-100 text-red-800';
                      return 'bg-gray-100 text-gray-800';
                    };
                    
                    return (
                      <React.Fragment key={index}>
                        <tr 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleRecordExpansion(index)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <button
                              className="text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRecordExpansion(index);
                              }}
                              title={isRecordExpanded(index) ? "Click to collapse" : "Click to expand"}
                            >
                              {isRecordExpanded(index) ? (
                                <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {record.File_Name  || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {record.Date_Received  || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.Batch_File_Status)}`}>
                              {record.Batch_File_Status || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {record.Batch_File_Status_Reason || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {record.Case_Record?.length || 0} case{record.Case_Record?.length !== 1 ? 's' : ''}
                            </span>
                          </td>
                        </tr>
                        
                        {/* Expanded Content - Case Records */}
                        {isRecordExpanded(index) && (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 bg-gray-50">
                              <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                  Case Records ({record.Case_Record?.length || 0})
                                </h4>
                                
                                {record.Case_Record && record.Case_Record.length > 0 ? (
                                  <div className="space-y-4">
                                    {record.Case_Record.map((caseRecord, caseIndex) => {
                                      const hasPassedCompleteness = caseRecord.Case_Message_Record?.some(
                                        message => message.Error_Code === 'Passed Application Completeness'
                                      );
                                       
                                      return (
                                        <div 
                                          key={caseIndex} 
                                          className={`bg-white border border-gray-200 rounded-lg p-4 ${
                                            hasPassedCompleteness 
                                              ? 'hover:border-blue-400 hover:shadow-md cursor-pointer transition-all duration-200' 
                                              : ''
                                          }`}
                                          onClick={() => hasPassedCompleteness && handleCaseClick(caseRecord)}
                                        >
                                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                                            <div>
                                              <span className="text-sm font-medium text-gray-600">Provider No:</span>
                                              <p className="text-sm text-gray-900">{caseRecord.Provider_No || 'N/A'}</p>
                                            </div>
                                            <div>
                                              <span className="text-sm font-medium text-gray-600">Unique Case ID:</span>
                                              <p className="text-sm text-gray-900">{caseRecord.Unique_Case_ID || 'N/A'}</p>
                                            </div>
                                            <div>
                                              <span className="text-sm font-medium text-gray-600">Case Name:</span>
                                              <p className="text-sm text-gray-900">{caseRecord.Case_Name || 'N/A'}</p>
                                            </div>
                                          </div>
                                        
                                          {/* Case Message Records */}
                                          {caseRecord.Case_Message_Record && caseRecord.Case_Message_Record.length > 0 && (
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                              <h5 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                Case Message Records ({caseRecord.Case_Message_Record.length})
                                              </h5>
                                              <div className="overflow-x-auto">
                                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                                  <thead className="bg-gray-100">
                                                    <tr>
                                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error</th>
                                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Message</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody className="divide-y divide-gray-200">
                                                    {caseRecord.Case_Message_Record.map((messageRecord, messageIndex) => (
                                                      <tr key={messageIndex} className="hover:bg-gray-50 transition-colors duration-150">
                                                        <td className="px-3 py-2 text-sm text-gray-900">
                                                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            messageRecord.Error_Code === 'Passed Application Completeness' 
                                                              ? 'bg-green-100 text-green-800 border border-green-200' 
                                                              : 'bg-red-100 text-red-800 border border-red-200'
                                                            }`}>
                                                            {messageRecord.Error_Code}
                                                          </span>
                                                        </td>
                                                        <td className="px-3 py-2 text-sm text-gray-900">
                                                          {messageRecord.Error_Message || 'N/A'}
                                                        </td>
                                                      </tr>
                                                    ))}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          )}
                                        
                                          {(!caseRecord.Case_Message_Record || caseRecord.Case_Message_Record.length === 0) && (
                                            <div className="text-center py-4 text-gray-500">
                                              <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                              </svg>
                                              <p className="text-xs font-medium">No case message records found</p>
                                              <p className="text-xs text-gray-400">This case doesn't contain any error messages</p>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="text-center py-8 text-gray-500">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-sm font-medium">No case records found</p>
                                    <p className="text-xs text-gray-400">This reception log record doesn't contain any case information</p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Total records: {logData?.receptionLog?.length}
            </div>
          </div>
        )}

        {/* Instructions */}
        {logData?.receptionLog?.length === 0 && !loading && (
          <div className="mt-8 text-center text-gray-500">
            <p>Upload all 4 required log files to view response data</p>
            <p className="text-sm mt-2">
              Required files: receptionLog.txt, ReceptionLog.txt, DecisionLog.txt, BudgetLog.txt
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Response;
