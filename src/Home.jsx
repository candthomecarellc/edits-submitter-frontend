import { useState } from 'react';
import FormPage1 from './FormSubmit/FormPage1';
import FormPage2 from './FormSubmit/FormPage2';

const Home = () => {
  const [page, setPage] = useState(1);
  const timeZone = 'America/New_York';
  const [formData, setFormData] = useState({
    applicantName: '',
    applicationDate: '',
    uscitizenshiporDOB: '',
    uscitizenshiporDOBFile: null,
    usCitizenship: '',
    usCitizenshipFile:  null,
    identityDocument: '',
    identityDocumentFile:  null,
    identityDocumentExtra: '',
    identityDocumentExtraFile:  null,

    ImmigrationstatesIdentity: '',
    ImmigrationstatesIdentityFile:  null,
    ImmigrationStatus: '',
    ImmigrationStatusFile:  null,
    dobIdentity: '',
    dobIdentityFile:  null,
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
            />
          )}
          {page === 2 && (
            <FormPage2
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
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
