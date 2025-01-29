import ScrolltoTop from '../utils/ScrolltoTop';
import FileUpload from './FileUpload';

/* eslint-disable react/prop-types */
const FormPage2 = ({ formData, handleChange, setFormData }) => {
  // scroll to top smoth of page

  return (
    <div className="space-y-4">
      {/* Immigration Status/Identity */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          We need to see ONE of the following documents to prove Immigration
          Status, Identity and your Date of Birth. You must prove all three.
        </p>
        <fieldset className="space-y-4">
          <legend className="font-medium text-gray-700 mb-4">
            Immigration Status/Identity
          </legend>

          <div className="space-y-4">
            <select
              name="ImmigrationstatesIdentity"
              value={formData.ImmigrationstatesIdentity}
              className="select select-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="ImmigrationstatesIdentity"
            >
              <option value="">Pick a Document</option>
              <option value=" I-551 Permanent Resident Card (“Green Card”)*">
                {' '}
                I-551 Permanent Resident Card (“Green Card”)*
              </option>
              <option value="I-688B or I-766 Employment Authorization Card*">
                I-688B or I-766 Employment Authorization Card*
              </option>
            </select>
            <FileUpload
              name="ImmigrationstatesIdentityFile"
              defaultFile={formData.ImmigrationstatesIdentityFile || null}
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

      {/* Immigration Status, but require an additional Identity document */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <fieldset className="space-y-4">
          <legend className="font-medium text-gray-700 mb-4">
            Immigration Status, but require an additional Identity document
          </legend>

          <div className="space-y-4">
            <select
              name="ImmigrationStatus"
              value={formData.ImmigrationStatus}
              className="select select-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="ImmigrationStatus"
            >
              <option value="">Pick a Document</option>
              <option value="I-94 Arrival/Departure Record*">
                I-94 Arrival/Departure Record*
              </option>
              <option value="USCIS Form I-797 Notice of Action">
                USCIS Form I-797 Notice of Action
              </option>
            </select>
            <FileUpload
              name="ImmigrationStatusFile"
              defaultFile={formData.ImmigrationStatusFile || null}
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

      {/* DOB/Identity, but require an additional immigration status document */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <fieldset className="space-y-4">
          <legend className="font-medium text-gray-700 mb-4">
            DOB/Identity, but require an additional immigration status document
          </legend>

          <div className="space-y-4">
            <select
              name="dobIdentity"
              value={formData.dobIdentity}
              className="select select-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="dobIdentity"
            >
              <option value="">Pick a Document</option>
              <option value="Visa">Visa</option>
              <option value="U.S. Passport">U.S. Passport</option>
            </select>
            <FileUpload
              name="dobIdentityFile"
              defaultFile={formData.dobIdentityFile || null}
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

      {/* Home Address: This address must match the home address that you write
          in Section A of the application. The proof must be dated within 6
          months of when you signed the application. */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-900 font-semibold bg-slate-200 px-4 py-2 rounded-md">
          Home Address: This address must match the home address that you write
          in Section A of the application. The proof must be dated within 6
          months of when you signed the application.
        </p>
        <fieldset className="space-y-4">
          <div className="space-y-4">
            <select
              name="homeAddressDocument"
              value={formData.homeAddressDocument}
              className="select select-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
              aria-describedby="homeAddressDocument"
            >
              <option value="">Pick a Document</option>
              <option value="Lease/ letter/ rent receipt with your home address from landlord">
                Lease/ letter/ rent receipt with your home address from landlord
              </option>
              <option value="Utility Bill (gas, electric, phone, cable, fuel or water)">
                Utility Bill (gas, electric, phone, cable, fuel or water)
              </option>
              <option value="Property tax records or mortgage statement">
                Property tax records or mortgage statement
              </option>
              <option value="Driver’s license (if issued in the past 6 months)">
                Driver’s license (if issued in the past 6 months)
              </option>
              <option value="Government ID card with address">
                Government ID card with address
              </option>
              <option value=" Postmarked envelope or post card (cannot use if sent to a P.O. Box)">
                {' '}
                Postmarked envelope or post card (cannot use if sent to a P.O.
                Box)
              </option>
            </select>
            <FileUpload
              name="homeAddressDocumentFile"
              defaultFile={formData.homeAddressDocumentFile || null}
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
      {/* DOB/Identity, but require an additional immigration status document */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="mb-4 text-gray-700  bg-slate-200 px-4 py-2 rounded-md">
          PROOF OF CURRENT INCOME, OR INCOME YOU MIGHT GET IN THE FUTURE SUCH AS
          UNEMPLOYMENT BENEFITS OR A LAWSUIT: You must provide a letter, written
          statement, or copy of check or stubs, from the employer, person or
          agency providing the income. YOU DO NOT NEED TO SHOW US ALL OF THESE
          DOCUMENTS, only the ones that apply to you and the people living with
          you. <br />
          One proof for each type of income you have is required. Provide the
          most recent proof of income before taxes and any other deductions. The
          proof must be dated, include the employee’s name and show gross income
          for the pay period. The proof must be for the last four weeks, whether
          you get paid weekly, bi-weekly, or monthly. It is important that these
          be current.
        </p>
        <fieldset className="space-y-4">
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Wages and Salary
            </legend>
            <div className="space-y-4">
              <select
                name="wagesAndSalary"
                value={formData.wagesAndSalary}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="wagesAndSalary"
              >
                <option value="">Pick a Document</option>
                <option value="Paycheck stubs">Paycheck stubs</option>
                <option value="Letter from employer on company letterhead, signed and dated">
                  Letter from employer on company letterhead, signed and dated
                </option>
                <option value="Business/payroll records">
                  Business/payroll records
                </option>
              </select>
              <FileUpload
                name="wagesAndSalaryFile"
                defaultFile={formData.wagesAndSalaryFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Self-Employment
            </legend>
            <div className="space-y-4">
              <select
                name="selfEmployment"
                value={formData.selfEmployment}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="selfEmployment"
              >
                <option value="">Pick a Document</option>
                <option value="Current signed and dated income tax return and all Schedules">
                  Current signed and dated income tax return and all Schedules
                </option>
                <option value="Records of earnings and expenses/ business records">
                  Records of earnings and expenses/ business records
                </option>
              </select>
              <FileUpload
                name="selfEmploymentFile"
                defaultFile={formData.selfEmploymentFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Unemployment Benefits
            </legend>
            <div className="space-y-4">
              <select
                name="unemploymentBenefits"
                value={formData.unemploymentBenefits}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="unemploymentBenefits"
              >
                <option value="">Pick a Document</option>
                <option value="Award letter/certificate">
                  Award letter/certificate
                </option>
                <option value="Monthly benefit statement from NYS Department of Labor">
                  Monthly benefit statement from NYS Department of Labor
                </option>
                <option value="Printout of recipient’s account information from the NYS Department of Labor’s website (www.labor.ny.gov)">
                  Printout of recipient’s account information from the NYS
                  Department of Labor’s website (www.labor.ny.gov)
                </option>
                <option value="Copy of Direct Payment Card with printout">
                  Copy of Direct Payment Card with printout
                </option>
                <option value="Correspondence from the NYS Department of Labor">
                  Correspondence from the NYS Department of Labor
                </option>
              </select>
              <FileUpload
                name="unemploymentBenefitsFile"
                defaultFile={formData.unemploymentBenefitsFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Private Pensions/Annuities
            </legend>
            <div className="space-y-4">
              <select
                name="privatePensionsAnnuities"
                value={formData.privatePensionsAnnuities}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="privatePensionsAnnuities"
              >
                <option value="">Pick a Document</option>
                <option value="Statement from pension/annuity">
                  Statement from pension/annuity
                </option>
              </select>
              <FileUpload
                name="privatePensionsAnnuitiesFile"
                defaultFile={formData.privatePensionsAnnuitiesFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          {/* Social Security */}
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Social Security
            </legend>
            <div className="space-y-4">
              <select
                name="socialSecurity"
                value={formData.socialSecurity}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="socialSecurity"
              >
                <option value="">Pick a Document</option>
                <option value="Award letter/certificate">
                  Award letter/certificate
                </option>
                <option value="Annual benefit statement">
                  Annual benefit statement
                </option>
                <option value="Correspondence from Social Security Administration">
                  Correspondence from Social Security Administration
                </option>
              </select>
              <FileUpload
                name="socialSecurityFile"
                defaultFile={formData.socialSecurityFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          {/* Workers’ Compensation */}
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Workers’ Compensation
            </legend>
            <div className="space-y-4">
              <select
                name="socialSecurity"
                value={formData.socialSecurity}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="socialSecurity"
              >
                <option value="">Pick a Document</option>
                <option value="Award letter/certificate">
                  Award letter/certificate
                </option>
                <option value="Annual benefit statement">
                  Annual benefit statement
                </option>
                <option value="Correspondence from Social Security Administration">
                  Correspondence from Social Security Administration
                </option>
              </select>
              <FileUpload
                name="socialSecurityFile"
                defaultFile={formData.socialSecurityFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          {/* Child Support/Alimony */}
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Child Support/Alimony
            </legend>
            <div className="space-y-4">
              <select
                name="socialSecurity"
                value={formData.socialSecurity}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="socialSecurity"
              >
                <option value="">Pick a Document</option>
                <option value="Award letter/certificate">
                  Award letter/certificate
                </option>
                <option value="Annual benefit statement">
                  Annual benefit statement
                </option>
                <option value="Correspondence from Social Security Administration">
                  Correspondence from Social Security Administration
                </option>
              </select>
              <FileUpload
                name="socialSecurityFile"
                defaultFile={formData.socialSecurityFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          {/* Veterans’ Benefits */}
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Veterans’ Benefits
            </legend>
            <div className="space-y-4">
              <select
                name="socialSecurity"
                value={formData.socialSecurity}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="socialSecurity"
              >
                <option value="">Pick a Document</option>
                <option value="Award letter/certificate">
                  Award letter/certificate
                </option>
                <option value="Annual benefit statement">
                  Annual benefit statement
                </option>
                <option value="Correspondence from Social Security Administration">
                  Correspondence from Social Security Administration
                </option>
              </select>
              <FileUpload
                name="socialSecurityFile"
                defaultFile={formData.socialSecurityFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          {/* Military Pay */}
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Military Pay
            </legend>
            <div className="space-y-4">
              <select
                name="socialSecurity"
                value={formData.socialSecurity}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="socialSecurity"
              >
                <option value="">Pick a Document</option>
                <option value="Award letter/certificate">
                  Award letter/certificate
                </option>
                <option value="Annual benefit statement">
                  Annual benefit statement
                </option>
                <option value="Correspondence from Social Security Administration">
                  Correspondence from Social Security Administration
                </option>
              </select>
              <FileUpload
                name="socialSecurityFile"
                defaultFile={formData.socialSecurityFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          {/* Income from Rent or Room/Board */}
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
              Income from Rent or Room/Board
            </legend>
            <div className="space-y-4">
              <select
                name="socialSecurity"
                value={formData.socialSecurity}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="socialSecurity"
              >
                <option value="">Pick a Document</option>
                <option value="Award letter/certificate">
                  Award letter/certificate
                </option>
                <option value="Annual benefit statement">
                  Annual benefit statement
                </option>
                <option value="Correspondence from Social Security Administration">
                  Correspondence from Social Security Administration
                </option>
              </select>
              <FileUpload
                name="socialSecurityFile"
                defaultFile={formData.socialSecurityFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
          {/* Interest/Dividends/Royalties */}
          <div className="divider"></div>
          <>
            <legend className="font-medium text-gray-700 mb-4">
            Interest/Dividends/Royalties
            </legend>
            <div className="space-y-4">
              <select
                name="socialSecurity"
                value={formData.socialSecurity}
                className="select select-primary w-full"
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="socialSecurity"
              >
                <option value="">Pick a Document</option>
                <option value="Award letter/certificate">
                  Award letter/certificate
                </option>
                <option value="Annual benefit statement">
                  Annual benefit statement
                </option>
                <option value="Correspondence from Social Security Administration">
                  Correspondence from Social Security Administration
                </option>
              </select>
              <FileUpload
                name="socialSecurityFile"
                defaultFile={formData.socialSecurityFile || null}
                onFileSelect={(name, file) => {
                  setFormData((prev) => ({
                    ...prev,
                    [name]: file,
                  }));
                }}
              />
            </div>
          </>
        </fieldset>
      </div>
      <ScrolltoTop />
    </div>
  );
};

export default FormPage2;
