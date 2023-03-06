# About this project

This is a project that consists in a little webapp that allows the user to search and listen
to the top 100 podcasts of iTunes.

It was part of a technical test of a selection process for a Frontend position, done by Pedro Padilla.

## Tools used to create it

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.
You can also check all the libraries used in the package.json, and its also important to notice that
itunes API was used for podcasts info, and cors-anywhere.herokuapp.com was used for CORS.

## Available Scripts

In the project directory, you can run:

### `npm start` - For development mode

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build` - For production mode

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### How to deploy in production mode

After building the app with `npm run build`, you may serve it with a static server, running
`npm install -g serve` and `serve -s build`.
