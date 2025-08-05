export const HOUSEHOLD_EXPENSE_STATUS = {
    housingExpense: {
        shelterType: 1 << 0,
        shelterAmount: 1 << 1,
        waterPeriod: 1 << 2,
        waterCostAmount: 1 << 3,
        addType: 1 << 4,
        addAmount: 1 << 5,
        budgetType: 1 << 6,
        fuelType: 1 << 7,
        freeHousing: 1 << 8,
        nursingHome: 1 << 9,
        blindDisableChronicallyIll: 1 << 10
    },
    childCare: {
        child1Name: 1 << 0,
        child1Month: 1 << 1,
        child1Year: 1 << 2,
        child1Amount: 1 << 3,
        child1Period: 1 << 4,
        child2Name: 1 << 5,
        child2Month: 1 << 6,
        child2Year: 1 << 7,
        child2Amount: 1 << 8,
        child2Period: 1 << 9,
        child3Name: 1 << 10,
        child3Month: 1 << 11,
        child3Year: 1 << 12,
        child3Amount: 1 << 13,
        child3Period: 1 << 14
    },
    otherExpenses: {
        ssiDm: 1 << 0,
        ssiLa: 1 << 1,
        ssiNoDm: 1 << 2,
        ssiNoAll: 1 << 3,
        chronicCareDateIns: 1 << 4,
        chronicCarePia: 1 << 5,
        chronicCareCon: 1 << 6,
        chronicCareAmount: 1 << 7,
        chronicCareLoc: 1 << 8
    }
}