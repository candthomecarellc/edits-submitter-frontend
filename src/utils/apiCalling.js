export const formSubmitFunction = async (formData) => {
    const formDataToSend = new FormData();
  
    // Helper function to flatten nested objects
    const appendFormData = (data, parentKey = '') => {
      for (const key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          const fieldKey = parentKey ? `${parentKey}.${key}` : key;
  
          if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
            appendFormData(data[key], fieldKey); // Recursively handle nested objects
          } else {
            formDataToSend.append(fieldKey, data[key]);
          }
        }
      }
    };
  
    appendFormData(formData);
  
    // File field validation and direct appending
    const response = await fetch(
      'http://localhost:3000/api/v1/form/takeAndProcessData',
      {
        method: 'POST',
        body: formDataToSend,
      }
    );
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  };
  