import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { groupID } from '../settings/config';
import { qlNguoiDungService } from '../services/quanLyNguoiDungService'


export default function Register(props) {

    let [state, setState] = useState({
        values: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: groupID,
            maLoaiNguoiDung: 'KhachHang',
            hoTen: '',
        },
        errors: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: '',
            maLoaiNguoiDung: '',
            hoTen: '',
        }
    });

    const handleChangeInput = (event) => {
        let { value, name } = event.target;
        //Tạo ra object this.state.values mới
        const newValues = {
            ...state.values,
            [name]: value
        }


        //Xét trường hợp rổng
        //Tạo ra object this.state.errors mới
        const newErrors = { ...state.errors, [name]: value.trim() === '' ? 'Không được bỏ trống' : '' };

        //Xét email
        if (name === 'email') {
            let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (value.match(regexEmail)) {
                newErrors.email = '';
            } else {
                newErrors.email = 'Email không hợp lệ !';
            }
        }

        //setState lại values và errors
        setState({ values: newValues, errors: newErrors });
    };

    const handleSubmit = (event) => {
        //Chặn sự kiện load lại trang từ form submit
        event.preventDefault();
        let { values, errors } = state;
        let valid = true;
        for (let key in values) {
            if (values[key] === '') { //Nếu như có 1 values = rổng thì không hợp lệ
                valid = false;
            }
        }
        //check errors
        for (let key in errors) {
            if (errors[key] !== '') { //Nếu như có 1 errrors != rổng => còn lỗi
                valid = false;
            }
        }
        if (!valid) {
            alert('Thông tin không hợp lệ!');
            return;
        }
        //Gọi api hoặc dispatch redux
        qlNguoiDungService.dangKy(state.values).then(res => {
            console.log(res.data);
            props.history.goBack();
        }).catch(err => {
            console.log(err.response.data);
        })
    }



    return (
        <form className="container" onSubmit={handleSubmit} className="register">
            <a className="navbar-brand" href="#"><img src={"./images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /></a>
            <h3 className="display-4">Đăng ký</h3>
            <div className="form-group">
                <span>Họ tên</span>
                <input className="form-control" name="hoTen" onChange={handleChangeInput} />
                <span className="text-danger">{state.errors.hoTen}</span>
            </div>
            <div className="form-group">
                <span>Tài khoản</span>
                <input className="form-control" name="taiKhoan" onChange={handleChangeInput} />
                <span className="text-danger">{state.errors.taiKhoan}</span>

            </div>

            <div className="form-group">
                <span>Mật khẩu</span>
                <input type="password" className="form-control" name="matKhau" onChange={handleChangeInput} />
                <span className="text-danger">{state.errors.matKhau}</span>

            </div>
            <div className="form-group">
                <span>Email</span>
                <input className="form-control" name="email" onChange={handleChangeInput} />
                <span className="text-danger">{state.errors.email}</span>

            </div>
            <div className="form-group">
                <span>Số điện thoại</span>
                <input className="form-control" name="soDt" onChange={handleChangeInput} />
                <span className="text-danger">{state.errors.soDienThoai}</span>

            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success">Đăng ký</button>
            </div>
            <div className="form-group">
                <span>Đã có tài khoản ?</span>
                <NavLink to="/login">Đăng nhập ngay!</NavLink>
            </div>
        </form>
    )
}
