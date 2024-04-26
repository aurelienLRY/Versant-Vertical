import { createSlice } from "@reduxjs/toolkit";
import { ActionCreateSession , ActionDeleteSession, ActionGetAllSession, ActionUpdateSession } from "../actions/sessionAction";


const initialState = {
  sessions: [],
  error: null,
};

const bookingSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addBooking(state, action) {
      state.sessions.push(action.payload);
    },
    updateBooking(state, action) {
      state.sessions = state.sessions.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
      );
    },
  },

  extraReducers: (builder) => {
    // Add this builder for create booking
    builder
      .addCase(ActionCreateSession.fulfilled, (state, action) => {
        state.sessions.push(action.payload);
        state.error = null;
      })

      .addCase(ActionCreateSession.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // Add this builder for get all bookings
    builder
      .addCase(ActionGetAllSession.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.error = null;
      })

      .addCase(ActionGetAllSession.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // Add this builder for delete booking
    builder
      .addCase(ActionDeleteSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter(
          (booking) => booking._id !== action.payload
        );
        state.error = null;
      })
      .addCase(ActionDeleteSession.rejected, (state, action) => {
        state.error = action.error.message;
      });

      // Add this builder for update booking
    builder
      .addCase(ActionUpdateSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        );
        state.error = null;
      })
      .addCase(ActionUpdateSession.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { addBooking , updateBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
