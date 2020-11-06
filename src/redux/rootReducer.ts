import { combineReducers } from 'redux';
import formatAction from './nginx'

const reducers = {
    formatAction,
}

export default combineReducers(reducers)