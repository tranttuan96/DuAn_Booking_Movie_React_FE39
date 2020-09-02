import axios from "axios"
import {domain, accessToken, groupID} from '../settings/config';

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
    layThongTinTaiKhoan = (thongTinTaiKhoan) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/ThongTinTaiKhoan`,
            method:'post',
            data:thongTinTaiKhoan,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
            }
        })
    }

    capNhatThongTinNguoiDung = (thongTinTaiKhoan) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            method:'put',
            data:{...thongTinTaiKhoan, "maNhom": groupID, "maLoaiNguoiDung": "KhachHang"},
            // data: thongTinTaiKhoan,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
            }
        })
    }

    layDanhSachNguoiDung = () => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupID}`,
            method:'get',
        })
    }

    themNguoiDung = (thongTinTaiKhoan) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/ThemNguoiDung`,
            method:'post',
            data:{...thongTinTaiKhoan, "maNhom": groupID},
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
            }
        })
    }

    capNhatThongTinNguoiDungAdmin = (thongTinTaiKhoan) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            method:'put',
            data:{...thongTinTaiKhoan, "maNhom": groupID},
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
            }
        })
    }

    xoaNguoiDung = (taiKhoan) => {
        return axios({
            url: `${domain}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
            method:'delete',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
            }
        })
    }

}

export const qlNguoiDungService = new quanLyNguoiDungService();