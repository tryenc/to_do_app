'use strict'

// Reducers
var reducers = require('./reducers/reducers.js');
var todos = reducers.todos;
var visibilityFilter = reducers.visibilityFilter;

// Reduxfi Functions
var reduxfi = require('./reduxfi/reduxfi.js');
var combineReducers = reduxfi.combineReducers;
var createStore = reduxfi.createStore; // to utilize the extension, comment this out

// Redux Functions
// var createStore = require('redux').createStore; // to utilize the extension, uncomment this

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


var store = createStore(
	todoApp,
	/*
		The code below intergrates the Redux DevTool extension.
		To use this extension in your chrome devTools, you'll need
		to add the extension in the chrome web store:
		https://chrome.google.com/webstore/category/extensions

		This extension only works if we utilize Redux's createStore function
		rather than the one that we created. To do so, comment out line 11
		and uncomment line 14.

		For more information on this extension, please see:
		https://github.com/zalmoxisus/redux-devtools-extension
	*/
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
