import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import FormPage1 from './FormSubmit/FormPage1';
import FormPage2 from './FormSubmit/FormPage2';
import FormPage3 from './FormSubmit/FormPage3';
import FormPage4 from './FormSubmit/FormPage4';
import FormPage5 from './FormSubmit/FormPage5';
import FormPage6 from './FormSubmit/FormPage6';
import FormPage7 from './FormSubmit/FormPage7';
import FormPage8 from './FormSubmit/FormPage8';
import FormPage9 from './FormSubmit/FormPage9';
import FormPage10 from './FormSubmit/FormPage10';
import { formSubmitFunction } from './utils/apiCalling';

const MedicaidApplication = () => {
  const [page, setPage] = useState(1);

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
        legalName: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
        birthName: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
        cityOfBirth: '',
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
        isParent: '',
        isApplyingFor: '',
        pregnantDueDate: {
          month: '',
          day: '',
          year: '',
        },
        relationship: '',
        publicHealthCoverage: '',
        publicHealthCoverageidNumber: '',
        ssn: '',
        usCitizenship: '',
        usCitizenshipReceivedImmigrationStatusDate: {
          month: '',
          day: '',
          year: '',
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
    uniqueTiffId: '',
    caseName: {
      firstName: '',
      lastName: '',
    },
    clientNoticeLanguage: '',
    languageRead: '',
    dateAdmitted_SNF: '',
    residence: {
      house: '',
      street: '',
      apt: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
    },
    mailAddress: {
      house: '',
      apt: '',
      city: '',
      state: '',
      zipCode: '',
    },
    secondMail: {
      associateName: '',
      inCareName: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
    },
    languageSpoken: '',
    contactName: '',
    contactPhoneNumber: '',
    caseComposition: '',
    EDC1: '',
    EDC2: '',
    fuelType: '',
    shelterType: '',
    shelterAmount: '',
    waterAmount: '',
    addTY: '',
    addTYAmount: '',
    SSI: {
      DM: '',
      LA: '',
      noDM: '',
      noAll: '',
      buy: '',
    },
    chronicCare: {
      date: '',
      PIA: '',
      CON: '',
      amount: '',
      LOC: '',
    },
    earnedIncome: {
      LN: '',
      CTG: '',
      childIdentifier: '',
      chronicCareIndicator: '',
      EID: '',
      SRC: '',
      PER: '',
      employmentStatus: '',
      gross: '',
      INSUR: '',
      CTSUP: '',
      WKREL: '',
      IRWE: '',
    },
    child_Care: {
      MOYR1: '',
      amount1: '',
      MOYR2: '',
      amount2: '',
      MOYR3: '',
      amount3: '',
    },
    unearned_Income: {
      LN: '',
      CTG: '',
      childIdentifier: '',
      chronicCareIndicator: '',
      incomeSourceCode: '',
      period: '',
      amount: '',
      CD1: '',
      exempt1: '',
      CD2: '',
      exempt2: '',
    },
    resource: {
      LN: '',
      categoricalIndicator: '',
      childIdentifier: '',
      chronicCareIndicator: '',
      unused: '',
      CD: '',
      resValue: '',
      UTXN2_Flag: '',
    },
    householdComposition: {
      submitionType: '',
      line: '',
      name_First: '',
      name_Middle: '',
      name_Last: '',
      birth_date: '',
      sex: '',
      ssn: '',
      ma: '',
      resp_adult: '',
      ethnicH: '',
      ethnicI: '',
      ethnicA: '',
      ethnicB: '',
      ethnicP: '',
      ethnicW: '',
      name_code: '',
      aliasFirst: '',
      aliasMiddle: '',
      aliasLast: '',
      pregnant: '',
      cin: '',
      state_charge_cd: '',
      state_chg_date: '',
      TASA: '',
      EMP: '',
      SSI: '',
      BCS: '',
      relationship_to_applicant: '',
      CIBIC_CC: '',
      CIBIC_CDC: '',
      student_ID: '',
      ACI: '',
      AlienNo: '',
      AlienDOE: '',
      maritalStatus: '',
      educationLevel: '',
      alienEnteredCountry: '',
      PID: '',
      SSN_Validation: '',
      DOH_BirthVerification: '',
      WMS_Cat_CD: '',
      DAI: '',
      NH_Stay: '',
      sub_MAP3044: '',
      sub_DOH5178A: '',
      sub_DOH4495A: '',
      sub_DOH5149: '',
    },
  });
  console.log(formData);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => formSubmitFunction(data),
    onSuccess: (data) => {
      // Handle successful submission
      console.log('Form submitted successfully:', data);
    },
    onError: (error) => {
      // Handle submission error
      console.error('Error submitting form:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
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
      {isLoading &&
        alert(
          'Please wait while we submit your form. Do not refresh the page.'
        )}
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
          {page === 9 && (
            <FormPage9
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              updateFormData={updateFormData}
            />
          )}
          {page === 10 && (
            <FormPage10
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            toggleDatePicker={toggleDatePicker}
            isOpen={isOpen}
            updateFormData={updateFormData}
            />
          )}
          {/* Buttons */}
          {page === 10 && (
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-outline mt-4 w-full"
              >
                Submit
              </button>
            </div>
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
            disabled={page === 10}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicaidApplication;
