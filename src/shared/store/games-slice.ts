import { createSlice } from "@reduxjs/toolkit";
import { IGame, ICardRecentsGames } from "../interfaces";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    gamesType: Array<IGame>(),
    recentGames: Array<ICardRecentsGames>(),
    gameSelected: {},
  },
  reducers: {
    clearData(state) {
      state.gamesType = Array<IGame>();
      state.recentGames = [];
      state.gameSelected = {};
    },
    getSelectedGame(state, action) {
      const { requestData, gameId } = action.payload;
      state.gamesType = requestData;
      if (gameId) {
        requestData.forEach((item: IGame) => {
          if (item.id === gameId) {
            state.gameSelected = item;
          }
        });
      }
    },
    getRecentGames(state, action) {
      const { requestData } = action.payload;
      requestData.forEach((item: ICardRecentsGames) => {
        state.recentGames.push({
          ...item,
        });
      });
    },
  },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice;
