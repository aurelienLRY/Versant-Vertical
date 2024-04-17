// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import activityReducer from './activitySlice';
import spotReducer from './spotSlice';
import bookingReducer from './bookingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  activity: activityReducer,
  spot: spotReducer,
  booking: bookingReducer,
});

export default rootReducer;