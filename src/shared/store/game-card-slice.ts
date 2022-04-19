import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { isSelectedHandler } from "../utils";

const cardGameSlice = createSlice({
  name: "cardGame",
  initialState: {
    card: {
      id: NaN,
      choosen_numbers: Array<number>(),
      price: NaN,
      type: { type: "", id: NaN },
    },
  },
  reducers: {
    chooseNumber(state, action) {
      const { newNumber, maxNumber } = action.payload;
      const max = maxNumber ? maxNumber : 0;
      const selected = isSelectedHandler(state.card.choosen_numbers, newNumber);
      if (selected) {
        state.card.choosen_numbers.splice(selected.index, 1);
      } else {
        if (state.card.choosen_numbers.length >= max) {
          Alert.alert("Can't select more numbers!");
        } else {
          state.card.choosen_numbers.push(newNumber);
        }
      }
    },
    addCardInfo(state, action) {
      const { id, price, type } = action.payload;
      state.card.id = id;
      state.card.price = price;
      state.card.type = type;
    },
    clearCard(state) {
      state.card.id = NaN;
      state.card.price = NaN;
      state.card.type.id = NaN;
      state.card.type.type = "";
      state.card.choosen_numbers = [];
    },
  },
});

export const cardGameActions = cardGameSlice.actions;

export default cardGameSlice;
