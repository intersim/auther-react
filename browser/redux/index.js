import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import setCurrentUser from './auth';

export default combineReducers({ users, stories, currentUser: setCurrentUser });