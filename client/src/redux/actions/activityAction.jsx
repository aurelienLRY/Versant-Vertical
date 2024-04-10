import { createAsyncThunk } from "@reduxjs/toolkit";


export const ActionCreateActivity = createAsyncThunk("creatActivity", async ({token , data}) => {
  console.log("data", data);
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
    throw new Error(err.message);
  }
  if (response.status === 201) {
    const json = await response.json();
    return json.activity;
  }
});


export const ActionGetAllActivities = createAsyncThunk("getAllActivities", async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}activities/`);
  if (response.status !== 200) {
    const err = await response.json();
    throw new Error(err.message);
  }
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
});


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
    throw new Error(err.message);
  }
  if (response.status === 200) {
   await response.json();
    return id;
  }
});

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
    throw new Error(err.message);
  }
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
});