import { ICartGamesBody } from "../../interfaces/";
import instance from "../axios.config";

const cart = () => {
  async function sendCart(body: { games: ICartGamesBody[] }) {
    return instance.post("/bet/new-bet", body);
  }
  return { sendCart };
};

export default cart;
