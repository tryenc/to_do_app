// Test Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');

// Functions to Test
var actionCreators = require('./action-creators.js');
var addTodo = actionCreators.addTodo;
var setVisibilityFilter = actionCreators.setVisibilityFilter;

describe('action creators', function() {
	describe('addTodo', function() {
		var textArgument = 'create a todo action';
		var addTodoAction = addTodo(textArgument);

		it('returns an object with the property "type" set to "ADD_TODO"', function() {
			expect(addTodoAction).to.have.property('type', 'ADD_TODO');
		});

		it('returns an object with the property "text" set to the text ' +
			'that was passed as an argument', function() {
			expect(addTodoAction).to.have.property('text', textArgument);
		});

		it('returns an object with a unique "id" property', function() {
			var anotherAddTodoAction = addTodo('create a second todo action');

			expect(addTodoAction).to.have.property('id');
			expect(addTodoAction.id).to.not.equal(anotherAddTodoAction.id);
		});
	});

	describe('setVisibilityFilter', function() {
		var filterArgument = 'SHOW_COMPLETED';
		var setVisibilityFilterAction = setVisibilityFilter(filterArgument);

		it('returns an object with the property "type" set to "SET_VISIBILITY_FILTER"', function() {
			expect(setVisibilityFilterAction).to.have.property('type', 'SET_VISIBILITY_FILTER');
		});

		it('returns an object with the property "filter" set to the filter ' +
			'that was passed as an argument', function() {
			expect(setVisibilityFilterAction).to.have.property('filter', filterArgument);
		});
	});
});
