import { useState } from 'react';
import FormPage1 from './FormSubmit/FormPage1';
import FormPage2 from './FormSubmit/FormPage2';
import FormPage3 from './FormSubmit/FormPage3';
import FormPage4 from './FormSubmit/FormPage4';
import FormPage5 from './FormSubmit/FormPage5';
import FormPage6 from './FormSubmit/FormPage6';
import FormPage7 from './FormSubmit/FormPage7';
import FormPage8 from './FormSubmit/FormPage8';

const Home = () => {
  const [page, setPage] = useState(7);
  const timeZone = 'America/New_York';
  const [formData, setFormData] = useState({
    applicantName: '',
    applicationDate: '',
    uscitizenshiporDOB: '',
    uscitizenshiporDOBFile: null,
    usCitizenship: '',
    usCitizenshipFile: null,
    identityDocument: '',
    identityDocumentFile: null,
    identityDocumentExtra: '',
    identityDocumentExtraFile: null,

    ImmigrationstatesIdentity: '',
    ImmigrationstatesIdentityFile: null,
    ImmigrationStatus: '',
    ImmigrationStatusFile: null,
    dobIdentity: '',
    dobIdentityFile: null,
    homeAddressDocument: '',
    homeAddressDocumentFile: null,

    wagesAndSalary: '',
    wagesAndSalaryFile: null,
    selfEmployment: '',
    selfEmploymentFile: null,
    unemploymentBenefits: '',
    unemploymentBenefitsFile: null,
    privatePensionsAnnuities: '',
    privatePensionsAnnuitiesFile: null,
    socialSecurity: '',
    socialSecurityFile: null,
    workersCompensation: '',
    workersCompensationFile: null,
    childSupportAlimony: '',
    childSupportAlimonyFile: null,
    veteransBenefits: '',
    veteransBenefitsFile: null,
    militaryPay: '',
    militaryPayFile: null,
    incomeFromRent: '',
    incomeFromRentFile: null,
    interestDividendsRoyalties: '',
    interestDividendsRoyaltiesFile: null,

    careForChildrenorAdults: '',
    careForChildrenorAdultsFile: null,
    courtOrdered: null,

    healthInsurance: {
      proofOfCurrentHealthInsurance: null,
      healthInsuranceTerminationLetter: null,
      medicareCard: null,
      confirmationOfMedicareApplication: null,
      medicareAwardorDenialLetter: null,
    },
    medicalBills: {
      proofofIncomeforMedicalBills: null,
      proofofhomeAddress: null,
      medicalBillsforLast3Months: null,
    },
    resources: {
      bankStatements: '',
      stocksBonds: '',
      copyOfLifeInsurancePolicy: '',
      burialtrust: '',
      deedForRealEstate: '',
    },

    proofOfstudentStatus: '',
    proofOfstudentStatusFile: null,

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
    homeLess: false,
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
        ApplyMedicaidForMe: false,
        disussMyCase: false,
        getNoticesAndCorrespondence: false,
      },
    },
    blindNoticeType: '',
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
    householdVeteran: '',
    veteranName: '',
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
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested properties for specific cases
    if (name.includes('.')) {
      const keys = name.split('.'); // Split by dot to get nested keys
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        let nestedObj = updatedData;

        // Traverse to the last key's parent
        for (let i = 0; i < keys.length - 1; i++) {
          if (!nestedObj[keys[i]]) nestedObj[keys[i]] = {}; // Ensure intermediate object exists
          nestedObj = nestedObj[keys[i]];
        }

        // Set the value at the final key
        nestedObj[keys[keys.length - 1]] =
          type === 'checkbox' ? checked : value;
        return updatedData;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const updateFormData = (name, value) => {
    setFormData((prevData) => {
      const keys = name.split('.');
      if (keys.length === 1) {
        // For flat properties
        return { ...prevData, [name]: value };
      }

      // For nested properties
      const updatedData = { ...prevData };
      let nestedObj = updatedData;

      // Traverse to the last key's parent
      for (let i = 0; i < keys.length - 1; i++) {
        if (!nestedObj[keys[i]]) nestedObj[keys[i]] = {};
        nestedObj = nestedObj[keys[i]];
      }

      // Set the value at the final key
      nestedObj[keys[keys.length - 1]] = value;

      return updatedData;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Medicaid Application
          </h1>
          <p className="text-gray-600">
            Please fill out all required fields marked with *
          </p>
        </div>
        {/* <div className="flex justify-between my-4 items-center">
          <button
            type="button"
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 1}
            className="btn btn-soft"
          >
            Previous
          </button>
          {page}
          <button
            type="button"
            onClick={() => setPage((prevPage) => prevPage + 1)}
            disabled={page === 9}
            className="btn btn-primary"
          >
            Next
          </button>
        </div> */}
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          aria-label="Medicaid Application Form"
        >
          {page === 1 && (
            <FormPage1
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              toggleDatePicker={toggleDatePicker}
              isOpen={isOpen}
              timeZone={timeZone}
              updateFormData={updateFormData}
            />
          )}
          {page === 2 && (
            <FormPage2
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateFormData={updateFormData}
            />
          )}
          {page === 3 && (
            <FormPage3
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateFormData={updateFormData}
            />
          )}
          {page === 4 && (
            <FormPage4
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateFormData={updateFormData}
            />
          )}
          {page === 5 && (
            <FormPage5
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateFormData={updateFormData}
            />
          )}
          {page === 6 && (
            <FormPage6
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateFormData={updateFormData}
            />
          )}
          {page === 7 && (
            <FormPage7
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateFormData={updateFormData}
            />
          )}
          {page === 8 && (
            <FormPage8
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateFormData={updateFormData}
            />
          )}
        </form>
        {/* Buttons */}
        <div className="flex justify-between mt-4 items-center">
          <button
            type="button"
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 1}
            className="btn btn-soft"
          >
            Previous
          </button>
          {page}
          <button
            type="button"
            onClick={() => setPage((prevPage) => prevPage + 1)}
            disabled={page === 9}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
