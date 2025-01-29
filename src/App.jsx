import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { formatDate } from './utils/date';
import fileCheak from './utils/fileCheak';

const App = () => {
  const timeZone = 'America/New_York';
  const [formData, setFormData] = useState({
    applicantName: '',
    applicationDate: '',
    uscitizenshiporDOB: '',
    uscitizenshiporDOBFile: '',
    usCitizenship: '',
    usCitizenshipFile: '',
    identityDocument: '',
    identityDocumentFile: '',

    ImmigrationstatesIdentity: '',
    ImmigrationStatus: '',
    homeAddressDocument: '',

    wagesAndSalary: '',
    selfEmployment: '',
    unemploymentBenefits: '',
    privatePensionsAnnuities: '',
    socialSecurity: '',
    workersCompensation: '',
    childSupportAlimony: '',
    veteransBenefits: '',
    militaryPay: '',
    incomeFromRent: '',
    interestDividendsRoyalties: '',

    careForChildrenorAdults: '',
    courtOrdered: '',

    healthInsurance: {
      proofOfCurrentHealthInsurance: '',
      healthInsuranceTerminationLetter: '',
      medicareCard: '',
      confirmationOfMedicareApplication: '',
      medicareAwardorDenialLetter: '',
    },
    medicalBills: {
      proofofIncomeforMedicalBills: '',
      proofofhomeAddress: '',
      medicalBillsforLast3Months: '',
    },
    resources: {
      bankStatements: '',
      stocksBonds: '',
      copyOfLifeInsurancePolicy: '',
      burialtrust: '',
      deedforRealEstate: '',
    },
    student: {
      proofOfstudentStatus: '',
    },

    //page 9
    personalInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      primaryPhoneNumber: '',
      primaryPhoneType: '',
      secondaryPhoneNumber: '',
      secondaryPhoneType: '',
      languageSpeak: '',
      languageRead: '',
    },
    homeAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      county: '',
      apt: '',
    },
    mailingAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      apt: '',
    },
    anotherPerson: {
      name: '',
      phoneNumber: '',
      phoneType: '',
      street: '',
      city: '',
      zip: '',
      apt: '',
      permissions: {
        ApplyMedicaidForMe: '',
        disussMyCase: '',
        getNoticesAndCorrespondence: '',
      },
    },
    blind: {
      standardAndLargePrintNotice: '',
      standardAndDataCDAndaudioCDNotice: '',
      standardAndBrailleNotice: '',
      requireAnotherAccommodation: '',
    },
    familyInfo: [
      {
        name: '',
        birthName: '',
        stateOfBirth: '',
        countryOfBirth: '',
        dateOfBirth: {
          month: '',
          day: '',
          year: '',
        },
        sex: '',
        genderIdentity: '',
        isPregnant: '',
        pregnantDueDate: {
          month: '',
          day: '',
          year: '',
        },
        relationship: '',
        publicHealthCoverage: {
          childHealthPlus: '',
          medicaid: '',
          familyHealthPlus: '',
          idNumber: '',
        },
        ssn: '',
        usCitizenship: {
          usCitizen: '',
          immigrantNonCitizen: '',
          receivedImmigrationStatusDate: {
            month: '',
            day: '',
            year: '',
          },
          usNational: '',
        },
        race: '',
        receivedAServiceFromIHS: '',
      },
    ],
    selfEmploymentInfo: '',
    earningFromWork: [
      {
        name: '',
        tyoeOfWork: '',
        howMuchEarned: '',
        howOftenPaid: '',
      },
    ],
    noUnearnedIncome: '',
    unearnedIncome: [
      {
        name: '',
        typeOfIncome: '',
        howMuchEarned: '',
        howOftenPaid: '',
      },
    ],
    noContributions: '',
    contributions: [
      {
        name: '',
        typeOfIncome: '',
        howMuch: '',
        howOftenPaid: '',
      },
    ],
    noOtherIncome: '',
    otherIncome: [
      {
        name: '',
        typeOfIncome: '',
        howMuch: '',
        howOftenPaid: '',
      },
    ],
    applingAdulthaveNoIncome: '',
    explainHowLiving: '',
    applierChangeJob: {
      changeJobin3Month: '',
      lastJobDate: {
        month: '',
        day: '',
        year: '',
      },
      nameofEmployer: '',
    },
    applierStudent: {
      student: '',
      studentType: '',
      nameOfStudent: '',
    },
    payForChildCare: '',
    childCare: [
      {
        childName: '',
        howMuchPaid: '',
        howOftenPaid: '',
      },
    ],
    familyPlanningServiceOnly: '',
    isPayCourtOrdered: {
      payCourtOrdered: '',
      payCourtOrderedAmount: '',
      whoPayCourtOrdered: '',
    },
    applyingHavingMedicare: '',
    applyingHavingCommercialInsurance: {
      commercialInsurance: '',
      nameOfInsured: '',
      personCovered: '',
      costOfPolicy: '',
      endOfCoverage: {
        month: '',
        day: '',
        year: '',
      },
    },
    currentJobInsurance: '',
    monthlyHousingPayment: '',
    payForWater: {
      payForWaterAmount: '',
      howOftenPaid: '',
    },
    freeHousingAsPartofYourPay: '',
    nursingHomeCare: '',
    blindOrDisabledOrChronicallyIll: '',

    prescriptionBill3Month: {
      prescriptionBill: '',
      name: '',
      whichMonth: '',
    },
    prescriptionBillOlder: '',
    moveIntoThisCounty: {
      move: '',
      who: '',
      whichState: '',
      whichCounty: '',
    },
    pendingLawSuit: {
      pending: '',
      who: '',
    },
    workersCompensationCase: {
      workersCompensation: '',
      who: '',
    },
    deceased: {
      deceased: '',
      who: '',
    },
    parentLiveOutside: {
      parentLiveOutside: '',
      fearOfHarm: '',
      childName1: '',
      childName2: '',
      nameOfParent1: '',
      nameOfParent2: '',
      dateOfBirth1: {
        month: '',
        day: '',
        year: '',
      },
      dateOfBirth2: {
        month: '',
        day: '',
        year: '',
      },
      street1: '',
      street2: '',
      city1: '',
      city2: '',
      ssn1: '',
      ssn2: '',
    },
    marriedLivesOutside: {
      marriedLivesOutside: '',
      fearOfHarm: '',
      applyingPerson: '',
      spouseName: '',
      dateOfBirth: {
        month: '',
        day: '',
        year: '',
      },
      street: '',
      city: '',
      ssn: '',
    },
    doWanttoJoinHealthPlan: '',
    healthPlan: [
      {
        firstName: '',
        lastName: '',
        dob: '',
        ssn: '',
        nameOfHealthPlan: '',
        preferred: {
          preferredDoctorOrClinic: '',
          currentProvider: '',
        },
        obGyn: '',
      },
    ],
  });
  console.log(formData);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileData = {
      uscitizenshiporDOBFile: e.target.uscitizenshiporDOBFile.files[0],
    };
    console.log(formData);
    console.log(fileData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Medicaid Application</h1>
      <form onSubmit={handleSubmit} aria-label="Medicaid Application Form">
        {/* Applicant Name */}
        <div className="form-group">
          <label htmlFor="applicantName" className="font-semibold">
            Applicant Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="form-control mb-2 input input-primary"
            id="applicantName"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="applicantNameHelp"
          />
          <small id="applicantNameHelp" className="text-gray-600">
            Enter your full legal name.
          </small>
        </div>

        {/* Application Date */}
        <div className="form-group relative">
          <label htmlFor="applicationDate" className="font-semibold">
            Application Date <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={toggleDatePicker}
            className="input input-border w-full text-left"
            aria-expanded={isOpen}
            aria-controls="datePicker"
          >
            {formData.applicationDate
              ? formatDate(formData.applicationDate)
              : 'Select a date'}
          </button>
          {isOpen && (
            <div
              id="datePicker"
              className="absolute mt-1 bg-white shadow-lg rounded-lg z-50"
              role="dialog"
              aria-modal="true"
              aria-label="Date Picker"
            >
              <DayPicker
                timeZone={timeZone}
                className="react-day-picker"
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

        {/* US Citizenship and DOB */}
        <fieldset className="form-group">
          <legend className="font-semibold">
            US Citizenship and Date of Birth{' '}
            <span className="text-red-500">*</span>
          </legend>
          <div className="flex flex-col gap-2">
            <select
              name="uscitizenshiporDOB"
              value={formData.uscitizenshiporDOB}
              className="select"
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
            <small id="uscitizenshipHelp" className="text-gray-600">
              Select a document that proves your US citizenship and date of
              birth.
            </small>
            <input
              type="file"
              className="file-input"
              name="uscitizenshiporDOBFile"
              id="uscitizenshiporDOBFile"
              accept=".pdf,.tiff,.tif"
              onChange={(e) => fileCheak(e, setFormData)}
              aria-describedby="fileHelp"
            />
            <small id="fileHelp" className="text-gray-600">
              Upload a scanned copy of the selected document (PDF or TIFF
              format).
            </small>
          </div>
        </fieldset>

        {/* US Citizenship */}
        <fieldset className="form-group">
          <legend className="font-semibold">
            US Citizenship <span className="text-red-500">*</span>
          </legend>
          <div className="flex flex-col gap-2">
            <select
              name="usCitizenship"
              value={formData.usCitizenship}
              className="select"
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
            <small id="usCitizenshipHelp" className="text-gray-600">
              Select a document that proves your US citizenship.
            </small>
            <input
              type="file"
              className="file-input"
              name="usCitizenshipFile"
              id="usCitizenshipFile"
              accept=".pdf,.tiff,.tif"
              onChange={(e) => fileCheak(e, setFormData)}
              aria-describedby="fileHelp"
            />
          </div>
        </fieldset>

        {/* Identity Document */}
        <fieldset className="form-group">
          <legend className="font-semibold">
            Identity Document <span className="text-red-500">*</span>
          </legend>
          <div className="flex flex-col gap-2">
            <select
              name="identityDocument"
              value={formData.identityDocument}
              className="select"
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
            <small id="identityHelp" className="text-gray-600">
              Select a document that proves your identity.
            </small>
            <input
              type="file"
              className="file-input"
              name="identityDocumentFile"
              id="identityDocumentFile"
              accept=".pdf,.tiff,.tif"
              onChange={(e) => fileCheak(e, setFormData)}
              aria-describedby="fileHelp"
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
