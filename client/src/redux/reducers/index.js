// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import activityReducer from './activitySlice';
import spotReducer from './spotSlice';
import sessionReducer from './sessionSlice';
import sessionCustomerReducer from './customerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  activity: activityReducer,
  spot: spotReducer,
  session: sessionReducer,
  customerSession : sessionCustomerReducer
});

export default rootReducer;