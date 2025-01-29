import PropTypes from 'prop-types';
import { useState } from 'react';

const FileUpload = ({ name, onFileSelect, defaultFile, accept = '.pdf' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(defaultFile);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    if (!file) return false;

    const validTypes = ['application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload only PDF');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    setError('');
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(name, file);
    }
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mt-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Document
      </label>
      <div
        className={`flex justify-center px-2 pt-1 pb-2 border-2 ${
          dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        } ${
          error ? 'border-red-500' : ''
        } border-dashed rounded-md transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          {selectedFile ? (
            <div className="text-sm">
              <p className="text-gray-700">Selected file:</p>
              <p className="font-medium text-gray-900">{selectedFile.name}</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  onFileSelect(name, null);
                }}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove file
              </button>
            </div>
          ) : (
            <>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    name={name}
                    accept={accept}
                    onChange={handleChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF up to 10MB</p>
            </>
          )}
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  accept: PropTypes.string,
  defaultFile: PropTypes.object,
};

export default FileUpload;
