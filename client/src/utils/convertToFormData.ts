export const convertToFormData = <T extends Record<string, any>>(
  values: T,
): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value) && value.every((item) => item instanceof File)) {
      value.forEach((file, index) => {
        formData.append(`${key}[${index}]`, file);
      });
    } else if (typeof value === "number") {
      formData.append(key, `${value}`);
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};
