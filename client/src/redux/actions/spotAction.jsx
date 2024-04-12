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