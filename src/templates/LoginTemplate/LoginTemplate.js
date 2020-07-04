import React, { Fragment } from 'react';
import { Route } from "react-router-dom"; 
import './LoginTemplate.scss'

const LoginLayout = (props) => {
    return (
        <Fragment>
            <div className="login__background">
                {props.children}
            </div>
        </Fragment>
    )
}

export const LoginTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
            <LoginLayout>
                <props.component {...propsComponent} />
            </LoginLayout>
        )}
    />
);