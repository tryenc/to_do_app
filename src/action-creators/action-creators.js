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

module.exports = {
	addTodo: addTodo,
	setVisibilityFilter: setVisibilityFilter
};
