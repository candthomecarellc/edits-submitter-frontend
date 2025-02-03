/* eslint-disable react/prop-types */
const FormPage9 = ({ formData, setFormData }) => {
  const handleNestedChange = (index, field, value, nestedField = null) => {
    const updatedHealthPlan = [...formData.healthPlan];
    if (nestedField) {
      updatedHealthPlan[index][field][nestedField] = value;
    } else {
      updatedHealthPlan[index][field] = value;
    }
    setFormData((prev) => ({
      ...prev,
      healthPlan: updatedHealthPlan,
    }));
  };

  const addHealthPlanMember = () => {
    const newHealthPlanMember = {
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
    };

    setFormData((prev) => ({
      ...prev,
      healthPlan: [...prev.healthPlan, newHealthPlanMember],
    }));
  };

  const removeHealthPlanMember = (index) => {
    const updatedHealthPlan = formData.healthPlan.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      healthPlan: updatedHealthPlan,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="mt-6 p-4 bg-gray-100 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          If you or family members are found eligible for Medicaid, you will be
          enrolled in the health plan you choose. If you are an American
          Indian/Alaska Native you are not required to join a health plan; you
          can tell us you do not want to be in a health plan by calling or
          writing to your local department of social services or by checking
          this box.
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="doWanttoJoinHealthPlan"
              value="Yes"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doWanttoJoinHealthPlan: e.target.value,
                })
              }
              className="radio radio-primary"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="doWanttoJoinHealthPlan"
              value="No"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doWanttoJoinHealthPlan: e.target.value,
                })
              }
              className="radio radio-primary"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      {formData.healthPlan.map((member, index) => (
        <div key={index} className="bg-white shadow-sm rounded-lg p-6 relative">
          {/* Remove Health Plan Member Button */}
          <button
            type="button"
            onClick={() => removeHealthPlanMember(index)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            Remove
          </button>

          <h3 className="text-lg font-semibold mb-4">
            Health Plan Member {index + 1}
          </h3>
          <div className="space-y-4">
            {/* Legal Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Legal Last Name
              </label>
              <input
                type="text"
                value={member.lastName}
                onChange={(e) =>
                  handleNestedChange(index, 'lastName', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Legal First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Legal First Name
              </label>
              <input
                type="text"
                value={member.firstName}
                onChange={(e) =>
                  handleNestedChange(index, 'firstName', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                value={member.dob}
                onChange={(e) =>
                  handleNestedChange(index, 'dob', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Social Security Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Security Number
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

            {/* Name of Health Plan You are Enrolling in */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name of Health Plan You are Enrolling in
              </label>
              <input
                type="text"
                value={member.nameOfHealthPlan}
                onChange={(e) =>
                  handleNestedChange(index, 'nameOfHealthPlan', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Preferred Doctor or Health Center */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Doctor or Health Center (optional)
              </label>
              <input
                type="text"
                value={member.preferred.preferredDoctorOrClinic}
                onChange={(e) =>
                  handleNestedChange(
                    index,
                    'preferred',
                    e.target.value,
                    'preferredDoctorOrClinic'
                  )
                }
                className="input input-primary w-full"
              />
            </div>

            {/* Check Box if Your Current Provider */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={member.preferred.currentProvider}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'preferred',
                      e.target.checked,
                      'currentProvider'
                    )
                  }
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">Check Box if Your Current Provider</span>
              </label>
            </div>

            {/* OB/GYN (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OB/GYN (optional)
              </label>
              <input
                type="text"
                value={member.obGyn}
                onChange={(e) =>
                  handleNestedChange(index, 'obGyn', e.target.value)
                }
                className="input input-primary w-full"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Health Plan Member Button */}
      <button
        type="button"
        onClick={addHealthPlanMember}
        className="btn btn-primary mt-4"
      >
        Add Another Health Plan Member
      </button>
    </div>
  );
};

export default FormPage9;
