import axios from "axios"
import {domain, groupID, accessToken} from '../settings/config';

export class quanLyNguoiDungService {
    dangNhap = (userLogin) => {
        return axios({
            url:`${domain}/QuanLyNguoiDung/DangNhap`,
            method:'POST',
            data:userLogin
        })
    }

    dangKy = (userRegister) => {
        return axios({
            url:`${domain}/QuanLyNguoiDung/DangKy`,
            method:'POST',
            data:userRegister
        })
    }
    datVe = (thongTinDatVe) => {
        return axios({
            url: `${domain}/quanlydatve/datve`,
            method:'post',
            data:thongTinDatVe,
            //Yêu cầu đăng nhập 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
            }
        })
    }
}

export const qlNguoiDungService = new quanLyNguoiDungService();