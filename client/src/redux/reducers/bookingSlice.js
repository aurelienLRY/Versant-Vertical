import { createSlice } from "@reduxjs/toolkit";
import { ActionCreateBooking , ActionDeleteBooking, ActionGetAllBookings, ActionUpdateBooking } from "../actions/bookingAction";


const initialState = {
  bookings: [],
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    // Add this builder for create booking
    builder
      .addCase(ActionCreateBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.error = null;
      })

      .addCase(ActionCreateBooking.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // Add this builder for get all bookings
    builder
      .addCase(ActionGetAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.error = null;
      })

      .addCase(ActionGetAllBookings.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // Add this builder for delete booking
    builder
      .addCase(ActionDeleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload
        );
        state.error = null;
      })
      .addCase(ActionDeleteBooking.rejected, (state, action) => {
        state.error = action.error.message;
      });

      // Add this builder for update booking
    builder
      .addCase(ActionUpdateBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        );
        state.error = null;
      })
      .addCase(ActionUpdateBooking.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
