import React, { Fragment } from 'react'
import { NavLink } from "react-router-dom";
import { userLogin, accessToken } from "../../settings/config";
import { useSelector, useDispatch } from 'react-redux'
import { dangNhapAction } from '../../redux/actions/quanLyNguoiDungAction'

import './ShowLogin.scss'

export default function ShowLogin(props) {

    const taiKhoan = useSelector((state) => state.quanLyNguoiDungReducer.taiKhoan)

    const dispatch = useDispatch();

    const dangXuat = () => {
        console.log(taiKhoan)
        localStorage.removeItem(userLogin)
        localStorage.removeItem(accessToken)
        dispatch(dangNhapAction(localStorage.getItem(userLogin)))
    }

    const renderLogin = () => {
        console.log(taiKhoan)
        if (taiKhoan !== null && taiKhoan !== undefined) {
            return <div className="showLogin">
            <img className="avatar" src={"/images/avatar-login.jpg"}></img>
            <div className="dropdown daDangNhap">
                <div className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <NavLink className="nav-link" to="/">{taiKhoan}</NavLink>
                </div>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <NavLink className="dropdown-item" to="/userdetail">Quản lý Tài khoản</NavLink>
                    <NavLink className="dropdown-item" to="/" onClick={() => { dangXuat() }}>Đăng xuất</NavLink>
                </div>
            </div>
        </div>
        }
        return <div className="showLogin">
            <img className="avatar" src={"/images/avatar-logout.png"}></img>
            <NavLink className="nav-link chuaDangNhap" to="/login">Đăng nhập</NavLink>
        </div>

    }

    return (
        <Fragment>
            {renderLogin()}
        </Fragment>
    )
}
