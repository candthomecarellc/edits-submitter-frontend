// This is a bitmask for the fields in the general information section
// The bitmask is a number that is used to store the status of the fields
// Each bit represents a field, 0 is for review, 1 is for confirmed
export const GENERAL_INFORMATION_STATUS = {
    personalInformation: {
        lineNumber: 1 << 0,
        legalFirstName: 1 << 1,
        legalMiddleInitial: 1 << 2,
        legalLastName: 1 << 3,
        otherNameType: 1 << 4,
        otherNameFirst: 1 << 5,
        otherNameMiddle: 1 << 6,
        otherNameLast: 1 << 7,
        dateOfBirth: 1 << 8,
        sex: 1 << 9,
        gender: 1 << 10,
        relationshipToApplicant: 1 << 11
    },
    statusInformation: {
        responsibleAdult: 1 << 0,
        veteran: 1 << 1,
        pregnant: 1 << 2,
        pregnantDueDate: 1 << 3,
        maritalStatus: 1 << 4,
        studentId: 1 << 5,
        educationLevel: 1 << 6,
        studentType: 1 << 7
    },
    memberIncome: {
        selfEmployed: 1 << 0,
        changedJob: 1 << 1,
        lastJobDate: 1 << 2,
        employerName: 1 << 3,
        childIdentifier: 1 << 4,
        chronicCareIndicator: 1 << 5,
    },
    ethnicCitizenshipInformation: {
        hispanic: 1 << 0,
        indian: 1 << 1,
        asian: 1 << 2,
        black: 1 << 3,
        pacificIslander: 1 << 4,
        white: 1 << 5,
        aci: 1 << 6,
        alienNumber: 1 << 7,
        alienDateOfEntry: 1 << 8,
        alienDateEnteredCountry: 1 << 9,
        fedChargeCd: 1 << 10,
        fedChargeDate: 1 << 11
    },
    otherInformation: {
        ssn: 1 << 0,
        tasa: 1 << 1,
        emp: 1 << 2,
        ssi: 1 << 3,
        bcs: 1 << 4,
        cbicCc: 1 << 5,
        cbicCdc: 1 << 6,
        pid: 1 << 7
    }
}