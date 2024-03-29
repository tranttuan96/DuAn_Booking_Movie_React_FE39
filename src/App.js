import React, { Component } from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import Admin from './pages/Admin/Admin'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/User/Homepage/Home';
import MovieDetail from './pages/User/MovieDetail/MovieDetail';
import ShowTime from './pages/User/Showtime/ShowTime';
import Login from './pages/Authentication/Login'
import { LoginTemplate } from './templates/LoginTemplate/LoginTemplate';
import Register from './pages/Authentication/Register';
import CinemaDetail from './pages/User/CinemaDetail/CinemaDetail';
import UserDetail from './pages/User/UserDetail/UserDetail';
import ManageMovie from './pages/Admin/Movie/ManageMovie';
import AddMovie from './pages/Admin/Movie/AddMovie';
import ManageUser from './pages/Admin/User/ManageUser';
import AddUser from './pages/Admin/User/AddUser';
import { ShowTimeTemplate } from './templates/ShowTimeTemplate/ShowTimeTemplate';

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
          <AdminTemplate exact path='/admin/quanlyphim' component={ManageMovie} />
          <AdminTemplate exact path='/admin/themphim' component={AddMovie} />
          <AdminTemplate exact path='/admin/quanlynguoidung' component={ManageUser} />
          <AdminTemplate exact path='/admin/themnguoidung' component={AddUser} />
          <HomeTemplate exact path='/moviedetail/:maPhim' component={MovieDetail} />
          <HomeTemplate exact path='/cinemadetail/:maHeThongRap/:maCumRap' component={CinemaDetail} />
          <HomeTemplate exact path='/userdetail' component={UserDetail} />
          <ShowTimeTemplate exact path='/showtime/:maLichChieu' component={ShowTime} />
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    )
  }
}
