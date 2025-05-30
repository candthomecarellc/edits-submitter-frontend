import { DayPicker } from 'react-day-picker';
import { formatDate } from '../utils/date';
import FileUpload from './FileUpload';

const FormPage10 = ({
  formData,
  handleChange,
  toggleDatePicker,
  isOpen,
  setFormData,
}) => {
  return (
    <div className="space-y-4">
      {/* Provider's Patient ID Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="form-group space-y-2">
          <label
            htmlFor="providerPatientId"
            className="block text-sm font-medium text-gray-700"
          >
            Provider's Patient ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="form-control block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            id="providerPatientId"
            name="providerPatientId"
            value={formData.providerPatientId}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Enter your provider's patient ID"
          />
          <small className="text-gray-500 text-sm">
            Enter patient ID as it appears on your provider's records.
          </small>
        </div>
      </div>
      {/* Unique TIFF ID Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="form-group space-y-2">
          <label
            htmlFor="uniqueTIFFID"
            className="block text-sm font-medium text-gray-700"
          >
          Unique TIFF ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="form-control block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            id="uniqueTIFFID"
            name="uniqueTIFFID"
            value={formData.uniqueTIFFID}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Enter your unique TIFF ID"
          />
          <small className="text-gray-500 text-sm">
            Enter your unique TIFF ID.
          </small>
        </div>
      </div>

      {/* Signature Date Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="form-group relative space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Signature Date <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={toggleDatePicker}
            className="w-full px-4 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {formData.signatureDate
              ? formatDate(formData.signatureDate)
              : 'Select a date'}
          </button>
          {isOpen && (
            <div className="absolute mt-1 bg-white shadow-lg rounded-lg z-50 border">
              <DayPicker
                className="react-day-picker"
                mode="single"
                selected={formData.signatureDate}
                onSelect={(selectedDate) => {
                  setFormData({
                    ...formData,
                    signatureDate: formatDate(selectedDate),
                  });
                  toggleDatePicker();
                }}
                onDayKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    toggleDatePicker();
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Case Name Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div className="form-group space-y-2">
            <label
              htmlFor="caseName.firstName"
              className="block text-sm font-medium text-gray-700"
            >
            Legal First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="form-control block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              id="caseName.firstName"
              name="caseName.firstName"
              value={formData.caseName?.firstName || ''}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Enter your first legal name"
            />
          </div>
          <div className="form-group space-y-2">
            <label
              htmlFor="caseName.lastName"
              className="block text-sm font-medium text-gray-700"
            >
            Legal Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="form-control block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              id="caseName.lastName"
              name="caseName.lastName"
              value={formData.caseName?.lastName || ''}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Enter your last legal name"
            />
          </div>
        </div>
        <small className="text-gray-500 text-sm">
          Case name should be the name of the head of the household.
        </small>
      </div>

      {/* Client Notice Language Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="form-group space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Client Notice Language <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="clientNoticeLanguage"
                value="english"
                checked={formData.clientNoticeLanguage === 'english'}
                onChange={handleChange}
                className="radio radio-primary"
              />
              <span className="ml-2">English</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="clientNoticeLanguage"
                value="spanish"
                checked={formData.clientNoticeLanguage === 'spanish'}
                onChange={handleChange}
                className="radio radio-primary"
              />
              <span className="ml-2">Spanish</span>
            </label>
          </div>
        </div>
      </div>

      {/* Fuel Type Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="form-group space-y-2">
          <label
            htmlFor="fuelType"
            className="block text-sm font-medium text-gray-700"
          >
            Fuel Type <span className="text-red-500">*</span>
          </label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType || '0'}
            onChange={handleChange}
            className="form-control block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
          >
            <option value="0">Heat Included in Shelter Cost</option>
            <option value="1">Natural Gas</option>
            <option value="2">Oil</option>
            <option value="3">Electric</option>
            <option value="4">Coal</option>
            <option value="5">Other Fuel</option>
          </select>
          <small className="text-gray-500 text-sm">
            Select the primary fuel type used for heating your home.
          </small>
        </div>
      </div>

      {/* Shelter Type Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="form-group space-y-2">
          <label
            htmlFor="shelterType"
            className="block text-sm font-medium text-gray-700"
          >
            Shelter Type <span className="text-red-500">*</span>
          </label>
          <select
            id="shelterType"
            name="shelterType"
            value={formData.shelterType || '0'}
            onChange={handleChange}
            className="form-control block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
            aria-required="true"
          >
            <option value="01">Rent</option>
            <option value="02">Rent Public</option>
            <option value="03">Own Home</option>
            <option value="04">Room and Board</option>
          </select>
          <small className="text-gray-500 text-sm">
            Select the type of shelter you are applying for.
          </small>
        </div>
      </div>
    </div>
  );
};  

export default FormPage10; 