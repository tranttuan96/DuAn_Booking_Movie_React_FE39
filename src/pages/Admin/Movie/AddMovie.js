import React, { useState } from 'react'
import { groupID } from '../../../settings/config';
import swal from 'sweetalert';
import { qlPhimService } from '../../../services/quanLyPhimService'

export default function AddMovie(props) {

    let [dataThemPhim, setDataThemPhim] = useState({
        values: {
            tenPhim: '',
            trailer: '',
            hinhAnh: {},
            moTa: '',
            ngayKhoiChieu: '',
            maNhom: groupID,
        },
        errors: {
            tenPhim: '',
            trailer: '',
            hinhAnh: '',
            moTa: '',
            ngayKhoiChieu: '',
        }
    })

    const handleChange = (event) => {
        let { value, name } = event.target;
        console.log(event.target.files)
        let newValues = {
            ...dataThemPhim.values,
        }

        if (name === 'hinhAnh') {
            newValues = { ...newValues, [name]: event.target.files[0] }
        }
        else {
            newValues = { ...newValues, [name]: value }
        }
        const newErrors = {
            ...dataThemPhim.errors,
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
        setDataThemPhim({ values: newValues, errors: newErrors });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(123123)
        let { values, errors } = dataThemPhim;
        let valid = true;
        for (let key in values) {
            if (key !== 'hinhAnh') {
                if (values[key] === '') { //Nếu như có 1 values = rổng thì không hợp lệ
                    valid = false;
                }
            }
        }
        //check errors
        for (let key in errors) {
            if (errors[key] !== '') { //Nếu như có 1 errrors != rổng => còn lỗi
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
        for (let key in dataThemPhim.values) {
            formData.append(key, dataThemPhim.values[key]);
        }
        
        qlPhimService.themPhimUploadHinh(formData).then(res => {
            console.log(res.data);
            swal('',"Thêm phim mới thành công", "success", {
                buttons: false,
                timer: 1500,
            });
        }).catch(err => {
            console.log(err.response.data);
        })
    }

    return (
        <form onSubmit={handleSubmit} className="container">
            <h3 className="text-center">
                THÊM PHIM MỚI - CYBERSOFT.EDU.VN
                    </h3>
            <div className="form-group">
                <label>Tên phim</label>
                <input name="tenPhim" className="form-control" onChange={handleChange} />
                <span className="text-danger">{dataThemPhim.errors.tenPhim}</span>
            </div>
            <div className="form-group">
                <label>Trailer</label>
                <input name="trailer" className="form-control" onChange={handleChange} />
                <span className="text-danger">{dataThemPhim.errors.trailer}</span>
            </div>
            <div className="form-group">
                <label>Hình ảnh</label>
                <input type="file" name="hinhAnh" className="form-control" onChange={handleChange} required />
                <span className="text-danger">{dataThemPhim.errors.hinhAnh}</span>
            </div>
            <div className="form-group">
                <label>Mô tả</label>
                <input name="moTa" className="form-control" onChange={handleChange} />
                <span className="text-danger">{dataThemPhim.errors.moTa}</span>
            </div>
            <div className="form-group">
                <label>Ngày khởi chiếu</label>
                <input name="ngayKhoiChieu" className="form-control" onChange={handleChange} />
                <span className="text-danger">{dataThemPhim.errors.ngayKhoiChieu}</span>
            </div>
            <div className="form-group">
                <label>Mã nhóm</label>
                <input name="maNhom" value={groupID} className="form-control" onChange={handleChange} disabled />
            </div>
            <button type="submit" className="form-control btn btn-success">Submit</button>
        </form>
    )
}
