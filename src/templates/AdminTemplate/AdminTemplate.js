import React, { Fragment } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import { userLogin, accessToken } from "../../settings/config";
import { useDispatch } from 'react-redux'
import { dangNhapAction } from '../../redux/actions/quanLyNguoiDungAction'

import { Layout, Menu, Breadcrumb } from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import "./AdminTemplate.scss";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const AdminLayout = (props) => {

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
            <Layout className="admin">
                <Header>
                    <nav className="navbar navbar-expand-md navbar-light">
                        <div className="header__left col-2">
                            <NavLink className="navbar-brand" to='/admin'><img src={"./images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /> ADMIN</NavLink>
                        </div>
                        <div className="header__center col-8" id="movieMenu"></div>
                        <div className="header__right col-2">
                            {renderLogin()}
                        </div>
                    </nav>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1"]}
                            style={{ height: "100%", borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title="Bảng điều khiển">
                            <Menu.Item key="quanLyPhim"><NavLink className="nav-link" to="/admin/quanlyphim">Quản lý phim</NavLink></Menu.Item>
                            {/* <Menu.Item key="9"><NavLink className="nav-link" to="/admin/quanlyphim">Quản lý người dùng</NavLink></Menu.Item> */}
                            <Menu.Item key="quanLyNguoiDung"><NavLink className="nav-link" to="/admin/quanlynguoidung">Quản lý người dùng</NavLink></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: "12px 12px 12px",  }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                border:".5px solid rgba(34, 36, 38, 0.15)",
                                borderRadius:"5px",
                                boxShadow: "0px 1px 2px 0 rgba(34, 36, 38, 0.15)"
                            }}
                        >
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </Fragment>
    );
};

export const AdminTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => {
            const userLogin = localStorage.getItem('userLogin')
            const userLoginData = JSON.parse(userLogin)
            if (userLogin) {
                if (userLoginData.maLoaiNguoiDung === 'QuanTri') {
                    return <AdminLayout>
                        <props.component {...propsComponent} />
                    </AdminLayout>
                }
                return <Redirect to="/" />
            }
            return <Redirect to="/login" />
        }}
    />
);
