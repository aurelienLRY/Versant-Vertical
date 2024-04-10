// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import activityReducer from './activitySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  activity: activityReducer,
});

export default rootReducer;