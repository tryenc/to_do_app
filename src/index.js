'use strict'

// Reducers
var reducers = require('./reducers/reducers.js');
var todos = reducers.todos;
var visibilityFilter = reducers.visibilityFilter;

// Redux Functions
var redux = require('./redux/redux.js');
var combineReducers = redux.combineReducers;
var createStore = redux.createStore;

// Action Creators
var actionCreators = require('./action-creators/action-creators.js');
var addTodo = actionCreators.addTodo;
var setVisibilityFilter = actionCreators.setVisibilityFilter;
var toggleTodo = actionCreators.toggleTodo;

// Helper Functions
var helpers = require('./helpers/helpers.js');
var clearItemsFromList = helpers.clearItemsFromList;
var createListItem = helpers.createListItem;
var getVisibleTodos = helpers.getVisibleTodos;
var setListenersForAddTodo = helpers.setListenersForAddTodo;
var setListenersForFilter = helpers.setListenersForFilter;

var todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

var store = createStore(todoApp);

setListenersForAddTodo(store);
setListenersForFilter(store);

var render = function() {
  var state = store.getState();
  var ul = clearItemsFromList();
  var todos = getVisibleTodos(state.todos, state.visibilityFilter);

  todos.forEach(function(todo) {
    var li = createListItem(todo, store);
    ul.appendChild(li);
  });
};

store.subscribe(render);
