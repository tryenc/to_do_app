# Overview
This app covers some of the fundamental features of Redux including:
- state as a single, immutable, JS object
- reducers
- actions
- action creators

In the interest of having a deeper understand of Redux's functionality, this app create some of Redux's most important functions from scratch, including the functions `createStore` and `combineReducers`.

This app borrows heavily from a video series (especially episodes 1 - 17) produced by the creator of Redux, Dan Abramov.
The series is hosted by egghead.io and is free to watch. Please find the videos here: https://egghead.io/courses/getting-started-with-redux. This application departs from the Redux videos in so far as it uses vanilla JS to manipulate the DOM rather than React.
# Serve
To serve the app, use `npm run serve`.
This app uses webpack to bundle the code and webpack-dev-server to serve it.
Running `npm run serve` will open a new browser tab or window and navigate to
localhost:8081.
# Test
To run the tests in the test directory, use `npm test`.
Test files are designated by `*.spec.js` and reside in the same directory as the files that they test.