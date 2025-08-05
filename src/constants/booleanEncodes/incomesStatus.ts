// This is a bitmask for the fields in the incomes section
// The bitmask is a number that is used to store the status of the fields
// Each bit represents a field, 0 is for review, 1 is for confirmed
export const INCOMES_STATUS = {
    earnedIncome: {
        category: 1 << 0,
        source: 1 << 1,
        employerName: 1 << 2,
        employeeId: 1 << 3,
        employmentStatus: 1 << 4,
        gross: 1 << 5,
        period: 1 << 6,
        insur: 1 << 7,
        ctSup: 1 << 8,
        wkRel: 1 << 9,
        irwe: 1 << 10,
    },
    unearnedIncome: {
        category: 1 << 0,
        source: 1 << 1,
        amount: 1 << 2,
        period: 1 << 3,
        cd1: 1 << 4,
        exempt1: 1 << 5,
        cd2: 1 << 6,
        exempt2: 1 << 7,
    },
    resource: {
        category: 1 << 0,
        resourceValue: 1 << 1,
        period: 1 << 2,
        cd: 1 << 3,
        utxn2Flag: 1 << 4,
    },
}