// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import activityReducer from './activitySlice';
import spotReducer from './spotSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  activity: activityReducer,
  spot: spotReducer,
});

export default rootReducer;