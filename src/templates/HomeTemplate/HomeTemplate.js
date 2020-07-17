import React, { Fragment, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import './HomeTemplate.scss'
import { useSelector } from 'react-redux'


import { Layout, Affix } from 'antd';
import { Menu } from 'antd';

const { Header, Footer, Content } = Layout;

// const HomeHeader = () => {
//     const [top, setTop] = useState();
//     return (
//         <Affix offsetTop={top} >
//           <Header></Header>
//         </Affix>
//     );
//   };



const HomeLayout = (props) => {

    const taiKhoan = useSelector((state) => state.quanLyNguoiDungReducer.taiKhoan)

    const renderLogin = () => {
        if (taiKhoan !== '') {
            return <NavLink className="nav-link" to="/">Hello ! {taiKhoan}</NavLink>
        }
        return <NavLink className="nav-link" to="/login">Đăng nhập</NavLink>
    }


    return (
        <Fragment>
            <Layout>
                <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
                    <Header>
                        <div className="navbar navbar-expand-md navbar-light">
                            <div className="header__left col-2">
                                <a className="navbar-brand" href="#"><img src={"./images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /></a>
                            </div>
                            <div className="header__center col-8">
                                <ul className="navbar-nav">
                                    <li className="nav-item header__business">
                                        <a className="nav-link" href="#">Lịch chiếu</a>
                                    </li>
                                    <li className="nav-item header__teach">
                                        <a className="nav-link " href="#">Cụm rạp</a>
                                    </li>
                                    <li className="nav-item header__teach">
                                        <a className="nav-link " href="#">Tin tức</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="header__right col-2">
                            {renderLogin()}
                            </div>
                        </div>
                    </Header>
                </Affix>
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