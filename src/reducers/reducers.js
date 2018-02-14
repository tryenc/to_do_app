// 'use strict' is explicitly being used so that any attempts
// to modify an object after it's been frozen will throw an error
'use strict';

var todos = function(state, action) {
  state = state || [];
  switch (action.type) {
    case 'ADD_TODO':
       return state.concat(todo(null, action));
    case 'TOGGLE_TODO':
      return state.map(function(t) {
        return todo(t, action)
      })
    default:
       return state;
  }
};

var todo = function(t, action) {
  switch (action.type) {
    case 'TOGGLE_TODO':
      if (t.id === action.id) {
        return Object.assign(
          {},
          t,
          {
            completed: !t.completed
          }
        );
      }

      return t;

    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    default:
      return t;
  }
}

var visibilityFilter = function(state, action) {
  state = state || 'SHOW_ALL';
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

module.exports = {
  todo: todo,
  todos: todos,
  visibilityFilter: visibilityFilter
};
