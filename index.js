// 'use strict' is explicitly being used so that any attempts
// to modify an object after it's been frozen will throw an error
'use strict';
// var Redux = require('redux');

// ********* REDUCERS *********
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

// "reducers" would be:
// {
//  todos: todosReducer,
//  visibilityFilter: visibilityFilterReducer
// }
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

var todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

var createStore = Redux.createStore;
var store = createStore(todoApp);

var render = function() {
  var state = store.getState();
  var ul = document.getElementById('todos');

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  state.todos.forEach(function(todo) {
    var li = document.createElement('li');
    var liText = document.createTextNode(todo.text);
    li.appendChild(liText);
    ul.appendChild(li);
  });
};

var todoId = 0;

document.getElementById('add').addEventListener('click', function() {
  // console.log('click');
  var input = document.getElementById('text');
  var text = input.value;
  store.dispatch({
    type: 'ADD_TODO',
    id: todoId,
    text: text
  });

  input.value = '';
  todoId = todoId + 1;
});

store.subscribe(render);

// module.exports = {
//   combineReducers: combineReducers,
//   todo: todo,
//   todos: todos,
//   visibilityFilter: visibilityFilter,
// };