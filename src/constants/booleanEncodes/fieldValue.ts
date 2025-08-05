// This is a bitmask for different ethnicity options
// The bitmask is a number that is used to store all the ethnicity options
// Each 2 bits represent a field, 00 is for blank, 01 is for yes, 10 is for no, 11 is for unknown
export const FIELD_VALUE = {
    // 2 bits 1 field
    ethnicity: {
        hy: 1 << 0,  // 000000000001 (1)
        hn: 2 << 0,  // 000000000010 (2)
        hu: 3 << 0,  // 000000000011 (3)
        iy: 1 << 2,  // 000000000100 (4)
        in: 2 << 2,  // 000000001000 (8)
        iu: 3 << 2,  // 000000001100 (12)
        ay: 1 << 4,  // 000000010000 (16)
        an: 2 << 4,  // 000000100000 (32)
        au: 3 << 4,  // 000000110000 (48)
        by: 1 << 6,  // 000001000000 (64)
        bn: 2 << 6,  // 000010000000 (128)
        bu: 3 << 6,  // 000011000000 (192)
        py: 1 << 8,  // 000100000000 (256)
        pn: 2 << 8,  // 001000000000 (512)
        pu: 3 << 8,  // 001100000000 (768)
        wy: 1 << 10, // 010000000000 (1024)
        wn: 2 << 10, // 100000000000 (2048)
        wu: 3 << 10, // 110000000000 (3072)
    },

    // 1 bit 1 field
    applicantBooleans : {
        homeless: 1 << 0,
        mailSame: 1 << 1,
        mail2Same: 1 << 2,
        applyOrRenew: 1 << 3,
        discuss: 1 << 4,
        getNotice: 1 << 5,
        clientNoticeLanguage: 1 << 6,
        familyPlanning: 1 << 7,
    },

    // 1 bit 1 field
    householdBooleans: {
        responsibleAdult: 1 << 0,
        veteran: 1 << 1,
        pregnant: 1 << 2,
        studentType: 1 << 3,
        selfEmployed: 1 << 4,
        changedJob: 1 << 5,
    },

    // 1 bit 1 field
    insuranceInformationBooleans: {
        medicaid: 1 << 0,
        familyHealthPlus: 1 << 1,
        commercialInsurance: 1 << 2,
        medicare: 1 << 3,
        medicalAssistance: 1 << 4,
        jobHealthInsurance: 1 << 5,
        recentMedicalBill: 1 << 6,
        oldMedicalBill: 1 << 7,
        pendingLawsuit: 1 << 8,
        injured: 1 << 9,
        recentMoveIn: 1 << 10,
        parentDeceased: 1 << 11,
        parentLivingOutside: 1 << 12,
        parentPrivacy: 1 << 13,
        spouseDeceased: 1 << 14,
        spouseLivingOutside: 1 << 15,
        spousePrivacy: 1 << 16,
        healthPlan: 1 << 17,
        currentDoctor: 1 << 18,
    }
};
