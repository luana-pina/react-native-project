import instance from "../axios.config";

const games = () => {
  async function getGamesTypes() {
    return instance.get("/cart_games");
  }
  async function getRecentGames() {
    return instance.get("/bet/all-bets");
  }
  return { getGamesTypes, getRecentGames };
};

export default games;
