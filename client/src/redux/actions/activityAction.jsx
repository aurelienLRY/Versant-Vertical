import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Action to create a new activity.
 * @param {Object} param - The parameters for creating the activity.
 * @param {string} param.token - The authorization token.
 * @param {Object} param.data - The data for the new activity.
 * @returns {Promise<Object>} - A promise that resolves to the created activity.
 */
export const ActionCreateActivity = createAsyncThunk("createActivity", async ({token , data}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}activities/`, {
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
    return json.activity;
  }
});

/**
 * Action to get all activities.
 * @returns {Promise<Object>} - A promise that resolves to the list of activities.
 */
export const ActionGetAllActivities = createAsyncThunk("getAllActivities", async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}activities/`);
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
 * Action to delete an activity.
 * @param {Object} param - The parameters for deleting the activity.
 * @param {string} param.token - The authorization token.
 * @param {string} param.id - The ID of the activity to delete.
 * @returns {Promise<string>} - A promise that resolves to the ID of the deleted activity.
 */
export const ActionDeleteActivity = createAsyncThunk("deleteActivity", async ({token , id}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}activities/${id}`, {
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

/**
 * Action to update an activity.
 * @param {Object} param - The parameters for updating the activity.
 * @param {string} param.token - The authorization token.
 * @param {Object} param.data - The updated data for the activity.
 * @returns {Promise<Object>} - A promise that resolves to the updated activity.
 */
export const ActionUpdateActivity = createAsyncThunk("putActivity", async ({token , data}) => {
  console.log("data action update", data);
  const response = await fetch(`${import.meta.env.VITE_APP_API}activities/${data.id}`, {
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