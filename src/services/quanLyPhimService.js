import axios from 'axios';
import {domain, groupID, accessToken, currentDate, nextDate} from '../settings/config';

export class quanLyPhimService {
    layDanhSachPhim = () => {
        return axios({
            url:`${domain}/QuanLyPhim/LayDanhSachPhim?maNhom=${groupID}`,
            method:'GET'
        })
    }
    layDanhSachPhimDangChieu = () => {
        return axios({
            url:`${domain}/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=${groupID}&soTrang=1&soPhanTuTrenTrang=16&tuNgay=01/01/2020&denNgay=${currentDate}`,
            method:'GET'
        })
    }
    layDanhSachPhimSapChieu = () => {
        return axios({
            url:`${domain}/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=${groupID}&soTrang=1&tuNgay=${nextDate}&denNgay=31/12/2020`,
            method:'GET'
        })
    }
    layThongTinPhim_LichChieu = (maPhim) => {
        return axios({
            url:`${domain}/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`,
            method:'GET'
        })
    }
    layThongTinPhongVe = (maLichChieu) => {
        return axios({
            url:`${domain}/QuanLyDatVe/LayDanhSachPhongVe?maLichChieu=${maLichChieu}`,
            method:'GET'
        })
    }
    layThongTinHeThongRap = () => {
        return axios({
            url:`${domain}/QuanLyRap/LayThongTinHeThongRap`,
            method:'GET'
        })
    }

    layThongTinLichChieuHeThongRap = () => {
        return axios({
            url:`${domain}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${groupID}`,
            method:'GET'
        })
    }

    layThongTinLichChieuTungHeThongRap = (maHeThongRap) => {
        return axios({
            url:`${domain}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${groupID}`,
            method:'GET'
        })
    }
    
    themPhimUploadHinh = (formData) => {
        return axios({
            url:`${domain}/QuanLyPhim/ThemPhimUploadHinh`,
            method:'POST',
            data: formData
        })
    }

    capNhatPhimUploadHinh = (formData) => {
        return axios({
            url:`${domain}/QuanLyPhim/CapNhatPhimUpload`,
            method:'POST',
            data: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
            }
        })
    }

    xoaPhim = (maPhim) => {
        return axios({
            url:`${domain}/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
            }
        })
    }


    
}

export const qlPhimService = new quanLyPhimService();