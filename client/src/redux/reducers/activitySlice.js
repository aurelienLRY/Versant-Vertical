//reducer/activitySlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ActionCreateActivity } from "../actions/activityAction";
import { ActionGetAllActivities } from "../actions/activityAction";
import { ActionDeleteActivity } from "../actions/activityAction";
import { ActionUpdateActivity } from "../actions/activityAction";

const initialState = {
  activities: [],
  error: null,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addActivity(state, action) {
      state.activities.push(action.payload);
    },
  },

  extraReducers: (builder) => {

    // Add this builder for create activity
    builder
      .addCase(ActionCreateActivity.fulfilled, (state, action) => {
        state.activities.push(action.payload);
        state.error = null;
      })

      .addCase(ActionCreateActivity.rejected, (state, action) => {
        state.error = action.error.message;
      });

      // Add this builder for get all activities
    builder
      .addCase(ActionGetAllActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
        state.error = null;
      })
      .addCase(ActionGetAllActivities.rejected, (state, action) => {
        state.error = action.error.message;
      });

    // Add this builder for delete activity
    builder
    .addCase(ActionDeleteActivity.fulfilled, (state, action) => {
      state.activities = state.activities.filter(
        (activity) => activity._id !== action.payload
      );
      state.error = null;
    })
    .addCase(ActionDeleteActivity.rejected, (state, action) => {
      state.error = action.error.message;
    }); 

    builder
    .addCase(ActionUpdateActivity.fulfilled, (state, action) => {
      state.activities = state.activities.map((activity) =>
        activity._id === action.payload._id ? action.payload : activity
      );
      state.error = null;
    })
    .addCase(ActionUpdateActivity.rejected, (state, action) => {
      state.error = action.error.message;
    });

    
  },
});

export const { addActivity } = activitySlice.actions;
export default activitySlice.reducer;
