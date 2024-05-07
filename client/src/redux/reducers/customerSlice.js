import { createSlice } from "@reduxjs/toolkit";
import {
  ActionCreateCustomer,
  ActionDeleteCustomer,
  ActionGetAllCustomer,
  ActionUpdateCustomer,
} from "../actions/customerAction";

const initialState = {
  customers: [],
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,

  extraReducers: (builder) => {
    // Add this builder for get all customers
    builder
      .addCase(ActionGetAllCustomer.fulfilled, (state, action) => {
        state.customers = action.payload; 
        state.error = null;
      })
      .addCase(ActionGetAllCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });
    // Add this builder for delete customer
    builder
      .addCase(ActionDeleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload
        );
        state.error = null;
      })
      .addCase(ActionDeleteCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });
    // Add this builder for create
    builder
      .addCase(ActionCreateCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
        state.error = null;
      })
      .addCase(ActionCreateCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });
    // Add this builder for update
    builder
      .addCase(ActionUpdateCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.map((customer) => 
          customer._id === action.payload._id ? action.payload : customer
        ); 
        state.error = null;
      })
      .addCase(ActionUpdateCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default customerSlice.reducer;