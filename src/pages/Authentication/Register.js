import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { groupID } from '../../settings/config';
import { qlNguoiDungService } from '../../services/quanLyNguoiDungService'
import swal from 'sweetalert';

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
        const newErrors = { ...state.errors };
        // console.log(newErrors)
        if (name === 'taiKhoan') {
            let regexUsername = /^[a-zA-Z0-9.\-_$@*!]{8,20}$/;
            if (value.trim() === '') {
                newErrors.taiKhoan = 'Không được bỏ trống';
            }
            else if (!value.match(regexUsername)) {
                newErrors.taiKhoan = 'Tên tài khoản gồm các ký tự viết liền không dấu, từ 8-20 ký tự'
            }
            else {
                newErrors.taiKhoan = ''
            }
        }
        if (name === 'matKhau') {
            let regexPassword = /^[a-zA-Z0-9.\-_$@*!]{9,20}$/;
            if (value.trim() === '') {
                newErrors.matKhau = 'Không được bỏ trống';
            }
            else if (!value.match(regexPassword)) {
                newErrors.matKhau = 'Mật gồm các ký tự viết liền không dấu, từ 9-20 ký tự'
            }
            else {
                newErrors.matKhau = ''
            }
        }
        if (name === 'hoTen') {
            if (value.trim() === '') {
                newErrors.hoTen = 'Không được bỏ trống';
            }
        }
        if (name === "soDt") {
            let regexNumber = /^[0-9]+$/;
            if (value.trim() === '') {
                newErrors.soDt = 'Không được bỏ trống';
            }
            else if (!value.match(regexNumber)) {
                newErrors.soDt = 'Số điện thoại không hợp lệ';
            }
            else {
                newErrors.soDt = ''
            }
        }
        if (name === "email") {
            let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (value.trim() === '') {
                newErrors.email = 'Không được bỏ trống';
            }
            else if (!value.match(regexEmail)) {
                newErrors.email = 'Email không hợp lệ';
            }
            else {
                newErrors.email = ''
            }
        }
        // console.log(newErrors)
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
            swal('Oops', 'Thông tin không hợp lệ!', "error", {
                buttons: false,
                timer: 1500,
            });
            return;
        }
        //Gọi api hoặc dispatch redux
        qlNguoiDungService.dangKy(state.values).then(res => {
            // console.log(res.data);
            swal('', "Đăng ký thành công", "success", {
                buttons: false,
                timer: 1500,
            });
            props.history.goBack();
        }).catch(err => {
            // console.log(err.response.data);
            swal('Oops', err.response.data, "error", {
                buttons: false,
                timer: 1500,
            });
        })
    }



    return (
        <form className="container" onSubmit={handleSubmit} className="register" style={{ width: '500px' }}>
            <a className="navbar-brand" href="#"><img src={"./images/cybersoftlogo.png"} style={{ width: 45, height: 45 }} /></a>
            <h4>Đăng ký</h4>
            <div className="row">
                <div className="form-group col-6">
                    <span>Họ tên</span>
                    <input className="form-control" name="hoTen" onChange={handleChangeInput} />
                    <span className="text-danger">{state.errors.hoTen}</span>
                </div>
                <div className="form-group col-6">
                    <span>Số điện thoại</span>
                    <input className="form-control" name="soDt" onChange={handleChangeInput} />
                    <span className="text-danger">{state.errors.soDt}</span>

                </div>

            </div>
            <div className="row">
            <div className="form-group col-6">
                    <span>Tài khoản</span>
                    <input className="form-control" name="taiKhoan" onChange={handleChangeInput} />
                    <span className="text-danger">{state.errors.taiKhoan}</span>
                </div>
                
                <div className="form-group col-6">
                    <span>Email</span>
                    <input className="form-control" name="email" onChange={handleChangeInput} />
                    <span className="text-danger">{state.errors.email}</span>

                </div>
            </div>
            <div className="row">
            <div className="form-group col-6">
                    <span>Mật khẩu</span>
                    <input type="password" className="form-control" name="matKhau" onChange={handleChangeInput} />
                    <span className="text-danger">{state.errors.matKhau}</span>
                </div>
                
                <div className="form-group btnSubmit col-6">
                    <button type="submit" className="btn btn-success">Đăng ký</button>
                </div>

            </div>
            <div className="directToLogin">
                <span>Đã có tài khoản?</span>
                <NavLink to="/login"> Đăng nhập ngay!</NavLink>
            </div>


        </form>
    )
}
