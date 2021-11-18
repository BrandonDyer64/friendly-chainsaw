import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardState {
  cards: { [key: number]: Card };
}

const initialState: CardState = {
  cards: {},
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards[action.payload.id] = action.payload;
    },
    addCards: (state, action: PayloadAction<Card[]>) => {
      action.payload.forEach((card) => (state.cards[card.id] = card));
    },
    removeCard: (state, action: PayloadAction<number>) => {
      delete state.cards[action.payload];
    },
  },
});

export const { addCard, addCards, removeCard } = cardSlice.actions;

export default cardSlice.reducer;
