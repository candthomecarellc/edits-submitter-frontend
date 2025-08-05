// This is a bitmask for the fields in the personal details section
// The bitmask is a number that is used to store the status of the fields
// Each bit represents a field, 0 is for review, 1 is for confirmed
export const APPLICANT_INFORMATION_STATUS = {
    personalDetails: {
        legalFirstName: 1 << 0,     // 00000001 (1)
        legalMiddleInitial: 1 << 1, // 00000010 (2)
        legalLastName: 1 << 2,      // 00000100 (4)
        email: 1 << 3,              // 00001000 (8)
        primaryPhone: 1 << 4,       // 00010000 (16)
        primaryPhoneType: 1 << 5,   // 00100000 (32)
        anotherPhone: 1 << 6,       // 01000000 (64)
        anotherPhoneType: 1 << 7,   // 10000000 (128)
    },
    homeAddress: {
        homeless: 1 << 0,
        houseNumber: 1 << 1,
        phoneNumber: 1 << 2,
        apartmentNumber: 1 << 3,
        streetName: 1 << 4,
        city: 1 << 5,
        state: 1 << 6,
        zip: 1 << 7,
        country: 1 << 8,
    },
    mailingAddress: {
        sameAsHomeAddress: 1 << 0,
        apartmentNumber: 1 << 1,
        streetName: 1 << 2,
        city: 1 << 3,
        state: 1 << 4,
        zip: 1 << 5
    },
    secondMailingAddress: {
        sameAsHomeAddress: 1 << 0,
        associateName: 1 << 1,
        inCareOf: 1 << 2,
        phoneNumber: 1 << 3,
        streetName: 1 << 4,
        city: 1 << 5,
        state: 1 << 6,
        zip: 1 << 7,
        accessRights: 1 << 8
    },
    otherInformation: {
        providerId: 1 << 0,
        patientId: 1 << 1,
        contactName: 1 << 2,
        contactPhone: 1 << 3,
        edc1: 1 << 4,
        edc2: 1 << 5,
        languageSpoken: 1 << 6,
        languageRead: 1 << 7,
        caseName: 1 << 8,
        caseComposition: 1 << 9,
        clientNoticeLanguage: 1 << 10,
        familyPlanning: 1 << 11
    }
}