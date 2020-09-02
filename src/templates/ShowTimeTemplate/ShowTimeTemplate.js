import React, {Fragment } from "react";
import { Route, NavLink } from "react-router-dom";
import './ShowTimeTemplate.scss'

import { Layout } from 'antd';

import'./ShowTimeTemplate.scss'
import ShowLogin from "../TemplateComponent/ShowLogin";

const { Header, Content } = Layout;

const ShowTimeLayout = (props) => {

    return (
        <Fragment>
            <Layout className="showTimeTemplate">
                <Header>
                    <nav className="navbar navbar-expand-md navbar-light">
                        <div className="header__left">
                            <NavLink className="navbar-brand" to='/'><img src={"/images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /></NavLink>
                        </div>
                        <div className="header__right">
                            <ShowLogin></ShowLogin>
                        </div>
                    </nav>
                </Header>
                <Content>
                    {props.children}
                </Content>
            </Layout>
        </Fragment>
    );
};

export const ShowTimeTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
            <ShowTimeLayout>
                <props.component {...propsComponent} />
            </ShowTimeLayout>
        )}
    />
);