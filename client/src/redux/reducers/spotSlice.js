//reducer/spotSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ActionCreateSpot } from "../actions/spotAction";
import { ActionGetAllSpots } from "../actions/spotAction";
import { ActionDeleteSpot } from "../actions/spotAction";
import { ActionUpdateSpot } from "../actions/spotAction";



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

      builder
      .addCase(ActionGetAllSpots.fulfilled, (state, action) => {
        state.spots = action.payload;
        state.error = null;
      })

      .addCase(ActionGetAllSpots.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(ActionDeleteSpot.fulfilled, (state, action) => {
        state.spots = state.spots.filter(
          (spot) => spot._id !== action.payload
        );
        state.error = null;
      })
      .addCase(ActionDeleteSpot.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(ActionUpdateSpot.fulfilled, (state, action) => {
        state.spots = state.spots.map((spot) =>
          spot._id === action.payload._id ? action.payload : spot
        );
        state.error = null;
      })
      .addCase(ActionUpdateSpot.rejected, (state, action) => {
        state.error = action.error.message;
      });
      

  },
});


export const { addSpot } = spotSlice.actions;
export default spotSlice.reducer;