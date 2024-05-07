import { createAsyncThunk  } from "@reduxjs/toolkit";
import { updateBooking } from "../reducers/sessionSlice";

/**
 * Action to get all customers.
 * @returns {Promise} A promise that resolves to the response JSON.
 */
export const ActionGetAllCustomer = createAsyncThunk(
  "getCustomer",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}customerSessions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      const err = await response.json();
      console.error("Erreur! voir les détails", err);
      throw new Error(err.message);
    }
    if (response.status === 200) {
      const json = await response.json();
      return json;
    }
  }
);

/**
 * Action to delete a customer.
 * @param {Object} payload - The payload containing the token and customer ID.
 * @param {string} payload.token - The authentication token.
 * @param {string} payload.id - The ID of the customer to delete.
 * @returns {Promise} A promise that resolves to the deleted customer ID.
 */
export const ActionDeleteCustomer = createAsyncThunk(
  "deleteCustomer",
  async ({ token, id }) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}customerSessions/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      const err = await response.json();
      console.error("Erreur! voir les détails", err);
      throw new Error(err.message);
    }
    if (response.status === 200) {
      await response.json();
      return id;
    }
  }
);

/**
 * Action to create a new customer.
 * @param {Object} payload - The payload containing the token and customer data.
 * @param {string} payload.token - The authentication token.
 * @param {Object} payload.customer - The customer data.
 * @returns {Promise} A promise that resolves to the created customer.
 */
export const ActionCreateCustomer = createAsyncThunk(
  "createCustomer",
  async ({ token, customer }, thunkApi) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}customerSessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customer),
      }
    );
    if (response.status !== 201) {
      const err = await response.json();
      console.error("Erreur! voir les détails", err);
      throw new Error(err.message);
    }
    if (response.status === 201) {
      const json = await response.json();
      if (json.updateSession) {
        thunkApi.dispatch(updateBooking(json.updateSession));
      }
      return json.newCustomerSession;
    }
  }
);

/**
 * Action to update a customer.
 * @param {Object} payload - The payload containing the token and customer data.
 * @param {string} payload.token - The authentication token.
 * @param {Object} payload.customer - The updated customer data.
 * @returns {Promise} A promise that resolves to the updated customer.
 */
export const ActionUpdateCustomer = createAsyncThunk(
  "updateCustomer",
  async ({ token, customer }) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}customerSessions/${customer._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customer),
      }
    );
    if (response.status !== 200) {
      const err = await response.json();
      console.error("Erreur! voir les détails", err);
      throw new Error(err.message);
    }
    if (response.status === 200) {
      const json = await response.json();
      return json;
    }
  }
);
