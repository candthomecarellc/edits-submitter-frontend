/* eslint-disable react/prop-types */
const FormPage8 = ({ formData, setFormData }) => {
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
      {/* Section Header */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-3">
          Parent or Spouse Not Living in the Family or Deceased
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Pregnant applicants and families who are applying only for their children are NOT required to fill out this section. All other people who are applying and are age 21 or over must be willing to provide information about a parent of an applying minor or a spouse living outside the home to be eligible for health insurance, unless there is good cause. Children may still be eligible even if a parent is not willing to provide this information. If you fear physical or emotional harm as a result of providing information about a parent or spouse not living in the home, you may be excused from providing this information. This is called Good Cause. You may be asked to show that you have a good reason for your fears.
        </p>

        {/* Question 1: Is the spouse or parent of anyone applying deceased? */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            1. Is the spouse or parent of anyone applying deceased? (If spouse or parent is deceased, go to question 3.)
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.deceased.deceased === 'No'}
                onChange={(e) =>
                  handleNestedChange('deceased', {
                    ...formData.deceased,
                    deceased: e.target.value,
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
                checked={formData.deceased.deceased === 'Yes'}
                onChange={(e) =>
                  handleNestedChange('deceased', {
                    ...formData.deceased,
                    deceased: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
          {formData.deceased.deceased === 'Yes' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                If yes, name of applicant with deceased parent or spouse:
              </label>
              <input
                type="text"
                value={formData.deceased.who || ''}
                onChange={(e) =>
                  handleNestedChange('deceased', {
                    ...formData.deceased,
                    who: e.target.value,
                  })
                }
                className="input input-primary w-full"
              />
            </div>
          )}
        </div>

        {/* Question 2: Does a parent of any applying child live outside the home? */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            2. Does a parent of any applying child live outside the home? (If no, skip to question 3)
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.parentLiveOutside.parentLiveOutside === 'No'}
                onChange={(e) =>
                  handleNestedChange('parentLiveOutside', {
                    ...formData.parentLiveOutside,
                    parentLiveOutside: e.target.value,
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
                checked={formData.parentLiveOutside.parentLiveOutside === 'Yes'}
                onChange={(e) =>
                  handleNestedChange('parentLiveOutside', {
                    ...formData.parentLiveOutside,
                    parentLiveOutside: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
          {formData.parentLiveOutside.parentLiveOutside === 'Yes' && (
            <div className="mt-4 space-y-4">
              {/* Fear of Harm Checkbox */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.parentLiveOutside.fearOfHarm}
                  onChange={(e) =>
                    handleNestedChange('parentLiveOutside', {
                      ...formData.parentLiveOutside,
                      fearOfHarm: e.target.checked,
                    })
                  }
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">
                  If you fear physical or emotional harm if you provide information about a parent who does not live in the home, check this box.
                </span>
              </label>

              {/* Child 1 Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Child’s Name:
                </label>
                <input
                  type="text"
                  value={formData.parentLiveOutside.childName1 || ''}
                  onChange={(e) =>
                    handleNestedChange('parentLiveOutside', {
                      ...formData.parentLiveOutside,
                      childName1: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name of parent living outside the home:
                </label>
                <input
                  type="text"
                  value={formData.parentLiveOutside.nameOfParent1 || ''}
                  onChange={(e) =>
                    handleNestedChange('parentLiveOutside', {
                      ...formData.parentLiveOutside,
                      nameOfParent1: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current or last known address:
                </label>
                <input
                  type="text"
                  placeholder="Street"
                  value={formData.parentLiveOutside.street1 || ''}
                  onChange={(e) =>
                    handleNestedChange('parentLiveOutside', {
                      ...formData.parentLiveOutside,
                      street1: e.target.value,
                    })
                  }
                  className="input input-primary w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="City/State"
                  value={formData.parentLiveOutside.city1 || ''}
                  onChange={(e) =>
                    handleNestedChange('parentLiveOutside', {
                      ...formData.parentLiveOutside,
                      city1: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth (if known):
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="MM"
                    value={formData.parentLiveOutside.dateOfBirth1.month || ''}
                    onChange={(e) =>
                      handleNestedChange('parentLiveOutside', {
                        ...formData.parentLiveOutside,
                        dateOfBirth1: {
                          ...formData.parentLiveOutside.dateOfBirth1,
                          month: e.target.value,
                        },
                      })
                    }
                    className="input input-primary w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="DD"
                    value={formData.parentLiveOutside.dateOfBirth1.day || ''}
                    onChange={(e) =>
                      handleNestedChange('parentLiveOutside', {
                        ...formData.parentLiveOutside,
                        dateOfBirth1: {
                          ...formData.parentLiveOutside.dateOfBirth1,
                          day: e.target.value,
                        },
                      })
                    }
                    className="input input-primary w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={formData.parentLiveOutside.dateOfBirth1.year || ''}
                    onChange={(e) =>
                      handleNestedChange('parentLiveOutside', {
                        ...formData.parentLiveOutside,
                        dateOfBirth1: {
                          ...formData.parentLiveOutside.dateOfBirth1,
                          year: e.target.value,
                        },
                      })
                    }
                    className="input input-primary w-1/3"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SSN (if known):
                </label>
                <input
                  type="text"
                  value={formData.parentLiveOutside.ssn1 || ''}
                  onChange={(e) =>
                    handleNestedChange('parentLiveOutside', {
                      ...formData.parentLiveOutside,
                      ssn1: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>

              {/* Child 2 Details (if applicable) */}
              {/* Add similar fields for childName2, nameOfParent2, street2, city2, dateOfBirth2, ssn2 */}
            </div>
          )}
        </div>

        {/* Question 3: Is anyone applying still married to someone who lives outside the home? */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            3. Is anyone applying still married to someone who lives outside the home?
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="No"
                checked={formData.marriedLivesOutside.marriedLivesOutside === 'No'}
                onChange={(e) =>
                  handleNestedChange('marriedLivesOutside', {
                    ...formData.marriedLivesOutside,
                    marriedLivesOutside: e.target.value,
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
                checked={formData.marriedLivesOutside.marriedLivesOutside === 'Yes'}
                onChange={(e) =>
                  handleNestedChange('marriedLivesOutside', {
                    ...formData.marriedLivesOutside,
                    marriedLivesOutside: e.target.value,
                  })
                }
                className="radio radio-primary"
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
          {formData.marriedLivesOutside.marriedLivesOutside === 'Yes' && (
            <div className="mt-4 space-y-4">
              {/* Fear of Harm Checkbox */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.marriedLivesOutside.fearOfHarm}
                  onChange={(e) =>
                    handleNestedChange('marriedLivesOutside', {
                      ...formData.marriedLivesOutside,
                      fearOfHarm: e.target.checked,
                    })
                  }
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">
                  If you fear physical or emotional harm if you provide information about a spouse who does not live in the home, check this box.
                </span>
              </label>

              {/* Applying Person Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name of person applying who is still married:
                </label>
                <input
                  type="text"
                  value={formData.marriedLivesOutside.applyingPerson || ''}
                  onChange={(e) =>
                    handleNestedChange('marriedLivesOutside', {
                      ...formData.marriedLivesOutside,
                      applyingPerson: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>

              {/* Spouse Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Legal name of spouse living outside of the home:
                </label>
                <input
                  type="text"
                  value={formData.marriedLivesOutside.spouseName || ''}
                  onChange={(e) =>
                    handleNestedChange('marriedLivesOutside', {
                      ...formData.marriedLivesOutside,
                      spouseName: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current or last known address:
                </label>
                <input
                  type="text"
                  placeholder="Street"
                  value={formData.marriedLivesOutside.street || ''}
                  onChange={(e) =>
                    handleNestedChange('marriedLivesOutside', {
                      ...formData.marriedLivesOutside,
                      street: e.target.value,
                    })
                  }
                  className="input input-primary w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="City/State"
                  value={formData.marriedLivesOutside.city || ''}
                  onChange={(e) =>
                    handleNestedChange('marriedLivesOutside', {
                      ...formData.marriedLivesOutside,
                      city: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth (if known):
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="MM"
                    value={formData.marriedLivesOutside.dateOfBirth.month || ''}
                    onChange={(e) =>
                      handleNestedChange('marriedLivesOutside', {
                        ...formData.marriedLivesOutside,
                        dateOfBirth: {
                          ...formData.marriedLivesOutside.dateOfBirth,
                          month: e.target.value,
                        },
                      })
                    }
                    className="input input-primary w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="DD"
                    value={formData.marriedLivesOutside.dateOfBirth.day || ''}
                    onChange={(e) =>
                      handleNestedChange('marriedLivesOutside', {
                        ...formData.marriedLivesOutside,
                        dateOfBirth: {
                          ...formData.marriedLivesOutside.dateOfBirth,
                          day: e.target.value,
                        },
                      })
                    }
                    className="input input-primary w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={formData.marriedLivesOutside.dateOfBirth.year || ''}
                    onChange={(e) =>
                      handleNestedChange('marriedLivesOutside', {
                        ...formData.marriedLivesOutside,
                        dateOfBirth: {
                          ...formData.marriedLivesOutside.dateOfBirth,
                          year: e.target.value,
                        },
                      })
                    }
                    className="input input-primary w-1/3"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SSN (if known):
                </label>
                <input
                  type="text"
                  value={formData.marriedLivesOutside.ssn || ''}
                  onChange={(e) =>
                    handleNestedChange('marriedLivesOutside', {
                      ...formData.marriedLivesOutside,
                      ssn: e.target.value,
                    })
                  }
                  className="input input-primary w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage8;