'use strict';
var Redux = require('redux');

// ********* REDUCERS *********
var todosReducer = function(state, action) {
  state = state || [];
  switch (action.type) {
    case 'ADD_TODO':
       return state.concat(todoReducer(null, action));
    case 'TOGGLE_TODO':
      return state.map(function(todo) {
        return todoReducer(todo, action)
      })
    default:
       return state;
  }
};

var todoReducer = function(todo, action) {
  switch (action.type) {
    case 'TOGGLE_TODO':
      if (todo.id === action.id) {
        return Object.assign(
          {},
          todo,
          {
            completed: !todo.completed
          }
        );
      }

      return todo;

    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    default:
      return todo;
  }
}

var visibilityFilterReducer = function(state, action) {
  state = state || 'SHOW_ALL';
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

var combineReducers = function(reducers) {
  return function(state, action) {
    state = state || {};
    // returns ['todos', 'visibilityFilter']
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

var todoApp = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer
});

var createStore = Redux.createStore;
var store = createStore(todoApp);

module.exports = {
  todoReducer: todoReducer,
  todosReducer: todosReducer,
  visibilityFilterReducer: visibilityFilterReducer,
};