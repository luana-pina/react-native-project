import GameCard from "../../../components/GameCard/Gamecard";
import { convertDate } from "./convertData";
import { stringToArray } from "./stringToArray";

export const gameCardRender = (itemData: any, canDelete?: boolean) => {
  const convertFormat = {
    ...itemData.item,
    choosen_numbers: stringToArray(itemData.item.choosen_numbers),
  };

  return (
    <GameCard
      item={convertFormat}
      key={itemData.item.id}
      createAt={convertDate(itemData.item.created_at)}
      canDelete={canDelete}
    />
  );
};
