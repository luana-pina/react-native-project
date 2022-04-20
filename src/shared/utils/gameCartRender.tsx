import GameCard from "@components/GameCard/Gamecard";
import { convertDate } from "./convertData";
import { stringToArray } from "./stringToArray";

export const gameCardRender = (itemData: any, canDelete?: boolean) => {
  const convertFormat = () => {
    return {
      ...itemData.item,
      choosen_numbers: stringToArray(itemData.item.choosen_numbers),
    };
  };
  return (
    <GameCard
      item={canDelete ? itemData.item : convertFormat()}
      key={itemData.item.id}
      createAt={convertDate(itemData.item.created_at)}
      canDelete={canDelete}
    />
  );
};
