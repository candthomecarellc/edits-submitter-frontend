/* eslint-disable react/prop-types */
const FormIncomeInformation = ({ formData, setFormData }) => {
  const handleIncomeChange = (type, index, field, value) => {
    const updatedIncome = [...formData[type]];
    updatedIncome[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      [type]: updatedIncome,
    }));
  };

  const addIncomeEntry = (type) => {
    const newEntry = {
      name: '',
      typeOfWork: '',
      typeOfIncome: '',
      howMuchEarned: '',
      howOftenPaid: '',
    };

    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], newEntry],
    }));
  };

  const removeIncomeEntry = (type, index) => {
    const updatedIncome = formData[type].filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      [type]: updatedIncome,
    }));
  };

  const renderIncomeSection = (type, title, noIncomeField) => {
    return (
      <div className="mb-6 p-4 bg-white shadow-sm rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={formData[noIncomeField]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [noIncomeField]: e.target.checked,
              }))
            }
            className="checkbox checkbox-primary mr-2"
          />
          <label>If no {title.toLowerCase()}, check here</label>
        </div>

        {!formData[noIncomeField] &&
          formData[type].map((entry, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-50 rounded-lg relative"
            >
              {formData[type].length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIncomeEntry(type, index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name of Person
                  </label>
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) =>
                      handleIncomeChange(type, index, 'name', e.target.value)
                    }
                    className="input input-primary w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {type === 'earningFromWork'
                      ? 'Type of Work/Employer'
                      : 'Type of Income/Source'}
                  </label>
                  <input
                    type="text"
                    value={entry.typeOfWork || entry.typeOfIncome}
                    onChange={(e) =>
                      handleIncomeChange(
                        type,
                        index,
                        type === 'earningFromWork'
                          ? 'typeOfWork'
                          : 'typeOfIncome',
                        e.target.value
                      )
                    }
                    className="input input-primary w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    How Much? (before taxes)
                  </label>
                  <input
                    type="text"
                    value={entry.howMuchEarned || entry.howMuch}
                    onChange={(e) =>
                      handleIncomeChange(
                        type,
                        index,
                        entry.howMuchEarned !== undefined
                          ? 'howMuchEarned'
                          : 'howMuch',
                        e.target.value
                      )
                    }
                    className="input input-primary w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    How Often? (weekly, monthly)
                  </label>
                  <select
                    value={entry.howOftenPaid}
                    onChange={(e) =>
                      handleIncomeChange(
                        type,
                        index,
                        'howOftenPaid',
                        e.target.value
                      )
                    }
                    className="select select-primary w-full"
                  >
                    <option value="">Select</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

        {!formData[noIncomeField] && (
          <button
            type="button"
            onClick={() => addIncomeEntry(type)}
            className="btn btn-primary mt-4"
          >
            Add Another Entry
          </button>
        )}
      </div>
    );
  };

  const handleChildCareChange = (index, field, value) => {
    const updatedChildCare = [...formData.childCare];
    updatedChildCare[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      childCare: updatedChildCare,
    }));
  };

  const addChildCareEntry = () => {
    const newEntry = {
      childName: '',
      howMuchPaid: '',
      howOftenPaid: '',
    };

    setFormData((prev) => ({
      ...prev,
      childCare: [...prev.childCare, newEntry],
    }));
  };

  const removeChildCareEntry = (index) => {
    const updatedChildCare = formData.childCare.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      childCare: updatedChildCare,
    }));
  };

  const renderAdditionalQuestions = () => {
    return (
      <div className="mb-6 p-4 bg-white shadow-sm rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Additional Questions</h3>

        {/*  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            If you or any applying adult in Section B does not have income, tell
            us who?
          </label>
          <input
            value={formData.applingAdulthaveNoIncome}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                applingAdulthaveNoIncome: e.target.value,
              }))
            }
            className="input input-primary w-full"
          />
        </div>

        {/* Question 1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            1. If there is no income listed above, please explain how you are
            living:
          </label>
          <textarea
            value={formData.explainHowLiving}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                explainHowLiving: e.target.value,
              }))
            }
            className="textarea textarea-primary w-full"
          />
        </div>

        {/* Question 2 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            2. Have you or anyone who is applying changed jobs or stopped
            working in the last 3 months?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.applierChangeJob.changeJobin3Month === 'No'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    applierChangeJob: {
                      ...prev.applierChangeJob,
                      changeJobin3Month: e.target.value,
                    },
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={formData.applierChangeJob.changeJobin3Month === 'Yes'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    applierChangeJob: {
                      ...prev.applierChangeJob,
                      changeJobin3Month: e.target.value,
                    },
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>

          {formData.applierChangeJob.changeJobin3Month === 'Yes' && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your last job was:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Month"
                    value={formData.applierChangeJob.lastJobDate.month}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        applierChangeJob: {
                          ...prev.applierChangeJob,
                          lastJobDate: {
                            ...prev.applierChangeJob.lastJobDate,
                            month: e.target.value,
                          },
                        },
                      }))
                    }
                    className="input input-primary w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="Day"
                    value={formData.applierChangeJob.lastJobDate.day}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        applierChangeJob: {
                          ...prev.applierChangeJob,
                          lastJobDate: {
                            ...prev.applierChangeJob.lastJobDate,
                            day: e.target.value,
                          },
                        },
                      }))
                    }
                    className="input input-primary w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={formData.applierChangeJob.lastJobDate.year}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        applierChangeJob: {
                          ...prev.applierChangeJob,
                          lastJobDate: {
                            ...prev.applierChangeJob.lastJobDate,
                            year: e.target.value,
                          },
                        },
                      }))
                    }
                    className="input input-primary w-1/3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name of Employer:
                </label>
                <input
                  type="text"
                  value={formData.applierChangeJob.nameofEmployer}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      applierChangeJob: {
                        ...prev.applierChangeJob,
                        nameofEmployer: e.target.value,
                      },
                    }))
                  }
                  className="input input-primary w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Question 3 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            3. Are you or anyone who is applying a student in a vocational,
            undergraduate, or graduate program?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.applierStudent.student === 'No'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    applierStudent: {
                      ...prev.applierStudent,
                      student: e.target.value,
                    },
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={formData.applierStudent.student === 'Yes'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    applierStudent: {
                      ...prev.applierStudent,
                      student: e.target.value,
                    },
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>

          {formData.applierStudent.student === 'Yes' && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student Type:
                </label>
                <select
                  value={formData.applierStudent.studentType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      applierStudent: {
                        ...prev.applierStudent,
                        studentType: e.target.value,
                      },
                    }))
                  }
                  className="select select-primary w-full"
                >
                  <option value="">Select</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name of Student:
                </label>
                <input
                  type="text"
                  value={formData.applierStudent.nameOfStudent}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      applierStudent: {
                        ...prev.applierStudent,
                        nameOfStudent: e.target.value,
                      },
                    }))
                  }
                  className="input input-primary w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Question 4 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            4. Do you have to pay for childcare (or for the care of a disabled
            adult) in order to work or go to school?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.payForChildCare === 'No'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    payForChildCare: e.target.value,
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={formData.payForChildCare === 'Yes'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    payForChildCare: e.target.value,
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>

          {formData.payForChildCare === 'Yes' && (
            <div className="mt-4 space-y-4">
              {formData.childCare.map((entry, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg relative">
                  {formData.childCare.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChildCareEntry(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Child’s/Adult’s Name:
                      </label>
                      <input
                        type="text"
                        value={entry.childName}
                        onChange={(e) =>
                          handleChildCareChange(
                            index,
                            'childName',
                            e.target.value
                          )
                        }
                        className="input input-primary w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        How Much? $
                      </label>
                      <input
                        type="text"
                        value={entry.howMuchPaid}
                        onChange={(e) =>
                          handleChildCareChange(
                            index,
                            'howMuchPaid',
                            e.target.value
                          )
                        }
                        className="input input-primary w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        How Often?
                      </label>
                      <select
                        value={entry.howOftenPaid}
                        onChange={(e) =>
                          handleChildCareChange(
                            index,
                            'howOftenPaid',
                            e.target.value
                          )
                        }
                        className="select select-primary w-full"
                      >
                        <option value="">Select</option>
                        <option value="weekly">Weekly</option>
                        <option value="every two weeks">Every Two Weeks</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addChildCareEntry}
                className="btn btn-primary mt-4"
              >
                Add Another Entry
              </button>
            </div>
          )}
        </div>

        {/* Question 5 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            5. If you are not eligible for Medicaid coverage, you may still be
            eligible for the Family Planning Benefit Program. Are you interested
            in receiving coverage for Family Planning Services only?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.familyPlanningServiceOnly === 'No'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    familyPlanningServiceOnly: e.target.value,
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={formData.familyPlanningServiceOnly === 'Yes'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    familyPlanningServiceOnly: e.target.value,
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
        </div>

        {/* Question 6 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            6. Are you or your spouse / other parent required to pay court
            ordered support?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.isPayCourtOrdered.payCourtOrdered === 'No'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPayCourtOrdered: {
                      ...prev.isPayCourtOrdered,
                      payCourtOrdered: e.target.value,
                    },
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Yes"
                checked={formData.isPayCourtOrdered.payCourtOrdered === 'Yes'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPayCourtOrdered: {
                      ...prev.isPayCourtOrdered,
                      payCourtOrdered: e.target.value,
                    },
                  }))
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>

          {formData.isPayCourtOrdered.payCourtOrdered === 'Yes' && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Who?
                </label>
                <input
                  type="text"
                  value={formData.isPayCourtOrdered.whoPayCourtOrdered}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPayCourtOrdered: {
                        ...prev.isPayCourtOrdered,
                        whoPayCourtOrdered: e.target.value,
                      },
                    }))
                  }
                  className="input input-primary w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  How Much? $
                </label>
                <input
                  type="text"
                  value={formData.isPayCourtOrdered.payCourtOrderedAmount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPayCourtOrdered: {
                        ...prev.isPayCourtOrdered,
                        payCourtOrderedAmount: e.target.value,
                      },
                    }))
                  }
                  className="input input-primary w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Self-Employment Section */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.selfEmploymentInfo === 'Yes'}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                selfEmploymentInfo: e.target.checked ? 'Yes' : '',
              }))
            }
            className="checkbox checkbox-primary mr-2"
          />
          <span>If self-employed, check here</span>
        </label>
      </div>

      {renderIncomeSection(
        'earningFromWork',
        'Earnings from Work',
        'noEarningsFromWork'
      )}

      {renderIncomeSection(
        'unearnedIncome',
        'Unearned Income',
        'noUnearnedIncome'
      )}

      {renderIncomeSection('contributions', 'Contributions', 'noContributions')}

      {renderIncomeSection('otherIncome', 'Other Income', 'noOtherIncome')}

      {/* Render Additional Questions */}
      {renderAdditionalQuestions()}
    </div>
  );
};

export default FormIncomeInformation;
