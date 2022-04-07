export const stringToArray = (string: string) => {
  const numbersArray: number[] = [];
  const stringsArray = string.split(",");
  stringsArray.forEach((item) => {
    numbersArray.push(Number(item));
  });
  return numbersArray;
};
