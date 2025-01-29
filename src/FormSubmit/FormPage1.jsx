/* eslint-disable react/prop-types */
import { DayPicker } from 'react-day-picker';
import { formatDate } from '../utils/date';
import ScrolltoTop from '../utils/ScrolltoTop';
import FileUpload from './FileUpload';

const FormPage1 = ({
  formData,
  handleChange,
  toggleDatePicker,
  isOpen,
  timeZone,
  setFormData,
}) => {
  return (
    <div className="space-y-4">
      {/* Applicant Name Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="form-group space-y-2">
          <label
            htmlFor="applicantName"
            className="block text-sm font-medium text-gray-700"
          >
            Applicant Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="form-control block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Enter your full legal name"
          />
          <small className="text-gray-500 text-sm">
            Enter your full legal name as it appears on official documents.
          </small>
        </div>
      </div>

      {/* Application Date Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="form-group relative space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Application Date <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={toggleDatePicker}
            className="w-full px-4 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {formData.applicationDate
              ? formatDate(formData.applicationDate)
              : 'Select a date'}
          </button>
          {isOpen && (
            <div className="absolute mt-1 bg-white shadow-lg rounded-lg z-50 border">
              <DayPicker
                className="react-day-picker"
                timeZone={timeZone}
                mode="single"
                selected={formData.applicationDate}
                onSelect={(selectedDate) => {
                  setFormData({
                    ...formData,
                    applicationDate: selectedDate,
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

      {/* US Citizenship and DOB Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          You need to provide proof of Identity, U.S. Citizenship and/or
          Immigration Status and Date of Birth.
        </p>
        <fieldset className="space-y-4">
          <legend className="font-medium text-gray-700 mb-4">
            You can provide ONE of the following documents to prove both U.S.
            Citizenship, Identity and your Date of Birth:
          </legend>

          <div className="space-y-4">
            <select
              name="uscitizenshiporDOB"
              value={formData.uscitizenshiporDOB}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="uscitizenshipHelp"
            >
              <option value="">Pick a Document</option>
              <option value="U.S. passport/card">U.S. passport/card</option>
              <option value="Certificate of Naturalization (DHS Forms N-550 or N-570)">
                Certificate of Naturalization (DHS Forms N-550 or N-570)
              </option>
              <option value="Certificate of U.S Citizenship (DHS Forms N-560 or N-561)">
                Certificate of U.S Citizenship (DHS Forms N-560 or N-561)
              </option>
              <option value="NYS Enhanced Driver’s License (EDL)">
                NYS Enhanced Driver’s License (EDL).
              </option>
              <option value="Native American Tribal Document issued by a Federally Recognized Tribe">
                Native American Tribal Document issued by a Federally Recognized
                Tribe
              </option>
            </select>
            <small id="uscitizenshipHelp" className="text-gray-500 text-sm">
              Select a document that proves your US citizenship and date of
              birth.
            </small>

            <FileUpload
              name="uscitizenshiporDOBFile"
              defaultFile={formData.uscitizenshiporDOBFile || null}
              onFileSelect={(name, file) => {
                setFormData((prev) => ({
                  ...prev,
                  [name]: file,
                }));
              }}
            />
          </div>
          <p className="mb-4 text-gray-800 bg-slate-200 px-4 py-2 rounded-md">
            When none of the above documents are available, ONE document from
            the U.S. Citizenship list and ONE from the Identity list may be used
            to prove your citizenship and /or identity.
          </p>
        </fieldset>
      </div>

      {/* US Citizenship Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md mb-2">
          Documents with * next to it also show date of birth
        </p>
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium text-gray-900 mb-4">
            US Citizenship
          </legend>

          <div className="space-y-4">
            <select
              name="usCitizenship"
              value={formData.usCitizenship}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="usCitizenshipHelp"
            >
              <option value="">Pick a Document</option>
              <option value="U.S. Birth Certificate*">
                U.S. Birth Certificate*
              </option>
              <option value="Certification of Birth issued by Department of State (Forms FS-545 or DS-1350)*">
                Certification of Birth issued by Department of State (Forms
                FS-545 or DS-1350)*
              </option>
              <option value="Report of Birth Abroad (FS-240)">
                Report of Birth Abroad (FS-240)
              </option>
              <option value="U.S. National ID card (Form I-197 or I-179)">
                U.S. National ID card (Form I-197 or I-179)
              </option>
              <option value="Religious/School Records*">
                Religious/School Records*
              </option>
              <option value="Military record of service showing U.S. place of birth">
                Military record of service showing U.S. place of birth
              </option>
              <option value="Final adoption decree">
                Final adoption decree
              </option>
              <option value="Evidence of qualifying for U.S. citizenship under the Child Citizenship Act of 2000">
                Evidence of qualifying for U.S. citizenship under the Child
                Citizenship Act of 2000
              </option>
            </select>
            <small id="usCitizenshipHelp" className="text-gray-500 text-sm">
              Select a document that proves your US citizenship.
            </small>

            <FileUpload
              name="usCitizenshipFile"
              defaultFile={formData.usCitizenshipFile || null}
              onFileSelect={(name, file) => {
                setFormData((prev) => ({
                  ...prev,
                  [name]: file,
                }));
              }}
            />
          </div>
        </fieldset>
        <div className="divider"></div>
        {/* Identity Document Section */}
        <fieldset className="space-y-4 mt-8">
          <legend className="text-lg font-medium text-gray-900 mb-4">
            Identity Document
          </legend>

          <div className="space-y-4 mb-10">
            <select
              name="identityDocument"
              value={formData.identityDocument}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="identityHelp"
            >
              <option value="">Pick a Document</option>
              <option value="State Driver’s license or ID card with photo*">
                State Driver’s license or ID card with photo*
              </option>
              <option value="ID card issued by a federal, state, or local government agency">
                ID card issued by a federal, state, or local government agency
              </option>
              <option value="U.S. Military card or draft record or U.S Coast Guard Merchant Mariner Card">
                U.S. Military card or draft record or U.S Coast Guard Merchant
                Mariner Card
              </option>
              <option value="School ID card with a photo (may also show date of birth)">
                School ID card with a photo (may also show date of birth)
              </option>
              <option value="Certificate of Degree of Indian blood or other American Indian/Alaska Native tribal document with photo">
                Certificate of Degree of Indian blood or other American
                Indian/Alaska Native tribal document with photo
              </option>
              <option value="Verified School, Nursery or Daycare records (for children under 18) (may also show date of birth)">
                Verified School, Nursery or Daycare records (for children under
                18) (may also show date of birth)
              </option>
              <option value="Clinic, Doctor or Hospital records (for children under 18)*">
                Clinic, Doctor or Hospital records (for children under 18)*
              </option>
            </select>
            <small id="identityHelp" className="text-gray-500 text-sm">
              Select a document that proves your identity.
            </small>

            <FileUpload
              name="identityDocumentFile"
              defaultFile={formData.identityDocumentFile || null}
              onFileSelect={(name, file) => {
                setFormData((prev) => ({
                  ...prev,
                  [name]: file,
                }));
              }}
            />
          </div>
          <div className="divider"></div>
          <div>
            <p className="mb-4 text-gray-800 bg-slate-200 px-4 py-2 rounded-md">
              If you do not have one of the documents that show your date of
              birth, you must also submit one of the following items
            </p>
            <select
              name="identityDocumentExtra"
              value={formData.identityDocumentExtra}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="identityHelp"
            >
              <option value="">Pick a Document</option>
              <option value="Marriage certificate">Marriage certificate</option>
              <option value="NYS Benefit Identification Card">
                NYS Benefit Identification Card
              </option>
            </select>
            <FileUpload
              name="identityDocumentExtraFile"
              defaultFile={formData.identityDocumentExtraFile || null}
              onFileSelect={(name, file) => {
                setFormData((prev) => ({
                  ...prev,
                  [name]: file,
                }));
              }}
            />
          </div>
        </fieldset>
      </div>
      <ScrolltoTop />
    </div>
  );
};

export default FormPage1;
