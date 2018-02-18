# Overview
This app covers some of the fundamental features of Redux including:
- state as a single, immutable, JS object
- reducers
- actions
- action creators

In the interest of having a deeper understand of Redux's functionality, this app creates some of Redux's most important functions from scratch, including the functions `createStore` and `combineReducers`.

This app borrows heavily from a video series (especially episodes 1 - 17) produced by the creator of Redux, Dan Abramov.
The series is hosted by egghead.io and is available to watch for free at https://egghead.io/courses/getting-started-with-redux. This application departs from the Redux videos in so far as it uses vanilla JS to manipulate the DOM rather than React.
# Getting Started
To get started running the app, all that you'll need to to is run `npm install` to download all the necessary node_modules.
# Serve
To serve the app, use `npm run serve`.
This app uses webpack to bundle the code and webpack-dev-server to serve it.
Running `npm run serve` will open a new browser tab or window and navigate to
localhost:8081.
# Test
To run the tests in the test directory, use `npm test`.
Test files are designated by `*.spec.js` and reside in the same directory as the files that they test.
# Learn By Coding
I personally find that the best way to learn something is to build it myself. For that reason, I've created a branch called 'incomplete' that's intended for you to code yourself. The definitions of all the necessary functions are still in place, but I've removed all of their logic. I've left the directory 'helpers' in place because they handle things like DOM manipulation and other functionality that I don't think will be beneficial to learning Redux. I've attempted to write and organize the tests in such a way that they can be used to guide you through writing all the necessary code yourself. To get started, simply run `npm test` and work your way through getting the tests to pass. If anything is unclear, please reach out to me so that I can make improvements. Thanks!