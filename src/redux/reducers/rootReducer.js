import {combineReducers} from 'redux'
import quanLyNguoiDungReducer from './quanLyNguoiDungReducer'
import quanLyDatGheReducer from './quanLyDatGheReducer'

const rootReducer = combineReducers({
    quanLyNguoiDungReducer,
    quanLyDatGheReducer
});

export default rootReducer;