import { createAsyncThunk } from "@reduxjs/toolkit";


export const ActionCreateSpot = createAsyncThunk("createSpot", async ({token , data}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}spots/`, {
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
    return json.spot;
  }
});

export const  ActionGetAllSpots = createAsyncThunk("getAllSpots", async (token) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}spots/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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


export const ActionDeleteSpot = createAsyncThunk("deleteSpot", async ({token , id}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}spots/${id}`, {
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


export const ActionUpdateSpot = createAsyncThunk("updateSpot", async ({token , data}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}spots/${data.id}`, {
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
    return json.spot;
  }
});