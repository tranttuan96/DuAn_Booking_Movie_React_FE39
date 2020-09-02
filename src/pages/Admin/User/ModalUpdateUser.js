import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import { qlNguoiDungService } from '../../../services/quanLyNguoiDungService'

export default function ModalUpdateUser(props) {

    let [dataUpdateUser, setDataUpdateUser] = useState({
        values: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maLoaiNguoiDung: "",
            hoTen: ""
        },
        errors: {}
    })

    useEffect(() => {
        if (Object.keys(props.updateUser).length !== 0) {
            let { taiKhoan, matKhau, email, soDt, maLoaiNguoiDung, hoTen } = props.updateUser;
            const newValues = {
                ...dataUpdateUser.values,
                taiKhoan, matKhau, email, soDt, maLoaiNguoiDung, hoTen
            }
            const newErrors = {
                ...dataUpdateUser.errors,
                matKhau: "",
                email: "",
                soDt: "",
                hoTen: ""
            };
            setDataUpdateUser({ values: newValues, errors: newErrors });
        }
    }, [props.updateUser])

    const handleChange = (event) => {
        let { value, name } = event.target;

        const newValues = {
            ...dataUpdateUser.values,
            [name]: value
        }
        const newErrors = {
            ...dataUpdateUser.errors,
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
        setDataUpdateUser({ values: newValues, errors: newErrors });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let { values, errors } = dataUpdateUser;
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
            swal("Oops", "Có thông tin bị bỏ trống hoặc chưa hợp lệ!", "error", {
                buttons: false,
                timer: 2000,
            });
            return;
        }
        // console.log('succcess')
        qlNguoiDungService.capNhatThongTinNguoiDungAdmin(values).then(res => {
            // console.log(res.data);
            swal('', "Cập nhật thông tin Người dùng thành công", "success", {
                buttons: false,
                timer: 1500,
            });
            qlNguoiDungService.layDanhSachNguoiDung().then(res => {
                // console.log(res.data);
                props.setDanhSachNguoiDung(res.data);
            }).catch(error => {
                console.log(error.response.data);
            });
        }).catch(err => {
            // console.log(err.response.data);
            swal('Oops', err.response.data, "error", {
                buttons: false,
                timer: 1500,
            });
        })
    }

    return (
        <div className="modal fade" id="updateUser" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cập nhật thông tin Người dùng</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Tài khoản *</label>
                                        <input name="taiKhoan" className="form-control" onChange={handleChange} value={dataUpdateUser.values.taiKhoan} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label>Mật khẩu *</label>
                                        <input type="password" name="matKhau" className="form-control" onChange={handleChange} value={dataUpdateUser.values.matKhau}/>
                                        <span className="text-danger">{dataUpdateUser.errors.matKhau}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Họ Tên *</label>
                                        <input name="hoTen" className="form-control" onChange={handleChange} value={dataUpdateUser.values.hoTen}/>
                                        <span className="text-danger">{dataUpdateUser.errors.hoTen}</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input name="email" className="form-control" onChange={handleChange} value={dataUpdateUser.values.email}/>
                                        <span className="text-danger">{dataUpdateUser.errors.email}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại *</label>
                                        <input name="soDt" className="form-control" onChange={handleChange} value={dataUpdateUser.values.soDt}/>
                                        <span className="text-danger">{dataUpdateUser.errors.soDt}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Loại người dùng *</label>
                                        <input name="maLoaiNguoiDung" className="form-control" onChange={handleChange} value={dataUpdateUser.values.maLoaiNguoiDung} disabled/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="form-control btn btn-success">Cập nhật</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
