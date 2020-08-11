import React, { useState } from 'react'
import { groupID } from '../../../settings/config';
import swal from 'sweetalert';
import { qlNguoiDungService } from '../../../services/quanLyNguoiDungService'
import { NavLink } from 'react-router-dom';

export default function AddUser() {

    let [dataThemUser, setDataThemUser] = useState({
        values: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maLoaiNguoiDung: "KhachHang",
            hoTen: ""
        },
        errors: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maLoaiNguoiDung: "",
            hoTen: ""
        }
    })

    const handleChange = (event) => {
        let { value, name } = event.target;

        const newValues = {
            ...dataThemUser.values,
            [name] : value
        }
        const newErrors = {
            ...dataThemUser.errors,
        }
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
        setDataThemUser({ values: newValues, errors: newErrors });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let { values, errors } = dataThemUser;
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
            swal("Oops", "Bạn chưa điền đầy đủ thông tin hoặc có thông tin chưa hợp lệ!", "error", {
                buttons: false,
                timer: 2000,
            });
            return;
        }
        console.log('succcess')
        qlNguoiDungService.themNguoiDung(values).then(res => {
            console.log(res.data);
            swal('', "Thêm người thành công", "success", {
                buttons: false,
                timer: 1500,
            });
        }).catch(err => {
            console.log(err.response.data);
            swal('Oops', err.response.data, "error", {
                buttons: false,
                timer: 1500,
            });
        })
    }


    return (
        <form onSubmit={handleSubmit} className="container">
            <h3 className="text-center">
                THÊM NGƯỜI DÙNG
                    </h3>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label>Tài khoản *</label>
                        <input name="taiKhoan" className="form-control" onChange={handleChange} />
                        <span className="text-danger">{dataThemUser.errors.taiKhoan}</span>
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu *</label>
                        <input type="password" name="matKhau" className="form-control" onChange={handleChange} />
                        <span className="text-danger">{dataThemUser.errors.matKhau}</span>
                    </div>
                    <div className="form-group">
                        <label>Họ Tên *</label>
                        <input name="hoTen" className="form-control" onChange={handleChange} />
                        <span className="text-danger">{dataThemUser.errors.hoTen}</span>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label>Email *</label>
                        <input name="email" className="form-control" onChange={handleChange} />
                        <span className="text-danger">{dataThemUser.errors.email}</span>
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại *</label>
                        <input name="soDt" className="form-control" onChange={handleChange} />
                        <span className="text-danger">{dataThemUser.errors.soDt}</span>
                    </div>
                    <div className="form-group">
                        <label>Loại người dùng *</label>
                        <select className="form-control" name="maLoaiNguoiDung" onChange={handleChange}>
                            <option value="KhachHang">Khách hàng</option>
                            <option value="QuanTri">Quản trị</option>
                        </select>
                    </div>
                </div>
                <p style={{paddingLeft: '15px'}}>*: Bắt buộc</p>
            </div>
            <div className="clearfix">
                <div className="float-left">
                <NavLink className="form-control btn btn-primary" to="/admin/quanlynguoidung">Trở về</NavLink>
                </div>
                <div className="float-right">
                <button type="submit" className="form-control btn btn-success" style={{width: '150px'}}>Thêm</button>
                </div>
            
            
            </div>
        </form>
    )
}
