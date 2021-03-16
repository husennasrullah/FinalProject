import { combineReducers } from "redux"
import Auth from "./auth"

const allReducers = combineReducers({
    Auth: Auth,
})

export default allReducers