/* eslint-disable react/prop-types */
import FileUpload from './FileUpload';

const FormPage3 = ({ formData, handleChange, setFormData, updateFormData }) => {
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
              <option value="Written statement from day care center or other childadult care provider">
                Written statement from day care center or other child/adult care
                provider
              </option>
              <option value="Canceled checks or receipts that show your payments">
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
            <span className="">Court Orde</span>
            <FileUpload
              name="courtOrdered"
              defaultFile={formData.courtOrdered || null}
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
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          Proof of health insurance, provide all that apply:
        </p>

        <fieldset className="space-y-4">
          <div className="space-y-4">
            <span className="">
              Proof of current insurance (Insurance policy, Certificate of
              Insurance or Insurance Card)
            </span>
            <FileUpload
              name="healthInsurance.proofOfCurrentHealthInsurance"
              defaultFile={
                formData.healthInsurance.proofOfCurrentHealthInsurance || null
              }
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4 mt-6">
            <span className="">Health Insurance Termination Letter</span>
            <FileUpload
              name="healthInsurance.healthInsuranceTerminationLetter"
              defaultFile={
                formData.healthInsurance.healthInsuranceTerminationLetter ||
                null
              }
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4">
            <span className="">Medicare Card (Red, White and Blue Card)</span>
            <FileUpload
              name="healthInsurance.medicareCard"
              defaultFile={formData.healthInsurance.medicareCard || null}
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4">
            <span className="">Confirmation of Medicare Application</span>
            <FileUpload
              name="healthInsurance.confirmationOfMedicareApplication"
              defaultFile={
                formData.healthInsurance.confirmationOfMedicareApplication ||
                null
              }
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4">
            <span className="">Medicare Award or Denial Letter</span>
            <FileUpload
              name="healthInsurance.medicareAwardorDenialLetter"
              defaultFile={
                formData.healthInsurance.medicareAwardorDenialLetter || null
              }
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
        </fieldset>
      </div>
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          If you have medical bills in the last three months, provide all the
          following (if applicable):
        </p>
        <span className="font-semibold bg-slate-100 px-4 py-2 rounded-md">
          For determination of eligibility for medical expenses from the past
          three months:
        </span>

        <fieldset className="space-y-4 mt-4">
          <div className="space-y-4">
            <span className="">
              Proof of income for the month(s) in which the expense was incurred
            </span>
            <FileUpload
              name="medicalBills.proofofIncomeforMedicalBills"
              defaultFile={
                formData.medicalBills.proofofIncomeforMedicalBills || null
              }
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4 mt-6">
            <span className="">
              Proof of residency/home address for the month(s) in which the
              expense was incurred, if different from the address listed in
              Section A of this application
            </span>
            <FileUpload
              name="medicalBills.proofofhomeAddress"
              defaultFile={formData.medicalBills.proofofhomeAddress || null}
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4">
            <span className="">
              {' '}
              Medical bills for last three months, whether or not you paid them
            </span>
            <FileUpload
              name="medicalBills.medicalBillsforLast3Months"
              defaultFile={
                formData.medicalBills.medicalBillsforLast3Months || null
              }
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
        </fieldset>
      </div>
      {/*  */}
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          Resources (only if you are age 65 or older, certified blind or
          disabled and have no children under age 21 living with you):{' '}
        </p>

        <fieldset className="space-y-4">
          <div className="space-y-4">
            <span className="">
              Bank account statements: checking, savings, retirement (IRA and
              Keogh)
            </span>
            <FileUpload
              name="resources.bankStatements"
              defaultFile={formData.resources.bankStatements || null}
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4 mt-6">
            <span className="">Stocks, bonds, certificates statements</span>
            <FileUpload
              name="resources.stocksBonds"
              defaultFile={formData.resources.stocksBonds || null}
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4">
            <span className="">Copy of Life Insurance policy</span>
            <FileUpload
              name="resources.copyOfLifeInsurancePolicy"
              defaultFile={formData.resources.copyOfLifeInsurancePolicy || null}
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4">
            <span className="">
              Copy of burial trust or fund burial plot deed or funeral agreement
            </span>
            <FileUpload
              name="resources.burialtrust"
              defaultFile={formData.resources.burialtrust || null}
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
          <div className="space-y-4">
            <span className="">Deed for real estate other than residence</span>
            <FileUpload
              name="resources.deedForRealEstate"
              defaultFile={formData.resources.deedForRealEstate || null}
              onFileSelect={(name, file) => {
                updateFormData(name, file);
              }}
            />
          </div>
        </fieldset>
      </div>
      {/* */}
      {/* <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          If you or your spouse are required to pay court ordered support you
          must provide the following:
        </p>
        <fieldset className="space-y-4">
          <div className="space-y-4">
            <span className="">Court Orde</span>
            <FileUpload
              name="courtOrdered"
              defaultFile={formData.courtOrdered || null}
              onFileSelect={(name, file) => {
                setFormData((prev) => ({
                  ...prev,
                  [name]: file,
                }));
              }}
            />
          </div>
        </fieldset>
      </div> */}
      {/*  */}
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          Proof of Student Status for college students if employed:
        </p>
        <fieldset className="space-y-4">
          <div className="space-y-4">
            <select
              name="proofOfstudentStatus"
              value={formData.proofOfstudentStatus}
              className="select select-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="proofOfstudentStatus"
            >
              <option value="">Pick a Document</option>
              <option value="Copy of schedule">Copy of schedule</option>
              <option value="Statement from college or university">
                Statement from college or university
              </option>
              <option value="Other correspondence from college showing student status">
                Other correspondence from college showing student status
              </option>
            </select>
            <FileUpload
              name="proofOfstudentStatusFile"
              defaultFile={formData.proofOfstudentStatusFile || null}
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
