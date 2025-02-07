/* eslint-disable react/prop-types */
const FormPage5 = ({ formData, setFormData }) => {
  const handleNestedChange = (index, field, value, nestedField = null) => {
    const updatedFamilyInfo = [...formData.familyInfo];
    if (nestedField) {
      updatedFamilyInfo[index][field][nestedField] = value;
    } else {
      updatedFamilyInfo[index][field] = value;
    }
    setFormData((prev) => ({
      ...prev,
      familyInfo: updatedFamilyInfo,
    }));
  };

  const addFamilyMember = () => {
    const newFamilyMember = {
      name: '',
      birthName: '',
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
    };

    setFormData((prev) => ({
      ...prev,
      familyInfo: [...prev.familyInfo, newFamilyMember],
    }));
  };

  const removeFamilyMember = (index) => {
    const updatedFamilyInfo = formData.familyInfo.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      familyInfo: updatedFamilyInfo,
    }));
  };

  return (
    <div className="space-y-4">
      {formData.familyInfo.map((member, index) => (
        <div key={index} className="bg-white shadow-sm rounded-lg p-6 relative">
          {/* Remove Family Member Button */}
          <button
            type="button"
            onClick={() => removeFamilyMember(index)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            Remove
          </button>

          <h3 className="text-lg font-semibold mb-4">
            Family Member {index + 1}
          </h3>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Legal Name
              </label>
              <input
                type="text"
                value={member.name}
                onChange={(e) =>
                  handleNestedChange(index, 'name', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Birth Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birth Name
              </label>
              <input
                type="text"
                value={member.birthName}
                onChange={(e) =>
                  handleNestedChange(index, 'birthName', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="MM"
                  value={member.dateOfBirth.month}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'dateOfBirth',
                      e.target.value,
                      'month'
                    )
                  }
                  className="input input-primary w-1/3"
                />
                <input
                  type="text"
                  placeholder="DD"
                  value={member.dateOfBirth.day}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'dateOfBirth',
                      e.target.value,
                      'day'
                    )
                  }
                  className="input input-primary w-1/3"
                />
                <input
                  type="text"
                  placeholder="YYYY"
                  value={member.dateOfBirth.year}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'dateOfBirth',
                      e.target.value,
                      'year'
                    )
                  }
                  className="input input-primary w-1/3"
                />
              </div>
            </div>

            {/* Sex */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sex
              </label>
              <select
                value={member.sex}
                onChange={(e) =>
                  handleNestedChange(index, 'sex', e.target.value)
                }
                className="select select-primary w-full"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary/Non-Conforming">
                  Non-Binary/Non-Conforming
                </option>
                <option value="Transgender">Transgender</option>
                <option value="Different Identity">Different Identity</option>
              </select>
            </div>

            {/* Gender Identity (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender Identity (Optional)
              </label>
              <input
                type="text"
                value={member.genderIdentity}
                onChange={(e) =>
                  handleNestedChange(index, 'genderIdentity', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Is Pregnant */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Is this person pregnant?
              </label>
              <select
                value={member.isPregnant}
                onChange={(e) =>
                  handleNestedChange(index, 'isPregnant', e.target.value)
                }
                className="select select-primary w-full"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Pregnant Due Date */}
            {member.isPregnant === 'Yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="MM"
                    value={member.pregnantDueDate.month}
                    onChange={(e) =>
                      handleNestedChange(
                        index,
                        'pregnantDueDate',
                        e.target.value,
                        'month'
                      )
                    }
                    className="input input-primary w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="DD"
                    value={member.pregnantDueDate.day}
                    onChange={(e) =>
                      handleNestedChange(
                        index,
                        'pregnantDueDate',
                        e.target.value,
                        'day'
                      )
                    }
                    className="input input-primary w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={member.pregnantDueDate.year}
                    onChange={(e) =>
                      handleNestedChange(
                        index,
                        'pregnantDueDate',
                        e.target.value,
                        'year'
                      )
                    }
                    className="input input-primary w-1/3"
                  />
                </div>
              </div>
            )}

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Relationship to Person in Box 1
              </label>
              <input
                type="text"
                value={member.relationship}
                onChange={(e) =>
                  handleNestedChange(index, 'relationship', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Public Health Coverage */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Public Health Coverage
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={member.publicHealthCoverage.childHealthPlus}
                    onChange={(e) =>
                      handleNestedChange(
                        index,
                        'publicHealthCoverage',
                        e.target.checked,
                        'childHealthPlus'
                      )
                    }
                    className="checkbox checkbox-primary"
                  />
                  <span className="ml-2">Child Health Plus</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={member.publicHealthCoverage.medicaid}
                    onChange={(e) =>
                      handleNestedChange(
                        index,
                        'publicHealthCoverage',
                        e.target.checked,
                        'medicaid'
                      )
                    }
                    className="checkbox checkbox-primary"
                  />
                  <span className="ml-2">Medicaid</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={member.publicHealthCoverage.familyHealthPlus}
                    onChange={(e) =>
                      handleNestedChange(
                        index,
                        'publicHealthCoverage',
                        e.target.checked,
                        'familyHealthPlus'
                      )
                    }
                    className="checkbox checkbox-primary"
                  />
                  <span className="ml-2">Family Health Plus</span>
                </label>
                <input
                  type="text"
                  placeholder="ID Number"
                  value={member.publicHealthCoverage.idNumber}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'publicHealthCoverage',
                      e.target.value,
                      'idNumber'
                    )
                  }
                  className="input input-primary w-full"
                />
              </div>
            </div>

            {/* SSN */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Security Number (if any)
              </label>
              <input
                type="text"
                value={member.ssn}
                onChange={(e) =>
                  handleNestedChange(index, 'ssn', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* US Citizenship */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                US Citizenship
              </label>
              <select
                value={member.usCitizenship.usCitizen}
                onChange={(e) =>
                  handleNestedChange(
                    index,
                    'usCitizenship',
                    e.target.value,
                    'usCitizen'
                  )
                }
                className="select select-primary w-full"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Race */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Race
              </label>
              <input
                type="text"
                value={member.race}
                onChange={(e) =>
                  handleNestedChange(index, 'race', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Received a Service from IHS */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Received a service from the IHS or other Indian Health Program?
              </label>
              <select
                value={member.receivedAServiceFromIHS}
                onChange={(e) =>
                  handleNestedChange(
                    index,
                    'receivedAServiceFromIHS',
                    e.target.value
                  )
                }
                className="select select-primary w-full"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      {/* Add Family Member Button */}
      <button
        type="button"
        onClick={addFamilyMember}
        className="btn btn-primary mt-4"
      >
        Add Another Family Member
      </button>
      <div className="mt-6 p-4 bg-gray-100 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Is anyone in your household a veteran?
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="householdVeteran"
              value="Yes"
              onChange={(e) =>
                setFormData({ ...formData, householdVeteran: e.target.value })
              }
              className="radio radio-primary"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="householdVeteran"
              value="No"
              onChange={(e) =>
                setFormData({ ...formData, householdVeteran: e.target.value })
              }
              className="radio radio-primary"
            />
            <span className="ml-2">No</span>
          </label>
          {formData.householdVeteran === 'Yes' && (
            <input
              type="text"
              placeholder="If yes, name:"
              value={formData.veteranName || ''}
              onChange={(e) =>
                setFormData({ ...formData, veteranName: e.target.value })
              }
              className="input input-primary ml-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage5;
