export const isSelectedHandler = (list: number[], number: number) => {
  let index: number = -1;
  const isSelected: boolean = list.some((item, indexItem) => {
    index = indexItem;
    return item === number;
  });
  return isSelected ? { isSelected, index } : isSelected;
};
