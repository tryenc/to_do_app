'use strict';

// Action Creators
var actionCreators = require('../action-creators/action-creators.js');
var addTodo = actionCreators.addTodo;
var setVisibilityFilter = actionCreators.setVisibilityFilter;
var toggleTodo = actionCreators.toggleTodo;

// Private Functions
var _addTodoListItem = function(store) {
  var input = document.getElementById('text');
  var text = input.value;

  store.dispatch(addTodo(text));

  input.value = '';
};

var _setFilter = function(filter, store) {
  store.dispatch(setVisibilityFilter(filter));
};

// Public Functions
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

var clearItemsFromList = function() {
  var ul = document.getElementById('todos');

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  };

  return ul;
};

var createListItem = function(todo, store) {
  var li = document.createElement('li');
  var liText = document.createTextNode(todo.text);
  li.appendChild(liText);
  li.addEventListener('click', function() {
    store.dispatch(toggleTodo(todo.id));
  });
  if (todo.completed) {
    li.classList.add('completed')
  }

  return li;
};

var setListenersForAddTodo = function(store) {
  document.getElementById('add').addEventListener('click', function() {
    _addTodoListItem(store);
  });
  document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      _addTodoListItem(store);
    }
  });
};

var setListenersForFilter = function(store) {
  var filterButtons = document.querySelectorAll('input[type="radio"]');

  Array.prototype.forEach.call(filterButtons, function(button) {
    button.addEventListener('click', function(event) {
      _setFilter(event.target.dataset.filter, store);
    });
  });
};

module.exports = {
  clearItemsFromList: clearItemsFromList,
  createListItem: createListItem,
  getVisibleTodos: getVisibleTodos,
  setListenersForAddTodo: setListenersForAddTodo,
  setListenersForFilter: setListenersForFilter
};
