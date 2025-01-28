import { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicationDate: '',
    uscitizenshiporDOB: '',
    usCitizenship: '',
    identityDocument: '',

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
};

export default App;
