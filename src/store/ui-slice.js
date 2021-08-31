import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartVisible: false },
  reducers: {
    toggle(state) {
      state.cartVisible = !state.cartVisible; // allowed because of immer library internally
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
