/* eslint-disable react/prop-types */
import FileUpload from './FileUpload';

const FormPage3 = ({ formData, handleChange, setFormData }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          If you pay to have care for your children or an adult in your family
          while you work, provide one of the following:
        </p>
        <fieldset className="space-y-4">
          <div className="space-y-4">
            <select
              name="careForChildrenorAdults"
              value={formData.careForChildrenorAdults}
              className="select select-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="careForChildrenorAdults"
            >
              <option value="">Pick a Document</option>
              <option value="Written statement from day care center or other child/adult care provider">
                Written statement from day care center or other child/adult care
                provider
              </option>
              <option value="I-688B or I-766 Employment Authorization Card*">
                Canceled checks or receipts that show your payments
              </option>
            </select>
            <FileUpload
              name="careForChildrenorAdultsFile"
              defaultFile={formData.careForChildrenorAdultsFile || null}
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
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          If you or your spouse are required to pay court ordered support you
          must provide the following:
        </p>
        <fieldset className="space-y-4">
          <div className="space-y-4">
            <select
              name="courtOrdered"
              value={formData.courtOrdered}
              className="select select-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="courtOrdered"
            >
              <option value="">Pick a Document</option>
              <option value="Court Order">Court Order</option>
            </select>
            <FileUpload
              name="courtOrderedFile"
              defaultFile={formData.courtOrderedFile || null}
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
      {/*  */}
    </div>
  );
};

export default FormPage3;
