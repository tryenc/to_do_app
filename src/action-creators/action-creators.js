'use strict';

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

var toggleTodo = function(id) {
  return {
    type: 'TOGGLE_TODO',
    id: id
  };
};

module.exports = {
	addTodo: addTodo,
	setVisibilityFilter: setVisibilityFilter,
  toggleTodo: toggleTodo
};
