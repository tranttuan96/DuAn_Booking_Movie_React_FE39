import React, { useState, useEffect } from 'react'
import { groupID } from '../../../settings/config';
import moment from 'moment';
import swal from 'sweetalert';
import { qlPhimService } from '../../../services/quanLyPhimService'

export default function ModalUpdateMovie(props) {

    let [dataUpdatePhim, setDataUpdatePhim] = useState({
        values: {
            tenPhim: '',
            trailer: '',
            hinhAnh: {},
            moTa: '',
            ngayKhoiChieu: '',
            maNhom: groupID,
        },
        errors: {}
    })

    useEffect(() => {
        if (Object.keys(props.updateMovie).length !== 0) {
            let { maPhim, tenPhim, trailer, moTa, ngayKhoiChieu } = props.updateMovie;
            const newValues = {
                ...dataUpdatePhim.values,
                maPhim, tenPhim, trailer, moTa, ngayKhoiChieu: moment(ngayKhoiChieu).format('L')
            }
            const newErrors = {
                ...dataUpdatePhim.errors,
                tenPhim: '',
                trailer: '',
                hinhAnh: '',
                moTa: '',
                ngayKhoiChieu: '',
            };
            setDataUpdatePhim({ values: newValues, errors: newErrors });
        }
    }, [props.updateMovie])

    const handleChange = (event) => {
        let { value, name } = event.target;
        console.log(event.target.files)
        let newValues = {
            ...dataUpdatePhim.values,
        }

        if (name === 'hinhAnh') {
            newValues = { ...newValues, [name]: event.target.files[0] }
        }
        else {
            newValues = { ...newValues, [name]: value }
        }
        const newErrors = {
            ...dataUpdatePhim.errors,
            [name]: name === 'hinhAnh' ? (event.target.files.length === 0 ? 'Vui lòng thêm hình ảnh' : '') : (value.trim() === '' ? 'Không được bỏ trống' : '')
        }

        if (name === 'ngayKhoiChieu') {
            let regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
            if (value.trim() === '') {
                newErrors.ngayKhoiChieu = 'Không được bỏ trống';
            }
            else if (!value.match(regexDate)) {
                newErrors.ngayKhoiChieu = 'Định dạng không hợp lệ, định dạng yêu cầu dd/mm/yyyy';
            }
            else {
                newErrors.ngayKhoiChieu = ''
            }
        }
        console.log(newValues)
        setDataUpdatePhim({ values: newValues, errors: newErrors });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let { values, errors } = dataUpdatePhim;
        let valid = true;
        for (let key in values) {
            if (key !== 'hinhAnh') {
                if (values[key] === '') {
                    valid = false;
                }
            }
        }
        //check errors
        for (let key in errors) {
            if (errors[key] !== '') {
                valid = false;
            }
        }
        if (!valid) {
            swal("Oops", "Thông tin chưa hợp lệ!", "error", {
                buttons: false,
                timer: 1500,
            });
            return;
        }
        const formData = new FormData();
        for (let key in dataUpdatePhim.values) {
            formData.append(key, dataUpdatePhim.values[key]);
        }
        qlPhimService.capNhatPhimUploadHinh(formData).then(res => {
            console.log(res.data);
            swal('',"Cập nhật phim thành công", "success", {
                buttons: false,
                timer: 1500,
            });
            qlPhimService.layDanhSachPhim().then(res => {
                console.log(res.data);
                props.setDanhSachPhim(res.data);
            }).catch(error => {
                console.log(error.response.data);
            });
        }).catch(err => {
            console.log(err.response.data);
        })
    }

    return (
        <div>
            <div className="modal fade" id="updateMovie" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cập nhật phim</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className="container">
                                <div className="form-group">
                                    <label>Tên phim</label>
                                    <input name="tenPhim" className="form-control" onChange={handleChange} value={dataUpdatePhim.values.tenPhim} />
                                    <span className="text-danger">{dataUpdatePhim.errors.tenPhim}</span>
                                </div>
                                <div className="form-group">
                                    <label>Trailer</label>
                                    <input name="trailer" className="form-control" onChange={handleChange} value={dataUpdatePhim.values.trailer} />
                                    <span className="text-danger">{dataUpdatePhim.errors.trailer}</span>
                                </div>
                                <div className="form-group">
                                    <label>Hình ảnh</label>
                                    <input type="file" name="hinhAnh" className="form-control" onChange={handleChange} required />
                                    <span className="text-danger">{dataUpdatePhim.errors.hinhAnh}</span>
                                </div>
                                <div className="form-group">
                                    <label>Mô tả</label>
                                    <input name="moTa" className="form-control" onChange={handleChange} value={dataUpdatePhim.values.moTa} />
                                    <span className="text-danger">{dataUpdatePhim.errors.moTa}</span>
                                </div>
                                <div className="form-group">
                                    <label>Ngày khởi chiếu</label>
                                    <input name="ngayKhoiChieu" className="form-control" onChange={handleChange} value={dataUpdatePhim.values.ngayKhoiChieu} />
                                    <span className="text-danger">{dataUpdatePhim.errors.ngayKhoiChieu}</span>
                                </div>
                                <div className="form-group">
                                    <label>Mã nhóm</label>
                                    <input name="maNhom" value={groupID} className="form-control" onChange={handleChange} disabled />
                                </div>
                                <button type="submit" className="form-control btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
