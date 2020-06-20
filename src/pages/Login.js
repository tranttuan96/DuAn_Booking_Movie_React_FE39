import React, {useState} from 'react'
import { qlNguoiDungService } from '../services/quanLyNguoiDungService'
import {useDispatch} from 'react-redux'
import {dangNhapAction} from '../redux/actions/quanLyNguoiDungAction'

export default function Login(props) {

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
        let {name, value} = event.target;
        const newValues = {...state.values,[name]:value};
        const newErrors = {...state.errors,[name]:value.trim() === '' ?'Không được bỏ trống':''};
        //Gọi set lại state của hook
        setState(
            {
                values:newValues,
                errors:newErrors
            })
    }

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        qlNguoiDungService.dangNhap(state.values).then(res=>{

            //Lưu vào localStorage
            localStorage.setItem('userLogin', res.data.taiKhoan)
            localStorage.setItem('token',res.data.accessToken);
            //dispatch lên reducer
            dispatch(dangNhapAction(res.data.taiKhoan))

        }).catch(error=>{
            console.log('error',error.response.data)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <h3>Đăng nhập</h3>
            <div className="form-group">
                <span>Tài khoản</span>
                <input name="taiKhoan" className="form-control" onChange={handleChange}/>
                <span className="text text-danger">{state.errors.taiKhoan}</span>
            </div>
            <div className="form-group">
                <span>Mật khẩu</span>
                <input name="matKhau" className="form-control" onChange={handleChange}/>
                <span className="text text-danger">{state.errors.matKhau}</span>
            </div>
            <div className="form-group">
                <button className="btn btn-success">Đăng nhập</button>
            </div>
        </form>
    )
}
