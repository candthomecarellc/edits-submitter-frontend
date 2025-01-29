const fileCheak = (e, setFormData) => {
  const file = e.target.files[0];
  const field = e.target.name;

  if (file) {
    if (!file.type.match('application/pdf|image/tiff')) {
      alert('Please upload only PDF or TIFF files');
      e.target.value = '';
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
    console.log(file);
  }
};

export default fileCheak;
