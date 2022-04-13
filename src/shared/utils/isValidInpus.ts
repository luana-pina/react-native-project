export const isValidInputs = (inputData: { value: string; type: string }) => {
  let isValid: { isValid: boolean; text: string } = { isValid: true, text: "" };
  switch (inputData.type) {
    case "email":
      if (
        inputData.value.length === 0 ||
        !inputData.value.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i)
      ) {
        isValid = {
          isValid: false,
          text:
            inputData.value.length === 0
              ? "This field is required!"
              : "Enter a valid email",
        };
      }
      break;
    case "name":
      if (inputData.value.length < 3) {
        isValid = {
          isValid: false,
          text:
            inputData.value.length === 0
              ? "This field is required!"
              : "Enter a valid name (At least 3 characters)",
        };
      }
      break;
    case "password":
      if (inputData.value.length === 0) {
        isValid = {
          isValid: false,
          text: "This field is required!",
        };
      }
      break;
  }
  return isValid;
};
