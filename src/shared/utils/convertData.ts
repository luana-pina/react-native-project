export const convertDate = (date: Date) => {
  const dateArray = String(date).match(/\d{4}-\d{2}-\d{2}/g);
  if (dateArray) {
    return dateArray[0].split("-").reverse().join("/");
  }
};
