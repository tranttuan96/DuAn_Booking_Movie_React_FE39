import React, { useState } from 'react'
import { qlNguoiDungService } from '../../services/quanLyNguoiDungService'
import { useDispatch } from 'react-redux'
import { dangNhapAction } from '../../redux/actions/quanLyNguoiDungAction'
import { NavLink } from 'react-router-dom';
import { userLogin, accessToken } from '../../settings/config';

export default function Login(props) {

    const dispatch = useDispatch();
    let [state, setState] = useState({
        values: {
            taiKhoan: '',
            matKhau: '',
        },
        errors: {
            taiKhoan: '',
            matKhau: '',
        }
    });

    const handleChange = (event) => {
        let { name, value } = event.target;
        const newValues = { ...state.values, [name]: value };
        const newErrors = { ...state.errors, [name]: value.trim() === '' ? 'Không được bỏ trống' : '' };
        //Gọi set lại state của hook
        setState(
            {
                values: newValues,
                errors: newErrors
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        qlNguoiDungService.dangNhap(state.values).then(res => {
            //Lưu vào localStorage
            localStorage.setItem(userLogin, JSON.stringify(res.data))
            localStorage.setItem(accessToken, res.data.accessToken);
            //dispatch lên reducer
            dispatch(dangNhapAction(res.data.taiKhoan))
            // setTaiKhoanLogin(res.data.taiKhoan);
            props.history.goBack();
        }).catch(error => {
            console.log('error', error.response.data)
        })
    }

    // console.log(taiKhoanLogin)

    return (
            <form onSubmit={handleSubmit} className="login">
                <a className="navbar-brand" href="#"><img src={"./images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /></a>
                <h3>Đăng nhập</h3>
                <div className="form-group">
                    <span>Tài khoản</span>
                    <input name="taiKhoan" className="form-control" onChange={handleChange} />
                    <span className="text text-danger">{state.errors.taiKhoan}</span>
                </div>
                <div className="form-group">
                    <span>Mật khẩu</span>
                    <input type="password" name="matKhau" className="form-control" onChange={handleChange} />
                    <span className="text text-danger">{state.errors.matKhau}</span>
                </div>
                <div className="form-group">
                    <button className="btn btn-success">Đăng nhập</button>
                </div>
                <div className="form-group">
                    <span>Bạn chưa có tài khoản ?</span> 
                    <NavLink to="/register">Đăng ký ngay!</NavLink>
                </div>
            </form>
    )
}
