//reducer/spotSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ActionCreateSpot } from "../actions/spotAction";



const initialState = {
  spots: [],
  error: null,
};

const spotSlice = createSlice({
  name: "spot",
  initialState,
  reducers: {
    addSpot(state, action) {
      state.spots.push(action.payload);
    },
  },

  extraReducers: (builder) => {

    // Add this builder for create spot
    builder
      .addCase(ActionCreateSpot.fulfilled, (state, action) => {
        state.spots.push(action.payload);
        state.error = null;
      })

      .addCase(ActionCreateSpot.rejected, (state, action) => {
        state.error = action.error.message;
      });

  },
});


export const { addSpot } = spotSlice.actions;
export default spotSlice.reducer;