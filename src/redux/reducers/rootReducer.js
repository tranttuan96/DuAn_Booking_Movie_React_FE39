import {combineReducers} from 'redux'
import quanLyNguoiDungReducer from './quanLyNguoiDungReducer'
import quanLyDatGheReducer from './quanLyDatGheReducer'
import quanLyTrailerReducer from './quanLyTrailerReducer'

const rootReducer = combineReducers({
    quanLyNguoiDungReducer,
    quanLyDatGheReducer,
    quanLyTrailerReducer
});

export default rootReducer;