import { createSlice } from "@reduxjs/toolkit";
import { IGame, ICardGame } from "../interfaces";
import { stringToArray } from "../utils/stringToArray";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    gamesType: Array<IGame>(),
    recentGames: Array<ICardGame>(),
    gameSelected: {},
  },
  reducers: {
    clearData(state) {
      state.gamesType = Array<IGame>();
      state.recentGames = Array<ICardGame>();
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
      requestData.forEach(
        (item: {
          id: number;
          user_id: number;
          game_id: number;
          choosen_numbers: string;
          price: number;
          created_at: Date;
          type: { id: number; type: string };
        }) => {
          state.recentGames.push({
            ...item,
            choosen_numbers: stringToArray(item.choosen_numbers),
          });
        }
      );
    },
  },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice;
