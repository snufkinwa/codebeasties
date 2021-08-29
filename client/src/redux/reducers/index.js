import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import bug from './bugReducer'


export default combineReducers({
    auth,
    token,
    users, 
    bug

})