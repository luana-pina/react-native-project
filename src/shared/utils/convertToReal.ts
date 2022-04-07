export const convertToReal = (value: number) => {
  let valueString = String(value);
  let convert;
  let cents;
  if (valueString.indexOf(".") !== -1) {
    convert = valueString.replace(".", ",").split("");
    let separate = convert.indexOf(",");
    cents = convert.splice(separate);
    while (cents.length < 3) {
      cents.push("0");
    }
    convert.push(cents.join(""));
    return convert.join("");
  }
  cents = ",00";
  valueString += cents;
  return valueString;
};
