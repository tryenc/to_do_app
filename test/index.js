var expect = require('chai').expect;
var sinon = require('sinon');

var file = require('../index.js');
var todo = file.todo;
var todos = file.todos;
var visibilityFilter = file.visibilityFilter;
var combineReducers = file.combineReducers;
var createStore = file.createStore;

describe('todo reducer', function() {
	var testTodo = {
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

		expect(todo(testTodo, unrecognizedAction)).to.deep.equal(testTodo);
	});

	it('does not mutate the todo passed to it', function() {
		// this will throw an error if an attempt to modify a property is made
		Object.freeze(testTodo);
		todo(testTodo, toggleFirstTodoAction);
	});

	describe('when passed an action of type ADD_TODO, it ' +
		'returns a new todo with', function() {
		var addToDoAction = {
			type: 'ADD_TODO',
			id: 2,
			text: 'added todo'
		};

		var returnedTodo = todo(null, addToDoAction);

		it('the same "id" field as specified in the action', function() {
			expect(returnedTodo.id).to.equal(2);
		});

		it('the same "text" field as specified in the action', function() {
			expect(returnedTodo.text).to.equal('added todo');
		});

		it('the "completed" field set to false', function() {
			expect(returnedTodo.completed).to.be.false;
		});
	});

	describe('when passed a todo and an action of type TOGGLE_TODO with an "id" ' +
		'field that matches the "id" field on the todo, it returns a todo with', function() {
		var returnedTodo = todo(testTodo, toggleFirstTodoAction);

		it('the same "id" and "text" as the todo passed to it', function() {
			expect(returnedTodo.id).to.equal(1);
			expect(returnedTodo.text).to.equal('first todo');
		});

		it('a "completed" field that is the opposite of the todo passed in', function() {
			expect(returnedTodo.completed).to.be.true;
		});
	});
});

describe('todos reducer', function() {
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

		expect(todos(testState1, unrecognizedAction))
			.to.deep.equal(expectedState);
	});

	it('returns an empty array if state is undefined and action type ' +
		'is unrecognized', function() {
		expect(todos(undefined, unrecognizedAction))
			.to.deep.equal([]);
	});

	it('does not mutate state', function() {
		// this will throw an error if an attempt to modify a property is made
		Object.freeze(testState2);
		todos(testState2, toggleSecondTodoAction);
	});

	it('returns state with an additional todo when passed state and an action ' +
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

		expect(todos(testState1, addTodoAction)).to.deep.equal(expectedState);
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

		expect(todos(testState2, toggleSecondTodoAction)).to.deep.equal(expectedState);
	});
});

describe('visibilityFilter', function() {
	var showCompletedAction = {
		type: 'SET_VISIBILITY_FILTER',
		filter: 'SHOW_COMPLETED'
	};

	var unrecognizedAction = {
		type: 'UNRECOGNIZED'
	};

	it('returns state if the action type is unrecognized', function() {
		var state = 'SHOW_COMPLETED';
		expect(visibilityFilter(state, unrecognizedAction))
			.to.equal(state);
	});

	it('returns "SHOW_ALL" if state is undefined and action type is ' +
		'unrecognized', function() {
		expect(visibilityFilter(undefined, unrecognizedAction))
			.to.equal('SHOW_ALL');
	});

	it('returns the action\'s filter property when passed state and an action ' +
		'of type "SET_VISIBILITY_FILTER"', function() {
		var state = "SHOW_ALL";
		expect(visibilityFilter(state, showCompletedAction))
			.to.equal('SHOW_COMPLETED');
	});
});

describe('combineReducers', function() {
	var returnedReducer = combineReducers({
		todos: todos,
		visibilityFilter: visibilityFilter
	});

	it('returns a function', function() {
		expect(returnedReducer).to.be.an.instanceof(Function);
	});

	describe('when the returned reducer is invoked', function() {
		var todosSpy = sinon.spy(todos);
		var visibilityFilterSpy = sinon.spy(visibilityFilter);

		var returnedReducer = combineReducers({
			todos: todosSpy,
			visibilityFilter: visibilityFilterSpy
		});

		expect(todosSpy.notCalled).to.be.true;
		expect(visibilityFilterSpy.notCalled).to.be.true;

		var unrecognizedAction = {
			type: 'UNRECOGNIZED',
		};

		var testState = {
			todos: [
				{
					id: 0,
					text: 'combine reducers',
					completed: false,
				},
			],
			visibilityFilter: "SHOW_COMPLETED",
		};

		var returnedState = returnedReducer(testState, unrecognizedAction);

		it('calls every reducer that was passed to combineReducers', function() {
			expect(todosSpy.calledOnce).to.be.true;
			expect(visibilityFilterSpy.calledOnce).to.be.true;
		});

		it('calls the visibilityFilter reducer with the ' +
		'visibilityFilter portion of state and the action', function() {
			expect(visibilityFilterSpy.args[0]).to.include('SHOW_COMPLETED');
			expect(visibilityFilterSpy.args[0]).to.deep.include({type: 'UNRECOGNIZED'});
		});

		it('does NOT call the visibilityFilter reducer with the ' +
			'todos portion of state', function() {
			expect(visibilityFilterSpy.args[0]).to.not.deep
				.include(testState.todos);
		});

		it('when invoked, calls the todos reducer with the ' +
		'todos portion of state and the action', function() {
			expect(todosSpy.args[0]).to.deep.include(testState.todos);
			expect(todosSpy.args[0]).to.deep.include({type: 'UNRECOGNIZED'});
		});

		it('does NOT call the todos reducer with the ' +
			'visibilityFilter portion of state', function() {
			expect(todosSpy.args[0]).to.not.include('SHOW_COMPLETED');
		});

		it('returns the new state object which includes the properties ' +
			'"visibilityFilter" and "todos"', function() {
			expect(returnedState).to.have.property('todos');
			expect(returnedState).to.have.property('visibilityFilter');
		});
	});
});

describe('createStore', function() {
	var combinedReducers = combineReducers({
		todos: todos,
		visibilityFilter: visibilityFilter
	});
	var reducersSpy = sinon.spy(combinedReducers);
	var returnedStore = createStore(reducersSpy);

	it('returns an object with the methods "getState", "dispatch", and "subscribe"', function() {
		expect(returnedStore).to.be.an.instanceof(Object);

		expect(returnedStore.getState).to.be.an.instanceof(Function);
		expect(returnedStore.dispatch).to.be.an.instanceof(Function);
		expect(returnedStore.subscribe).to.be.an.instanceof(Function);
	});

	it('initializes state to its default value by calling the reducers', function() {
		var defaultState = {
			todos: [],
			visibilityFilter: 'SHOW_ALL'
		};

		expect(returnedStore.getState()).to.deep.equal(defaultState);
		expect(reducersSpy.calledOnce).to.be.true;
	});

	describe('subscribe', function() {
		var mockAction = {
			type: 'IRRELEVANT'
		};
		it('takes a callback function which will be invoked each time an action ' +
			'is dispatched', function(done) {
			var mockCallback = function() {
				removeCallback();
				done();
			};
			var removeCallback = returnedStore.subscribe(mockCallback);
			returnedStore.dispatch(mockAction);
		});

		it('returns a function for removing the listener which it was called with', function() {
			var mockCallback = sinon.spy();

			var removeListener = returnedStore.subscribe(mockCallback);
			returnedStore.dispatch(mockAction);
			expect(mockCallback.calledOnce).to.be.true;

			removeListener();
			returnedStore.dispatch(mockAction);
			expect(mockCallback.calledTwice).to.be.false;
		});
	});

	describe('dispatch', function() {
		var mockAction = {
			type: 'IRRELEVANT'
		};
		it('calls the reducer passed to createStore with the arguments state and ' +
			'the action passed to it', function() {
			reducersSpy.resetHistory();
			expect(reducersSpy.notCalled).to.be.true;
			var state = returnedStore.getState();

			returnedStore.dispatch(mockAction);
			expect(reducersSpy.calledOnce).to.be.true;
			expect(reducersSpy.args[0]).to.deep.include(state);
			expect(reducersSpy.args[0]).to.deep.include(mockAction);
		});

		it('calls every callback which was registered with subscribe', function() {
			var mockCallback1 = sinon.spy();
			var mockCallback2 = sinon.spy();

			var unsubscribe1 = returnedStore.subscribe(mockCallback1);
			var unsubscribe2 = returnedStore.subscribe(mockCallback2);

			returnedStore.dispatch(mockAction);

			expect(mockCallback1.calledOnce).to.be.true;
			expect(mockCallback2.calledOnce).to.be.true;

			unsubscribe1();
			unsubscribe2();
		});
	});
});