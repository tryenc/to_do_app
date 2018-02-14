'use strict';

var combineReducers = function(reducers) {
  return function(state, action) {
    state = state || {};
    // Object.keys would be ['todos', 'visibilityFilter']
    return Object.keys(reducers)
       .reduce(function(nextState, stateField) {
         nextState[stateField] = reducers[stateField](
           state[stateField],
           action
         );
        return nextState;
    }, {})
  }
}

var createStore = function(reducer) {
  var state;
  var listeners = [];

  var getState = function() {
    return state;
  };

  var dispatch = function(action) {
    state = reducer(state, action);
    listeners.forEach(function(listener) {
      listener();
    });
  };

  var subscribe = function(listener) {
    listeners.push(listener);

    return function() {
      listeners = listeners.filter(function(l) {
        l !== listener;
      });
    }
  };

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
