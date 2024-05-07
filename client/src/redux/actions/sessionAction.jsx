import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Action to create a Session.
 * @param {Object} param - The parameters for creating a Session.
 * @param {string} param.token - The authentication token.
 * @param {Object} param.data - The data for the Session.
 * @returns {Promise<Object>} - A promise that resolves to the created Session.
 */
export const ActionCreateSession = createAsyncThunk("createSession", async ({token , data}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}sessions`, {
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
    return json.session;
  }
});

/**
 * Action to get all Sessions.
 * @returns {Promise<Object>} - A promise that resolves to the list of all Sessions.
 */
export const ActionGetAllSession = createAsyncThunk("getSession", async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}sessions`, {
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
 * Action to delete a Session.
 * @param {Object} param - The parameters for deleting a Session.
 * @param {string} param.token - The authentication token.
 * @param {string} param.id - The ID of the Session to delete.
 * @returns {Promise<string>} - A promise that resolves to the ID of the deleted Session.
 */
export const ActionDeleteSession = createAsyncThunk("deleteSession", async ({token , id}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}sessions/${id}`, {
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
  * Action to update a Session.
  * @param {Object} param - The parameters for updating a Session.
  * @param {string} param.token - The authentication token.
  * @param {Object} param.data - The data for the Session.
  * @returns {Promise<Object>} - A promise that resolves to the updated Session.
  */
export const ActionUpdateSession = createAsyncThunk("updateSession", async ({token , data}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}sessions/${data._id}`, {
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