import React, { useState, useEffect, Fragment } from "react";
import { Route, NavLink } from "react-router-dom";
import { userLogin, accessToken } from "../../settings/config";
import { useSelector, useDispatch } from 'react-redux'
import { dangNhapAction } from '../../redux/actions/quanLyNguoiDungAction'
import './HomeTemplate.scss'


import { Layout } from 'antd';
import ShowLogin from "../TemplateComponent/ShowLogin";

const { Header, Footer, Content } = Layout;

const HomeLayout = (props) => {

    const taiKhoan = useSelector((state) => state.quanLyNguoiDungReducer.taiKhoan)

    const dispatch = useDispatch();

    const dangXuat = () => {
        // console.log(taiKhoan)
        localStorage.removeItem(userLogin)
        localStorage.removeItem(accessToken)
        dispatch(dangNhapAction(localStorage.getItem(userLogin)))
    }

    const renderResponsiveMenu = () => {
        if (taiKhoan !== null && taiKhoan !== undefined) {
            return <div className="collapse navbar-collapse" id="myMenu">
                <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            <img className="avatar" src={"/images/avatar-login.jpg"}></img>
                            {taiKhoan}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/userdetail">
                            Quản lý Tài khoản
                    </NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#movieList">Lịch chiếu</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link " href="#cinemaList">Cụm rạp</a>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/home" onClick={() => { dangXuat() }}>
                            Đăng xuất
                        </NavLink>
                    </li>
                </ul>
            </div>
        }
        return <div className="collapse navbar-collapse" id="myMenu">
            <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                <li className="nav-item">
                    <NavLink className="nav-link chuaDangNhap" to="/login">
                        <img className="avatar" src={"/images/avatar-logout.png"}></img>
                        Đăng nhập
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#movieList">Lịch chiếu</a>
                </li>
                <li className="nav-item ">
                    <a className="nav-link " href="#cinemaList">Cụm rạp</a>
                </li>
            </ul>
        </div>
    }

    return (
        <Fragment>
            <Layout className="homePage">
                <Header>
                    <nav className="navbar navbar-expand-md navbar-light">
                        <div className="header__left col-4">

                            <NavLink className="navbar-brand" to='/'><img src={"/images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /></NavLink>
                        </div>

                        <div className="header__center col-4 d-none d-md-flex" id="movieMenu">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#movieList">Lịch chiếu</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link " href="#cinemaList">Cụm rạp</a>
                                </li>
                            </ul>
                        </div>
                        <div className="header__right col-4 d-none d-md-flex">
                            <ShowLogin></ShowLogin>
                        </div>
                        <button className="navbar-toggler responsiveMenuButton" type="button" data-toggle="collapse" data-target="#myMenu"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="responsiveMenu d-flex d-md-none col-8">
                            {renderResponsiveMenu()}
                        </div>
                    </nav>
                </Header>
                <Content>
                    {props.children}
                </Content>
                <Footer>
                    <div className="footer__wrapper">
                        <div className="footer__topContent row">
                            <div className='col-4 info'>
                                <p>DỰ ÁN ĐẶT VÉ</p>
                                <div className="row">
                                    <div className='d-none d-lg-block col-6'>
                                        <a>FAQ</a>
                                        <a>Brand Guidelines</a>
                                    </div>
                                    <div className='col-6'>
                                        <a>Thỏa thuận sử dụng</a>
                                        <a>Chính sách bảo mật</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 partner d-none d-lg-block'>
                                <p>ĐỐI TÁC</p>
                                <div className="linePartner">
                                    <a><img src={"/images/footerImg/1.png"}></img></a>
                                    <a><img src={"/images/footerImg/2.png"}></img></a>
                                    <a><img src={"/images/footerImg/3.png"}></img></a>
                                    <a><img src={"/images/footerImg/4.png"}></img></a>
                                    <a><img src={"/images/footerImg/5.png"}></img></a>
                                </div>
                                <div className="linePartner">
                                    <a><img src={"/images/footerImg/6.png"}></img></a>
                                    <a><img src={"/images/footerImg/7.jpg"}></img></a>
                                    <a><img src={"/images/footerImg/8.png"}></img></a>
                                    <a><img src={"/images/footerImg/9.png"}></img></a>
                                    <a><img src={"/images/footerImg/10.jpg"}></img></a>
                                </div>
                                <div className="linePartner">
                                    <a><img src={"/images/footerImg/11.png"}></img></a>
                                    <a><img src={"/images/footerImg/12.png"}></img></a>
                                    <a><img src={"/images/footerImg/13.png"}></img></a>
                                    <a><img src={"/images/footerImg/14.jpg"}></img></a>
                                    <a><img src={"/images/footerImg/15.png"}></img></a>
                                </div>
                                <div className="linePartner">
                                    <a><img src={"/images/footerImg/16.png"}></img></a>
                                    <a><img src={"/images/footerImg/17.png"}></img></a>
                                    <a><img src={"/images/footerImg/18.png"}></img></a>
                                    <a><img src={"/images/footerImg/19.png"}></img></a>
                                    <a><img src={"/images/footerImg/20.png"}></img></a>
                                </div>
                            </div>
                            <div className='col-4 col-lg-2 appMobile'>
                                <p>MOBILE APP</p>
                                <a><img src={"/images/footerImg/apple-logo.png"}></img></a>
                                <a><img src={"/images/footerImg/android-logo.png"}></img></a>
                            </div>
                            <div className='col-4 col-lg-2 social'>
                                <p>SOCIAL</p>
                                <a><img src={"/images/footerImg/facebook-logo.png"}></img></a>
                                <a><img src={"/images/footerImg/zalo-logo.png"}></img></a>
                            </div>
                        </div>
                        <div className="footer__bottomContent">
                            <a className="navbar-brand" href="#"><img src={"/images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /></a>
                            <span>CYBERSOFT - FRONTEND 39 - DỰ ÁN ĐẶT VÉ XEM PHIM</span>
                        </div>
                    </div>
                </Footer>
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