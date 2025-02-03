/* eslint-disable react/prop-types */
const FormPage7 = ({ formData, setFormData }) => {
  // Handle changes in nested fields
  const handleNestedChange = (field, value, nestedField = null) => {
    if (nestedField) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [nestedField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        {/* Existing Sections */}

        {/* Monthly Housing Payment Section */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-3">Housing Expenses</h1>

          {/* Monthly Housing Payment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Monthly Housing Payment (such as rent or mortgage, including
              property taxes - just your share) $
            </label>
            <input
              type="text"
              value={formData.monthlyHousingPayment || ''}
              onChange={(e) =>
                handleNestedChange('monthlyHousingPayment', e.target.value)
              }
              className="input input-primary w-full"
            />
          </div>

          {/* Water Payment Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              If you pay for water separately, how much do you pay? $
            </label>
            <input
              type="text"
              value={formData.payForWater?.payForWaterAmount || ''}
              onChange={(e) =>
                handleNestedChange(
                  'payForWater',
                  e.target.value,
                  'payForWaterAmount'
                )
              }
              className="input input-primary w-full"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2">
              How often do you pay?
            </label>
            <select
              value={formData.payForWater?.howOftenPaid || ''}
              onChange={(e) =>
                handleNestedChange(
                  'payForWater',
                  e.target.value,
                  'howOftenPaid'
                )
              }
              className="select select-primary w-full"
            >
              <option value="">Select Frequency</option>
              <option value="every month">Every Month</option>
              <option value="2 times a year">2 Times a Year</option>
              <option value="quarterly">Quarterly (4 Times a Year)</option>
              <option value="once a year">Once a Year</option>
            </select>
          </div>

          {/* Free Housing as Part of Pay */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Do you receive free housing as part of your pay?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="No"
                  checked={formData.freeHousingAsPartofYourPay === 'No'}
                  onChange={(e) =>
                    handleNestedChange(
                      'freeHousingAsPartofYourPay',
                      e.target.value
                    )
                  }
                  className="radio radio-primary"
                />
                <span className="ml-2">No</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Yes"
                  checked={formData.freeHousingAsPartofYourPay === 'Yes'}
                  onChange={(e) =>
                    handleNestedChange(
                      'freeHousingAsPartofYourPay',
                      e.target.value
                    )
                  }
                  className="radio radio-primary"
                />
                <span className="ml-2">Yes</span>
              </label>
            </div>
          </div>
        </div>

        {/* Blind, Disabled, Chronically Ill or Nursing Home Care Section */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-3">
            Blind, Disabled, Chronically Ill or Nursing Home Care
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            These questions help us determine which program is best for the
            applicants. If no one is Blind, Disabled, Chronically Ill or in a
            Nursing Home, please go to Section G.
          </p>

          {/* Question 1: Nursing Home Care */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              1. Are you, or anyone who lives with you and is applying, in a
              residential treatment facility or receiving nursing home care in a
              hospital, nursing home or other medical institution?
            </h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="No"
                  checked={formData.nursingHomeCare === 'No'}
                  onChange={(e) =>
                    handleNestedChange('nursingHomeCare', e.target.value)
                  }
                  className="radio radio-primary"
                />
                <span className="ml-2">No</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Yes"
                  checked={formData.nursingHomeCare === 'Yes'}
                  onChange={(e) =>
                    handleNestedChange('nursingHomeCare', e.target.value)
                  }
                  className="radio radio-primary"
                />
                <span className="ml-2">Yes</span>
              </label>
            </div>
            {formData.nursingHomeCare === 'Yes' && (
              <p className="text-sm text-gray-600 mt-2">
                Finish completing this application AND complete Supplement A.
              </p>
            )}
          </div>

          {/* Question 2: Blind, Disabled, or Chronically Ill */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              2. Are you or anyone who lives with you blind, disabled, or
              chronically ill?
            </h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="No"
                  checked={formData.blindOrDisabledOrChronicallyIll === 'No'}
                  onChange={(e) =>
                    handleNestedChange(
                      'blindOrDisabledOrChronicallyIll',
                      e.target.value
                    )
                  }
                  className="radio radio-primary"
                />
                <span className="ml-2">No</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Yes"
                  checked={formData.blindOrDisabledOrChronicallyIll === 'Yes'}
                  onChange={(e) =>
                    handleNestedChange(
                      'blindOrDisabledOrChronicallyIll',
                      e.target.value
                    )
                  }
                  className="radio radio-primary"
                />
                <span className="ml-2">Yes</span>
              </label>
            </div>
            {formData.blindOrDisabledOrChronicallyIll === 'Yes' && (
              <p className="text-sm text-gray-600 mt-2">
                Finish completing this application AND complete Supplement A.
              </p>
            )}
          </div>
        </div>
      </div>
      {/* New Section: Medical Bills, Moving, Lawsuits, and Workers' Compensation */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-3">
          Medical Bills, Moving, Lawsuits, and Workers&apos; Compensation
        </h1>

        {/* Question 1: Medical or Prescription Bills for the Last 3 Months */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            1. Does anyone applying have paid or unpaid medical or prescription
            bills for this month or the three months before this month?
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={
                  formData.prescriptionBill3Month.prescriptionBill === 'No'
                }
                onChange={(e) =>
                  handleNestedChange('prescriptionBill3Month', {
                    ...formData.prescriptionBill3Month,
                    prescriptionBill: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={
                  formData.prescriptionBill3Month.prescriptionBill === 'Yes'
                }
                onChange={(e) =>
                  handleNestedChange('prescriptionBill3Month', {
                    ...formData.prescriptionBill3Month,
                    prescriptionBill: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
          {formData.prescriptionBill3Month.prescriptionBill === 'Yes' && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  value={formData.prescriptionBill3Month.name || ''}
                  onChange={(e) =>
                    handleNestedChange('prescriptionBill3Month', {
                      ...formData.prescriptionBill3Month,
                      name: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  In which month(s) of the previous three months do you have
                  medical bills?
                </label>
                <input
                  type="text"
                  value={formData.prescriptionBill3Month.whichMonth || ''}
                  onChange={(e) =>
                    handleNestedChange('prescriptionBill3Month', {
                      ...formData.prescriptionBill3Month,
                      whichMonth: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Question 2: Unpaid Medical or Prescription Bills Older Than 3 Months */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            2. Do you, or anyone applying, have any unpaid medical or
            prescription bills older than the previous three months?
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.prescriptionBillOlder === 'No'}
                onChange={(e) =>
                  handleNestedChange('prescriptionBillOlder', e.target.value)
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={formData.prescriptionBillOlder === 'Yes'}
                onChange={(e) =>
                  handleNestedChange('prescriptionBillOlder', e.target.value)
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
        </div>

        {/* Question 3: Moved into This County */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            3. Have you, or anyone who lives with you and is applying, moved
            into this county from another state or New York State county within
            the past three months?
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.moveIntoThisCounty.move === 'No'}
                onChange={(e) =>
                  handleNestedChange('moveIntoThisCounty', {
                    ...formData.moveIntoThisCounty,
                    move: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={formData.moveIntoThisCounty.move === 'Yes'}
                onChange={(e) =>
                  handleNestedChange('moveIntoThisCounty', {
                    ...formData.moveIntoThisCounty,
                    move: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
          {formData.moveIntoThisCounty.move === 'Yes' && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Who?
                </label>
                <input
                  type="text"
                  value={formData.moveIntoThisCounty.who || ''}
                  onChange={(e) =>
                    handleNestedChange('moveIntoThisCounty', {
                      ...formData.moveIntoThisCounty,
                      who: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Which state?
                </label>
                <input
                  type="text"
                  value={formData.moveIntoThisCounty.whichState || ''}
                  onChange={(e) =>
                    handleNestedChange('moveIntoThisCounty', {
                      ...formData.moveIntoThisCounty,
                      whichState: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Which county?
                </label>
                <input
                  type="text"
                  value={formData.moveIntoThisCounty.whichCounty || ''}
                  onChange={(e) =>
                    handleNestedChange('moveIntoThisCounty', {
                      ...formData.moveIntoThisCounty,
                      whichCounty: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Question 4: Pending Lawsuit */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            4. Does anyone who is applying have a pending lawsuit due to an
            injury?
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.pendingLawSuit.pending === 'No'}
                onChange={(e) =>
                  handleNestedChange('pendingLawSuit', {
                    ...formData.pendingLawSuit,
                    pending: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={formData.pendingLawSuit.pending === 'Yes'}
                onChange={(e) =>
                  handleNestedChange('pendingLawSuit', {
                    ...formData.pendingLawSuit,
                    pending: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
          {formData.pendingLawSuit.pending === 'Yes' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Who?
              </label>
              <input
                type="text"
                value={formData.pendingLawSuit.who || ''}
                onChange={(e) =>
                  handleNestedChange('pendingLawSuit', {
                    ...formData.pendingLawSuit,
                    who: e.target.value,
                  })
                }
                className="input input-primary w-full"
              />
            </div>
          )}
        </div>

        {/* Question 5: Workers' Compensation Case */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            5. Does anyone applying have a Workers&apos; Compensation case or an
            injury, illness, or disability that was caused by someone else (that
            could be covered by insurance)?
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={
                  formData.workersCompensationCase.workersCompensation === 'No'
                }
                onChange={(e) =>
                  handleNestedChange('workersCompensationCase', {
                    ...formData.workersCompensationCase,
                    workersCompensation: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={
                  formData.workersCompensationCase.workersCompensation === 'Yes'
                }
                onChange={(e) =>
                  handleNestedChange('workersCompensationCase', {
                    ...formData.workersCompensationCase,
                    workersCompensation: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
          {formData.workersCompensationCase.workersCompensation === 'Yes' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Who?
              </label>
              <input
                type="text"
                value={formData.workersCompensationCase.who || ''}
                onChange={(e) =>
                  handleNestedChange('workersCompensationCase', {
                    ...formData.workersCompensationCase,
                    who: e.target.value,
                  })
                }
                className="input input-primary w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage7;
