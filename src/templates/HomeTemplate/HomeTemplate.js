import React, { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import './HomeTemplate.scss'

import { Layout, Affix, Button } from 'antd';

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
    return (
        <Fragment>
            <Layout>
                <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
                    <Header>
                        <div className="row">
                            <div className="col-4 text-center">
                                <img src={"./images/cybersoftlogo.png"} style={{width:50}}/>
                            </div>
                            <div className="col-4">

                            </div>
                            <div className="col-4">

                            </div>
                        </div>

                    </Header>
                </Affix>,
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