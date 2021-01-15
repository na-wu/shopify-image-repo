import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import imageReducer from './reducers/imageReducer'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const middleware = [thunk]
const initialState = {
  images: [
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  ],
  labels: [
    "Test_Label_1"
  ]
};

// const store = createStore(
//   rootReducer,
//   // initialState,
//   applyMiddleware(...middleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(imageReducer, initialState, applyMiddleware(...middleware))}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
