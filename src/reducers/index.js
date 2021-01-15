import { combineReducers } from 'redux';
import labelReducer from './labelReducer';
import imageReducer from './imageReducer';

export default combineReducers({
    labels: labelReducer,
    images: imageReducer
  });