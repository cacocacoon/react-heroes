import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import * as reducers from '../reducers'
import thunk from 'redux-thunk'

const reducer = combineReducers(reducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = process.env.NODE_ENV === 'production' ?
	createStore(reducer, applyMiddleware(thunk)) :
	createStore(reducer, composeEnhancers(applyMiddleware(thunk))
)

export default store