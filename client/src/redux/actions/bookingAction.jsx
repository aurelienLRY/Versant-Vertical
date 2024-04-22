import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Action to create a booking.
 * @param {Object} param - The parameters for creating a booking.
 * @param {string} param.token - The authentication token.
 * @param {Object} param.data - The data for the booking.
 * @returns {Promise<Object>} - A promise that resolves to the created booking.
 */
export const ActionCreateBooking = createAsyncThunk("createBooking", async ({token , data}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 201) {
    const err = await response.json();
    console.error("Erreur! voir les détails",err);
    throw new Error(err.message);
  }
  if (response.status === 201) {
    const json = await response.json();
    return json.booking;
  }
});

/**
 * Action to get all bookings.
 * @returns {Promise<Object>} - A promise that resolves to the list of all bookings.
 */
export const ActionGetAllBookings = createAsyncThunk("getAllBookings", async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
  if (response.status !== 200) {
    const err = await response.json();
    console.error("Erreur! voir les détails",err);
    throw new Error(err.message);
  }
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
});

/**
 * Action to delete a booking.
 * @param {Object} param - The parameters for deleting a booking.
 * @param {string} param.token - The authentication token.
 * @param {string} param.id - The ID of the booking to delete.
 * @returns {Promise<string>} - A promise that resolves to the ID of the deleted booking.
 */
export const ActionDeleteBooking = createAsyncThunk("deleteBooking", async ({token , id}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}bookings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });
  if (response.status  !== 200) {
    const err = await response.json();
    console.error("Erreur! voir les détails",err);
    throw new Error(err.message);
  }
  if (response.status === 200) {
   await response.json();
    return id;
  }
});

/*
  * Action to update a booking.
  * @param {Object} param - The parameters for updating a booking.
  * @param {string} param.token - The authentication token.
  * @param {Object} param.data - The data for the booking.
  * @returns {Promise<Object>} - A promise that resolves to the updated booking.
  */
export const ActionUpdateBooking = createAsyncThunk("updateBooking", async ({token , data}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}bookings/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    const err = await response.json();
    console.error("Erreur! voir les détails",err);
    throw new Error(err.message);
  }
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
});