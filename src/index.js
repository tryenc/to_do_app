'use strict'

// Reducers
var reducers = require('./reducers/reducers.js');
var todos = reducers.todos;
var visibilityFilter = reducers.visibilityFilter;

// Redux Functions
var redux = require('./redux/redux.js');
var combineReducers = redux.combineReducers;
var createStore = redux.createStore;

var actionCreators = require('./action-creators/action-creators.js');
var addTodo = actionCreators.addTodo;
var setVisibilityFilter = actionCreators.setVisibilityFilter;

var addTodoListItem = function() {
  var input = document.getElementById('text');
  var text = input.value;

  store.dispatch(addTodo(text));

  input.value = '';
};

document.getElementById('add').addEventListener('click', addTodoListItem);
document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTodoListItem();
  }
});

var setFilter = function(filter) {
  store.dispatch(setVisibilityFilter(filter));
}

var filterButtons = document.querySelectorAll('input[type="radio"]');

Array.prototype.forEach.call(filterButtons, function(button) {
	button.addEventListener('click', function(event) {
		console.log('event.target.dataset.filter', event.target.dataset.filter);
		setFilter(event.target.dataset.filter);
	});
});

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

var clearItemsFromList = function() {
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

var todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

var store = createStore(todoApp);

var render = function() {
  var state = store.getState();
  var ul = clearItemsFromList();
  var todos = getVisibleTodos(state.todos, state.visibilityFilter);

  todos.forEach(function(todo) {
    var li = createListItem(todo);
    ul.appendChild(li);
  });
};

store.subscribe(render);
