import React, {useState, useEffect, Fragment } from "react";
import { Route, NavLink } from "react-router-dom";
import './HomeTemplate.scss'
import { useSelector } from 'react-redux'

import { Layout } from 'antd';
import { userLogin, accessToken } from "../../settings/config";
import { useDispatch } from 'react-redux'
import { dangNhapAction } from '../../redux/actions/quanLyNguoiDungAction'

const { Header, Footer, Content } = Layout;

const HomeLayout = (props) => {

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
            return <div className="dropdown">
                <div className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <NavLink className="nav-link" to="/">Hello ! {taiKhoan}</NavLink>
                </div>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <NavLink className="dropdown-item" to="/userdetail">Quản lý Tài khoản</NavLink>
                    <NavLink className="dropdown-item" to="/" onClick={() => { dangXuat() }}>Đăng xuất</NavLink>
                </div>
            </div>
        }
        return <NavLink className="nav-link" to="/login">Đăng nhập</NavLink>
    }


    return (
        <Fragment>
            <Layout className="homePage">
                <Header>
                    <nav className="navbar navbar-expand-md navbar-light">
                        <div className="header__left col-2">
                            <a className="navbar-brand" href="#"><img src={"./images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /></a>
                        </div>
                        <div className="header__center col-8" id="movieMenu">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Lịch chiếu</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link " href="#">Cụm rạp</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href="#">Tin tức</a>
                                </li>
                            </ul>
                        </div>
                        <div className="header__right col-2">
                            {renderLogin()}
                        </div>
                    </nav>
                </Header>
                <Content>
                    {props.children}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Fragment>
    );
};

export const HomeTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
            <HomeLayout>
                <props.component {...propsComponent} />
            </HomeLayout>
        )}
    />
);