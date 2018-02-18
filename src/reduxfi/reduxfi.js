'use strict';

/**
 * A function for combining reducers which manage
 * disparate parts of state and returns a reducer which
 * manages all of state.
 * @param  {Object} reducers - an object with keys
 *   corresponding to parts of state and values
 *   corresponding to the reducers which will
 *   manage those parts of state
 * @return {Function} - a reducer which combines the
 *   reducers that were passed to it
 * @example
 * function(state, action) {
 *   state = state || {};
 * }
 */
var combineReducers = function(reducers) {
  // Your code here
}

/**
 * A function which takes a reducer and returns
 * a store for holding state.
 * @param  {Function} reducer - a reducer for managing
 * @return {[type]}         [description]
 */
var createStore = function(reducer) {
  var state;
  // This is where functions passed to store.subscribe will be stored
  var listeners = [];

  var getState = function() {
    // Your Code Here
  };

  var dispatch = function(action) {
    // Your Code Here
  };

  var subscribe = function(listener) {
    // Your Code Here
  };

  // Initializes state
  dispatch({});

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
}

module.exports = {
  combineReducers: combineReducers,
  createStore: createStore
};
