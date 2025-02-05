/* eslint-disable react/prop-types */
const FormPage4 = ({
  formData,
  handleChange,
  //  setFormData, updateFormData
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow-sm rounded-lg p-6 flex justify-between items-center">
        <div className="form-group space-y-2">
          <label
            htmlFor="applicantName"
            className="block text-sm font-medium text-gray-700"
          >
            Legal First Name
          </label>
          <input
            type="text"
            className="input input-primary"
            id="personalInfo.firstName"
            name="personalInfo.firstName"
            value={formData.personalInfo.firstName}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Enter your first legal name"
          />
        </div>
        <div className="form-group space-y-2">
          <label
            htmlFor="applicantName"
            className="block text-sm font-medium text-gray-700"
          >
            Middle Initial <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input input-primary"
            id="personalInfo.middleName"
            name="personalInfo.middleName"
            value={formData.personalInfo.middleName}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Enter your middle name"
          />
        </div>
        <div className="form-group space-y-2">
          <label
            htmlFor="applicantName"
            className="block text-sm font-medium text-gray-700"
          >
            Legal Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input input-primary"
            id="personalInfo.lastName"
            name="personalInfo.lastName"
            value={formData.personalInfo.lastName}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6 flex justify-between items-center">
        <div className="form-group space-y-2">
          <label
            htmlFor="applicantName"
            className="block text-sm font-medium text-gray-700"
          >
            Primary Phone # <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input input-primary w-full"
            id="personalInfo.primaryPhoneNumber"
            name="personalInfo.primaryPhoneNumber"
            value={formData.personalInfo.primaryPhoneNumber}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Type <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="personalInfo.primaryPhoneType"
                value="Home"
                className="radio radio-primary"
                checked={formData.personalInfo.primaryPhoneType === 'Home'}
                onChange={handleChange}
              />
              <span className="ml-2">Home</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="personalInfo.primaryPhoneType"
                value="Work"
                className="radio radio-primary"
                checked={formData.personalInfo.primaryPhoneType === 'Work'}
                onChange={handleChange}
              />
              <span className="ml-2">Work</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="personalInfo.primaryPhoneType"
                value="Cell"
                className="radio radio-primary"
                checked={formData.personalInfo.primaryPhoneType === 'Cell'}
                onChange={handleChange}
              />
              <span className="ml-2">Cell</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="personalInfo.primaryPhoneType"
                value="Other"
                className="radio radio-primary"
                checked={formData.personalInfo.primaryPhoneType === 'Other'}
                onChange={handleChange}
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6 flex justify-between items-center">
        <div className="form-group space-y-2">
          <label
            htmlFor="applicantName"
            className="block text-sm font-medium text-gray-700"
          >
            Another Phone # <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input input-primary w-full"
            id="personalInfo.secondaryPhoneNumber"
            name="personalInfo.secondaryPhoneNumber"
            value={formData.personalInfo.secondaryPhoneNumber}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Type <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="personalInfo.secondaryPhoneType"
                value="Home"
                className="radio radio-primary"
                checked={formData.personalInfo.secondaryPhoneType === 'Home'}
                onChange={handleChange}
              />
              <span className="ml-2">Home</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="personalInfo.secondaryPhoneType"
                value="Work"
                className="radio radio-primary"
                checked={formData.personalInfo.secondaryPhoneType === 'Work'}
                onChange={handleChange}
              />
              <span className="ml-2">Work</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="personalInfo.secondaryPhoneType"
                value="Cell"
                className="radio radio-primary"
                checked={formData.personalInfo.secondaryPhoneType === 'Cell'}
                onChange={handleChange}
              />
              <span className="ml-2">Cell</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="personalInfo.secondaryPhoneType"
                value="Other"
                className="radio radio-primary"
                checked={formData.personalInfo.secondaryPhoneType === 'Other'}
                onChange={handleChange}
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6 flex justify-between items-center">
        <div className="form-group space-y-2">
          <label
            htmlFor="applicantName"
            className="block text-sm font-medium text-gray-700"
          >
            What Language Do You:
          </label>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            className="input input-primary w-full"
            id="personalInfo.languageSpeak"
            name="personalInfo.languageSpeak"
            value={formData.personalInfo.languageSpeak}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Speak"
          />
          <input
            type="text"
            className="input input-primary w-full"
            id="personalInfo.languageRead"
            name="personalInfo.languageRead"
            value={formData.personalInfo.languageRead}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Read"
          />
        </div>
      </div>
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="text-gray-700 text-sm bg-slate-200 p-2 rounded-lg mb-4">
          HOME ADDRESS of the persons applying for health insurance
        </p>
        <label htmlFor="homeLess" className="flex items-center mb-4">
          <input
            type="checkbox"
            id="homeLess"
            name="homeLess"
            value={formData.homeLess}
            onChange={handleChange}
            className="checkbox"
          />
          <span className="ml-2">Check if you are homeless</span>
        </label>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="homeAddress.street"
                name="homeAddress.street"
                value={formData.homeAddress.street}
                onChange={handleChange}
                placeholder="Street address"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="homeAddress.city"
                name="homeAddress.city"
                value={formData.homeAddress.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="homeAddress.state"
                name="homeAddress.state"
                value={formData.homeAddress.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="homeAddress.apt"
                name="homeAddress.apt"
                value={formData.homeAddress.apt}
                onChange={handleChange}
                placeholder="APT #"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="homeAddress.zip"
                name="homeAddress.zip"
                value={formData.homeAddress.zip}
                onChange={handleChange}
                placeholder="Zip"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="homeAddress.county"
                name="homeAddress.county"
                value={formData.homeAddress.county}
                onChange={handleChange}
                placeholder="County"
              />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="text-gray-700 text-sm bg-slate-200 p-2 rounded-lg mb-4">
          MAILING ADDRESS of the persons applying for health insurance if
          different from above
        </p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="mailingAddress.street"
                name="mailingAddress.street"
                value={formData.mailingAddress.street}
                onChange={handleChange}
                placeholder="Street address"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="mailingAddress.city"
                name="mailingAddress.city"
                value={formData.mailingAddress.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="mailingAddress.state"
                name="mailingAddress.state"
                value={formData.mailingAddress.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="mailingAddress.apt"
                name="mailingAddress.apt"
                value={formData.mailingAddress.apt}
                onChange={handleChange}
                placeholder="APT #"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="mailingAddress.zip"
                name="mailingAddress.zip"
                value={formData.mailingAddress.zip}
                onChange={handleChange}
                placeholder="Zip"
              />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="text-gray-700 text-sm bg-slate-200 p-2 rounded-lg mb-4">
          OPTIONAL: If there is another person you would like to receive your
          Medicaid notices, please provide this person’s contact information.
        </p>

        {/* Checkboxes for Contact Person Permissions */}
        <div className="space-y-3 mb-6">
          <p className="text-gray-700 font-medium">
            I want this contact person to:
          </p>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="anotherPerson.permissions.ApplyMedicaidForMe"
              value={formData.anotherPerson.permissions.ApplyMedicaidForMe}
              onChange={handleChange}
              className="checkbox"
            />
            <span className="ml-2">Apply for and/or renew Medicaid for me</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="anotherPerson.permissions.disussMyCase"
              value={formData.anotherPerson.permissions.disussMyCase}
              onChange={handleChange}
              className="checkbox"
            />
            <span className="ml-2">
              Discuss my Medicaid application or case, if needed
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="anotherPerson.permissions.getNoticesAndCorrespondence"
              value={
                formData.anotherPerson.permissions.getNoticesAndCorrespondence
              }
              onChange={handleChange}
              className="checkbox"
            />
            <span className="ml-2">Get notices and correspondence</span>
          </label>
        </div>

        {/* Contact Person Details */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="anotherPerson.Name"
                name="anotherPerson.Name"
                value={formData.anotherPerson.Name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="anotherPerson.street"
                name="anotherPerson.street"
                value={formData.anotherPerson.street}
                onChange={handleChange}
                placeholder="Street address"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="anotherPerson.city"
                name="anotherPerson.city"
                value={formData.anotherPerson.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="anotherPerson.state"
                name="anotherPerson.state"
                value={formData.anotherPerson.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="anotherPerson.apt"
                name="anotherPerson.apt"
                value={formData.anotherPerson.apt}
                onChange={handleChange}
                placeholder="APT #"
              />
            </div>
            <div className="form-group space-y-2">
              <input
                type="text"
                className="input input-primary"
                id="anotherPerson.zip"
                name="anotherPerson.zip"
                value={formData.anotherPerson.zip}
                onChange={handleChange}
                placeholder="Zip"
              />
            </div>
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="space-y-6 mt-6 flex justify-between items-center">
          <div className="form-group space-y-2">
            <label
              htmlFor="anotherPerson.phoneHome"
              className="block text-sm font-medium text-gray-700"
            >
              Phone #
            </label>
            <input
              type="text"
              className="input input-primary w-full"
              id="anotherPerson.phoneHome"
              name="anotherPerson.phoneHome"
              value={formData.anotherPerson.phoneHome}
              onChange={handleChange}
              placeholder="Enter home phone number"
            />
          </div>
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="anotherPerson.phoneHomeType"
                  value="Home"
                  className="radio radio-primary"
                  checked={formData.anotherPerson.phoneHomeType === 'Home'}
                  onChange={handleChange}
                />
                <span className="ml-2">Home</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="anotherPerson.phoneHomeType"
                  value="Work"
                  className="radio radio-primary"
                  checked={formData.anotherPerson.phoneHomeType === 'Work'}
                  onChange={handleChange}
                />
                <span className="ml-2">Work</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="anotherPerson.phoneHomeType"
                  value="Cell"
                  className="radio radio-primary"
                  checked={formData.anotherPerson.phoneHomeType === 'Cell'}
                  onChange={handleChange}
                />
                <span className="ml-2">Cell</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="anotherPerson.phoneHomeType"
                  value="Other"
                  className="radio radio-primary"
                  checked={formData.anotherPerson.phoneHomeType === 'Other'}
                  onChange={handleChange}
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <p className="text-gray-700 text-sm bg-slate-200 p-2 rounded-lg mb-4">
          Important Notice: Options Available to Applicants Who May Be Blind or
          Visually Impaired
        </p>

        {/* Notice Options */}
        {/* Notice Options */}
        <div className="space-y-4">
          <p className="text-gray-700 font-medium">
            If you are blind or visually impaired and require information in an
            alternative format, check the type of mail you want to receive from
            us. Please return this form with your application.
          </p>

          {/* Standard and Large Print Notice */}
          <label className="flex items-center">
            <input
              type="radio"
              name="blindNoticeType"
              value="Standard notice and large print notice"
              checked={
                formData.blindNoticeType ===
                'Standard notice and large print notice'
              }
              onChange={handleChange}
              className="radio"
            />
            <span className="ml-2">Standard notice and large print notice</span>
          </label>

          {/* Standard and Data CD Notice */}
          <label className="flex items-center">
            <input
              type="radio"
              name="blindNoticeType"
              value="Standard notice and data C D notice Standard notice and audio C D notice"
              checked={
                formData.blindNoticeType ===
                'Standard notice and data C D notice Standard notice and audio C D notice'
              }
              onChange={handleChange}
              className="radio"
            />
            <span className="ml-2">
              Standard notice and data CD notice Standard notice and audio CD
              notice
            </span>
          </label>

          {/* Standard and Audio CD Notice */}
          <label className="flex items-center">
            <input
              type="radio"
              name="blindNoticeType"
              value="Standard notice and braille notice, if you assert that none of the other alternative formats will be equally effective for you"
              checked={
                formData.blindNoticeType ===
                'Standard notice and braille notice, if you assert that none of the other alternative formats will be equally effective for you'
              }
              onChange={handleChange}
              className="radio"
            />
            <span className="ml-2">
              Standard notice and braille notice, if you assert that none of the
              other alternative formats will be equally effective for you
            </span>
          </label>

          {/* Standard and Braille Notice */}
          <label className="flex items-center">
            <input
              type="radio"
              name="blindNoticeType"
              value="If you require another accommodation, please contact your social services district."
              checked={
                formData.blindNoticeType ===
                'If you require another accommodation, please contact your social services district.'
              }
              onChange={handleChange}
              className="radio"
            />
            <span className="ml-2">
              If you require another accommodation, please contact your social
              services district.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormPage4;
