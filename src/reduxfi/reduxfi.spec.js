// Test Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');

// Functions to Test
var redux = require('./reduxfi.js');
var combineReducers = redux.combineReducers;
var createStore = redux.createStore;

// Functions to Facilitate Test
var reducers = require('../reducers/reducers.js');
var todos = reducers.todos;
var visibilityFilter = reducers.visibilityFilter;

describe('redux', function() {
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
});
