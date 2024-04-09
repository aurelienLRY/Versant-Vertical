import { createAsyncThunk } from "@reduxjs/toolkit";

export const logIn = createAsyncThunk("logIn", async (data) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 400) {
    const err = await response.json();
    throw new Error(err.message);
  }
  if (response.status === 404) {
    const err = await response.json();
    throw new Error(err.message);
  }
  if (response.status === 500) {
    const err = await response.json();
    throw new Error(err.message);
  }
  if (response.status === 200) {
    const json = await response.json();
    return json;
  }
});

export const logOut = createAsyncThunk("logOut", async () => {
  const response = await fetch("http://localhost:3001/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
});
