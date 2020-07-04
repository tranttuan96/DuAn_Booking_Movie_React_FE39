import React, { Component } from 'react'

import { BrowserRouter, Switch } from 'react-router-dom'
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import Admin from './pages/Admin'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import ShowTime from './pages/ShowTime';
import Login from './pages/Login'
import { LoginTemplate } from './templates/LoginTemplate/LoginTemplate';
import Register from './pages/Register';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <LoginTemplate exact path='/login' component={Login} />
          <LoginTemplate exact path='/register' component={Register} />
          <HomeTemplate exact path='/' component={Home} />
          <HomeTemplate exact path='/home' component={Home} />
          <AdminTemplate exact path='/admin' component={Admin} />
          <HomeTemplate exact path='/moviedetail/:maPhim' component={MovieDetail} />
          <HomeTemplate exact path='/showtime/:maLichChieu' component={ShowTime} />

        </Switch>
      </BrowserRouter>
    )
  }
}
