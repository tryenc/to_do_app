// 'use strict' is explicitly being used so that any attempts
// to modify an object after it's been frozen will throw an error
'use strict';

var todos = function(state, action) {
  // Your code here
};

var visibilityFilter = function(state, action) {
  // Your code here
}

module.exports = {
  todos: todos,
  visibilityFilter: visibilityFilter
};
