// 'use strict' is explicitly being used so that any attempts
// to modify an object after it's been frozen will throw an error
'use strict';

// ***************** REDUCERS *****************
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

// ********* ACTION CREATORS *********
var todoId = 0;
var addTodo = function(text) {
  return {
    type: 'ADD_TODO',
    id: todoId++,
    text: text
  };
};

var setVisibilityFilter = function(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
};

// ********* REDUX STORE *********
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

var store = createStore(todoApp);

// ****** Functions for manipulating DOM ******

var addTodoListItem = function() {
  var input = document.getElementById('text');
  var text = input.value;

  store.dispatch(addTodo(text));

  input.value = '';
  todoId = todoId + 1;
};

document.getElementById('add').addEventListener('click', addTodoListItem);
document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTodoListItem();
  }
});

function setFilter(filter) {
  store.dispatch(setVisibilityFilter(filter));
}

var createListItem = function(todo) {
  var li = document.createElement('li');
  var liText = document.createTextNode(todo.text);
  li.appendChild(liText);
  li.addEventListener('click', function() {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: todo.id
    });
  });
  if (todo.completed) {
    li.classList.add('completed')
  }

  return li;
}

var clearListItemsFromList = function() {
  var ul = document.getElementById('todos');

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  };

  return ul;
};

var getVisibleTodos = function(todos, filter) {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(function(todo) {
        return todo.completed;
      });
    case 'SHOW_INCOMPLETE':
      return todos.filter(function(todo) {
        return !todo.completed;
      });
    case 'SHOW_ALL':
    default:
      return todos;
  }
};

var render = function() {
  var state = store.getState();
  var ul = clearListItemsFromList();
  var todos = getVisibleTodos(state.todos, state.visibilityFilter);

  todos.forEach(function(todo) {
    var li = createListItem(todo);
    ul.appendChild(li);
  });
};

store.subscribe(render);
module.exports = {
  combineReducers: combineReducers,
  createStore: createStore,
  todo: todo,
  todos: todos,
  visibilityFilter: visibilityFilter,
};