import React, { useState, useEffect, Fragment } from 'react'
import { userLogin } from '../settings/config';
import { qlNguoiDungService } from '../services/quanLyNguoiDungService'
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/vi'

export default function UserDetail(props) {

    let [thongTinCaNhanUpdate, setThongTinCaNhanUpdate] = useState({
        values: {
            matKhauCu: '',
            matKhau: '',
            email: '',
            soDT: '',
            hoTen: '',

        },
        errors: {
            matKhauCu: '',
            matKhau: '',
            email: '',
            soDT: '',
            hoTen: '',
            classDisPassButton: 'disabled',
            classDisInfoButton: 'disabled',
            setPassColID: '',
        }
    });

    let [thongTinNguoiDung, setThongTinNguoiDung] = useState({
        thongTinCaNhan: {}, lichSuDatVe: []
    });

    useEffect(() => {
        const userData = localStorage.getItem(userLogin)
        if (userData) {
            let thongTinTaiKhoan = {
                "taiKhoan": JSON.parse(userData).taiKhoan
            }
            qlNguoiDungService.layThongTinTaiKhoan(thongTinTaiKhoan).then(res => {
                console.log(res.data);
                setThongTinNguoiDung({
                    thongTinCaNhan: res.data,
                    lichSuDatVe: res.data.thongTinDatVe
                })
            }).catch(err => {
                console.log(err.response.data);
            })
        }
        else {
            props.history.push('/login');
        }
    }, [])

    const setUpdateInfo = () => {
        let { email, soDT, hoTen } = thongTinNguoiDung.thongTinCaNhan;
        const newValues = {
            ...thongTinCaNhanUpdate.values,
            email,
            soDT,
            hoTen
        }
        const newErrors = { ...thongTinCaNhanUpdate.errors };
        setThongTinCaNhanUpdate({ values: newValues, errors: newErrors });
    }

    const handleChangeBaseInfo = (event) => {

        let { value, name } = event.target;
        //Tạo ra object this.state.values mới
        const newValues = {
            ...thongTinCaNhanUpdate.values,
            [name]: value
        }
        console.log(newValues)
        const newErrors = { ...thongTinCaNhanUpdate.errors };

        if (name === "hoTen") {
            if (value.trim() === '') {
                newErrors.hoTen = 'Nếu bỏ trống thông tin cũ sẽ được giữ lại';
            }
            else if (value.trim() === thongTinNguoiDung.thongTinCaNhan.hoTen) {
                newErrors.hoTen = 'Bạn không muốn cập nhật thông tin này?'
            }
            else {
                newErrors.hoTen = ''
            }
        }

        if (name === "soDT") {
            let regexNumber = /^[0-9]+$/;
            if (value.trim() === '') {
                newErrors.soDT = 'Nếu bỏ trống thông tin cũ sẽ được giữ lại';
            }
            else if (!value.match(regexNumber)) {
                newErrors.soDT = 'Số điện thoại mới không hợp lệ, thông tin cũ sẽ được giữ lại';
            }
            else if (value.trim() === thongTinNguoiDung.thongTinCaNhan.soDT) {
                newErrors.soDT = 'Bạn không muốn cập nhật thông tin này?'
            }
            else {
                newErrors.soDT = ''
            }
        }

        if (name === "email") {
            let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (value.trim() === '') {
                newErrors.email = 'Nếu bỏ trống thông tin cũ sẽ được giữ lại';
            }
            else if (!value.match(regexEmail)) {
                newErrors.email = 'Email mới không hợp lệ, thông tin cũ sẽ được giữ lại';
            }
            else if (value.trim() === thongTinNguoiDung.thongTinCaNhan.email) {
                newErrors.email = 'Bạn không muốn cập nhật thông tin này?'
            }
            else {
                newErrors.email = ''
            }
        }
        let validClassDisables = ((newValues.hoTen !== thongTinNguoiDung.thongTinCaNhan.hoTen) && (newErrors.hoTen === '')) || (newValues.email !== thongTinNguoiDung.thongTinCaNhan.email && (newErrors.email === '')) || (newValues.soDT !== thongTinNguoiDung.thongTinCaNhan.soDT && (newErrors.soDT === ''));
        if (validClassDisables) {
            newErrors.classDisInfoButton = ''
        }
        if (!validClassDisables) {
            newErrors.classDisInfoButton = 'disabled'
        }
        console.log(newErrors)

        setThongTinCaNhanUpdate({ values: newValues, errors: newErrors });
    }

    const handleChangePassword = (event) => {
        let { value, name } = event.target;
        const newValues = {
            ...thongTinCaNhanUpdate.values,
            [name]: value
        }
        console.log(newValues)
        const newErrors = { ...thongTinCaNhanUpdate.errors }
        if (name === "matKhauCu") {
            if (value.trim() === '') {
                newErrors.matKhauCu = 'Không được bỏ trống';
            }
            else {
                newErrors.matKhauCu = ''
            }
        }

        if (name === "matKhau") {
            if (value.trim() === '') {
                newErrors.matKhau = 'Không được bỏ trống';
            }
            else if (value.trim().length < 9) {
                newErrors.matKhau = 'Mật khẩu phải nhiều hơn 9 ký tự'
            }
            else {
                newErrors.matKhau = ''
            }
        }
        let validClassDisables = newErrors.matKhau === '' && newErrors.matKhauCu === '' && newValues.matKhau !== '' && newValues.matKhauCu !== '';
        if (validClassDisables) {
            newErrors.classDisPassButton = ''
        }
        if (!validClassDisables) {
            newErrors.classDisPassButton = 'disabled'
        }

        let validSetPassColID = newValues.matKhau !== thongTinNguoiDung.thongTinCaNhan.matKhau && newValues.matKhauCu === thongTinNguoiDung.thongTinCaNhan.matKhau;
        if (validSetPassColID) {
            newErrors.setPassColID = 'section2ContentId'
        }
        if (!validSetPassColID) {
            newErrors.setPassColID = ''
        }
        setThongTinCaNhanUpdate({ values: newValues, errors: newErrors });
    }

    const handleSubmitBasicInfo = (event) => {
        event.preventDefault();

        let { taiKhoan } = thongTinNguoiDung.thongTinCaNhan;
        let { values, errors } = thongTinCaNhanUpdate;

        for (let key in errors) {
            if (errors[key] !== '') { //Nếu như có 1 errrors != rổng => còn lỗi
                values[key] = thongTinNguoiDung.thongTinCaNhan[key]
            }
        }

        const newValues = {
            ...values,
            taiKhoan
        }

        console.log(newValues)
        qlNguoiDungService.capNhatThongTinNguoiDung(newValues).then(res => {
            console.log(res.data);
            swal("", "Cập nhật thông tin thành công", "success", {
                buttons: false,
                timer: 1500,
            });
            let thongTinTaiKhoan = {
                "taiKhoan": JSON.parse(localStorage.getItem(userLogin)).taiKhoan
            }
            qlNguoiDungService.layThongTinTaiKhoan(thongTinTaiKhoan).then(res => {
                console.log(res.data);
                setThongTinNguoiDung({
                    thongTinCaNhan: res.data,
                    lichSuDatVe: res.data.thongTinDatVe
                })
            }).catch(err => {
                console.log(err.response.data);
            })
            const newErrors = {
                ...errors,
                email: '',
                soDT: '',
                hoTen: '',
                classDisInfoButton: 'disabled',

            }
            setThongTinCaNhanUpdate({ values: newValues, errors: newErrors });
        }).catch(err => {
            console.log(err.response.data);
        })
    }

    const handleSubmitPassword = (event) => {
        event.preventDefault();
        let { taiKhoan, hoTen, email, soDT } = thongTinNguoiDung.thongTinCaNhan;

        const newValues = {
            ...thongTinCaNhanUpdate.values,
            taiKhoan,
            hoTen,
            email,
            soDT
        }
        const newErrors = { ...thongTinCaNhanUpdate.errors }

        for (let key in newErrors) {
            if (key === "matKhauCu") {
                if (newValues[key].trim() !== thongTinNguoiDung.thongTinCaNhan.matKhau) {
                    newErrors[key] = "Mật khẩu hiện tại chưa đúng"
                }
                else {
                    newErrors[key] = ''
                }
            }

            if (key === "matKhau" && newErrors['matKhauCu'] === '') {
                if (newValues[key].trim() === thongTinNguoiDung.thongTinCaNhan.matKhau) {
                    newErrors[key] = "Mật khẩu mới phải khác mật khẩu hiện tại"
                }
                else {
                    newErrors[key] = ''
                }
            }
        }

        if (newErrors.matKhau === '' && newErrors.matKhauCu === '') {
            qlNguoiDungService.capNhatThongTinNguoiDung(newValues).then(res => {
                console.log(res.data);
                swal("", "Thay đổi mật khẩu thành công", "success", {
                    buttons: false,
                    timer: 1500,
                });
                let thongTinTaiKhoan = {
                    "taiKhoan": JSON.parse(localStorage.getItem(userLogin)).taiKhoan
                }
                qlNguoiDungService.layThongTinTaiKhoan(thongTinTaiKhoan).then(res => {
                    console.log(res.data);
                    setThongTinNguoiDung({
                        thongTinCaNhan: res.data,
                        lichSuDatVe: res.data.thongTinDatVe
                    })
                }).catch(err => {
                    console.log(err.response.data);
                })
                newValues.matKhauCu = '';
                newValues.matKhau = '';
                newErrors.classDisPassButton = 'disabled';
                setThongTinCaNhanUpdate({ values: newValues, errors: newErrors });
            }).catch(err => {
                console.log(err.response.data);
            })
        }
        else {
            setThongTinCaNhanUpdate({ values: newValues, errors: newErrors });
        }
    }

    const renderBookingHistory = () => {
        return thongTinNguoiDung.lichSuDatVe.map((veDaDat, index) => {
            return <tr>
                <td scope="row">{veDaDat.tenPhim}</td>
                <td>{moment(veDaDat.ngayDat).format('L')}</td>
                {veDaDat.danhSachGhe.map((gheDaDat, index2) => {
                    return <Fragment>
                        <td>{gheDaDat.tenHeThongRap}</td>
                        <td>{gheDaDat.tenCumRap} - G{gheDaDat.tenGhe}</td>
                    </Fragment>
                })}
                <td>{veDaDat.giaVe}đ</td>
            </tr>
        })
    }


    return (
        <div className="container">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#userInfo" role="tab" aria-controls="pills-home" aria-selected="true">THÔNG TIN CÁ NHÂN</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#bookingHistory" role="tab" aria-controls="pills-profile" aria-selected="false">LỊCH SỬ ĐẶT VÉ</a>
                </li>
            </ul>
            <div className="card">
                <div className="card-body">
                    <div className="tab-content px-5" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="userInfo" role="tabpanel" aria-labelledby="pills-userInfo-tab">
                            <div className="card">
                                <h5 className="card-header">Hồ sơ</h5>
                                <div className="card-body row">
                                    <div className="col-6">
                                        <p>Tên: {thongTinNguoiDung.thongTinCaNhan.hoTen}</p>
                                        <p>Mật khẩu: ••••••••</p>
                                    </div>

                                    <div className="col-6">
                                        <p>Email: {thongTinNguoiDung.thongTinCaNhan.email}</p>
                                        <p>Số điện thoại: {thongTinNguoiDung.thongTinCaNhan.soDT}</p>
                                    </div>
                                </div>
                                <div id="accordianId" role="tablist" aria-multiselectable="true">
                                    <div class="card">
                                        <div class="card-header" role="tab" id="section1HeaderId">
                                            <h5 class="mb-0">
                                                <a data-toggle="collapse" data-parent="#accordianId" href="#section1ContentId" aria-expanded="true" aria-controls="section1ContentId" onClick={() => {
                                                    setUpdateInfo()
                                                }}>
                                                    Chỉnh sửa thông tin
                                        </a>
                                            </h5>
                                        </div>
                                        <div id="section1ContentId" class="collapse in" role="tabpanel" aria-labelledby="section1HeaderId">
                                            <div class="card-body">
                                                <form onSubmit={handleSubmitBasicInfo} className="updateInfo">
                                                    <div className="form-group">
                                                        <span>Họ tên</span>
                                                        <input className="form-control" name="hoTen" onChange={handleChangeBaseInfo} value={thongTinCaNhanUpdate.values.hoTen} />
                                                        <span className="text-danger">{thongTinCaNhanUpdate.errors.hoTen}</span>
                                                    </div>
                                                    <div className="form-group">
                                                        <span>Email</span>
                                                        <input className="form-control" name="email" onChange={handleChangeBaseInfo} value={thongTinCaNhanUpdate.values.email} />
                                                        <span className="text-danger">{thongTinCaNhanUpdate.errors.email}</span>
                                                    </div>
                                                    <div className="form-group">
                                                        <span>Số điện thoại</span>
                                                        <input className="form-control" name="soDT" onChange={handleChangeBaseInfo} value={thongTinCaNhanUpdate.values.soDT} />
                                                        <span className="text-danger">{thongTinCaNhanUpdate.errors.soDT}</span>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary" disabled={thongTinCaNhanUpdate.errors.classDisInfoButton} data-toggle="collapse" data-target="#section1ContentId">Lưu thay đổi</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" role="tab" id="section2HeaderId">
                                            <h5 class="mb-0">
                                                <a data-toggle="collapse" data-parent="#accordianId" href="#section2ContentId" aria-expanded="true" aria-controls="section2ContentId">
                                                    Thay đổi mật khẩu
                                        </a>
                                            </h5>
                                        </div>
                                        <div id="section2ContentId" class="collapse in" role="tabpanel" aria-labelledby="section2HeaderId">
                                            <div class="card-body">
                                                <form className="updatePassword" onSubmit={handleSubmitPassword}>
                                                    <div className="form-group">
                                                        <span>Mật khẩu hiện tại</span>
                                                        <input type="password" className="form-control" name="matKhauCu" onChange={handleChangePassword} value={thongTinCaNhanUpdate.values.matKhauCu} />
                                                        <span className="text-danger">{thongTinCaNhanUpdate.errors.matKhauCu}</span>
                                                    </div>
                                                    <div className="form-group">
                                                        <span>Mật khẩu mới</span>
                                                        <input type="password" className="form-control" name="matKhau" onChange={handleChangePassword} value={thongTinCaNhanUpdate.values.matKhau} />
                                                        <span className="text-danger">{thongTinCaNhanUpdate.errors.matKhau}</span>
                                                    </div>

                                                    <button id="submitChangePass" type="submit" className="btn btn-primary" disabled={thongTinCaNhanUpdate.errors.classDisPassButton} data-toggle="collapse" data-target={`#${thongTinCaNhanUpdate.errors.setPassColID}`}>Lưu thay đổi</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="tab-pane fade" id="bookingHistory" role="tabpanel" aria-labelledby="pills-bookingHistory-tab">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Tên phim</th>
                                        <th>Ngày đặt</th>
                                        <th>Hệ thống</th>
                                        <th>Rạp - ghế</th>
                                        <th>Giá vé</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderBookingHistory()}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}