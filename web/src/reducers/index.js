import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth-reducer';
import blogs from './blogs-reducer';

export default combineReducers({
  auth,
  form,
  blogs
});
