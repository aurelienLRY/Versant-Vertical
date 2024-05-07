
/**
 * Checks if any CustomerSession is linked to the session.
 *
 * @param {string} sessionId - The ID of the session to check.
 * @param {Array} customerSessions - An array of customer sessions to search in.
 * @returns {boolean} - Returns true if a linked customer session is found, false otherwise.
 */
export function checkCustomerSessionVsSession(sessionId, customerSessions) {
  const customerSession = customerSessions.find((customerSession) => customerSession.sessionId === sessionId);
  return customerSession ? true : false;
}

/**
 * Finds a customer session by its session ID.
 *
 * @param {string} sessionId - The ID of the session to find.
 * @param {Array} customerSessions - An array of customer sessions to search in.
 * @returns {Object|boolean} - Returns the found customer session object if found, false otherwise.
 */
export function filterCustomerSessionBySessionId(sessionId, customerSessions) {
  const customerSession = customerSessions.filter((customerSession) => customerSession.sessionId === sessionId);
  return customerSession ? customerSession : false;
}



/**
 * Finds an activity by its ID and returns its name.
 *
 * @param {Array} activities - An array of activities to search in.
 * @param {string} id - The ID of the activity to find.
 * @returns {string} - The name of the activity.
 */
export function findActivityById(activities, id) {
  const activity = activities.find((activity) => activity._id === id);
  return activity ? activity.name : "";
}

/**
 * Finds the activity name based on the session ID.
 *
 * @param {Array} activities - An array of activities to search in.
 * @param {string} sessionId - The ID of the session.
 * @param {Array} sessions - An array of sessions to search in.
 * @returns {string} - The name of the activity.
 */
export function findActivityNameBySessionId(activities, sessionId, sessions) {
  const session = sessions.find((session) => session._id === sessionId);
  const activityId = session?.activity;
  const activity = activities.find((activity) => activity._id === activityId);
  return activity?.name || "";
}






/**
 * Finds the name of a spot based on the session ID.
 * @param {Array} spots - An array of spots to search in.
 * @param {string} sessionId - The ID of the session.
 * @param {Array} sessions - An array of sessions to search in.
 * @returns {string} - The name of the spot.
 */
export function findItemNameById(items, id) {
  const foundItem = items.find((item) => item._id === id);
  return foundItem ? foundItem.name : "";
}

/**
 * Finds an item by its ID.
 *
 * @param {Array} items - An array of items to search in.
 * @param {string} id - The ID of the item to find.
 * @returns {Object} - The item object.
 */
export function findItemById(items, id) {
  const foundItem = items.find((item) => item._id === id);
  return foundItem ? foundItem : null;
}
