var expect = require('chai').expect;

var file = require('../index.js');
var todoReducer = file.todoReducer;
var todosReducer = file.todosReducer;
var visibilityFilterReducer = file.visibilityFilterReducer;

describe('todoReducer', function() {
	var todo = {
		id: 1,
		text: 'first todo',
		completed: false
	};

	var toggleFirstTodoAction = {
		type: 'TOGGLE_TODO',
		id: 1
	};

	it('returns the todo if the action type is not recognized', function() {
		var unrecognizedAction = {
			type: 'UNRECOGNIZED'
		};

		expect(todoReducer(todo, unrecognizedAction)).to.deep.equal(todo);
	});

	it('does not mutate the todo passed to it', function() {
		// this will throw an error if an attempt to modify a property is made
		Object.freeze(todo);
		todoReducer(todo, toggleFirstTodoAction);
	})

	it('returns a new todo when passed an action of type ADD_TODO', function() {
		var addToDoAction = {
			type: 'ADD_TODO',
			id: 2,
			text: 'added todo'
		};

		var expectedTodo = {
			id: 2,
			text: 'added todo',
			completed: false
		};

		expect(todoReducer(null, addToDoAction)).to.deep.equal(expectedTodo);
	});

	it('returns a todo with its completed field toggle if it\'s passed a todo and ' +
		'an action of type "TOGGLE_TODO"', function() {
		var expectedTodo = {
			id: 1,
			text: 'first todo',
			completed: true
		};

		expect(todoReducer(todo, toggleFirstTodoAction)).to.deep.equal(expectedTodo);
	});
});

describe('todosReducer', function() {
	var testState1 = [
		{
			id: 1,
			text: 'test todo',
			completed: true
		},
	];

	var testState2 = [
		{
			id: 1,
			text: 'test todo',
			completed: true
		},
		{
			id: 2,
			text: 'test todo 2',
			completed: false
		},
	];

	var unrecognizedAction = {
		type: 'UNRECOGNIZED'
	};

	var toggleSecondTodoAction = {
		type: 'TOGGLE_TODO',
		id: 2
	};

	it('returns state if the action type is unrecognized', function() {
		var expectedState = [
			{
				id: 1,
				text: 'test todo',
				completed: true
			},
		];

		expect(todosReducer(testState1, unrecognizedAction))
			.to.deep.equal(expectedState);
	});

	it('returns an empty array if state is undefined and action type ' +
		'is unrecognized', function() {
		expect(todosReducer(undefined, unrecognizedAction))
			.to.deep.equal([]);
	});

	it('does not mutate state', function() {
		// this will throw an error if an attempt to modify a property is made
		Object.freeze(testState2);
		todosReducer(testState2, toggleSecondTodoAction);
	});

	it('returns state with an additional todo when passed an action ' +
		'of type "ADD_TODO"', function() {
		var addTodoAction = {
			type: 'ADD_TODO',
			id: 2,
			text: 'added todo'
		};

		var expectedState = [
			{
				id: 1,
				text: 'test todo',
				completed: true
			},
			{
				id: 2,
				text: 'added todo',
				completed: false
			},
		];

		expect(todosReducer(testState1, addTodoAction)).to.deep.equal(expectedState);
	});

	it('returns state with the designated todo\'s completed field toggled ' +
		'when passed an action of type "TOGGLE_TODO"', function() {
		var expectedState = [
			{
				id: 1,
				text: 'test todo',
				completed: true
			},
			{
				id: 2,
				text: 'test todo 2',
				completed: true
			},
		];

		expect(todosReducer(testState2, toggleSecondTodoAction)).to.deep.equal(expectedState);
	});
});

describe('visibilityFilterReducer', function() {
	var showCompletedAction = {
		type: 'SET_VISIBILITY_FILTER',
		filter: 'SHOW_COMPLETED'
	};

	it('returns state if the action type is unrecognized', function() {
		var unrecognizedAction = {
			type: 'UNRECOGNIZED'
		};

		expect(visibilityFilterReducer('SHOW_COMPLETED', unrecognizedAction))
			.to.equal('SHOW_COMPLETED');
	});

	it('returns "SHOW_ALL" if state is undefined and action type is ' +
		'unrecognized', function() {

	});

	it('does not mutate state', function() {

	});

	it('returns the action\'s filter property when passed an action ' +
		'of type "SET_VISIBILITY_FILTER"', function() {

	});
});