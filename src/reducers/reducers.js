// 'use strict' is explicitly being used so that any attempts
// to modify an object after it's been frozen will throw an error
'use strict';

var todos = function(state, action) {
  state = state || [];
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat(
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      );
    case 'TOGGLE_TODO':
      return state.map(function(todo) {
        if (todo.id === action.id) {
          return Object.assign(
            {},
            todo,
            {
              completed: !todo.completed,
            }
          );
        }
        return todo;
      });
      // This won't work because it mutates state
    default:
       return state;
  }
};

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
  todos: todos,
  visibilityFilter: visibilityFilter
};
