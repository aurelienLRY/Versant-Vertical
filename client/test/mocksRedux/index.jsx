import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../../src/redux/reducers";

/**
 * Creates a mock Redux store with the specified initial state.
 *
 * @param {Object} initialState - The initial state for the store.
 * @returns {Object} - The mock Redux store.
 */
export function createMockStore(initialState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });
}