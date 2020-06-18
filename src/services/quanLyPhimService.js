import axios from 'axios';
import {domain, groupID, accessToken} from '../settings/config';

export class quanLyPhimService {
    layDanhSachPhim = () => {
        return axios({
            url:`${domain}/QuanLyPhim/LayDanhSachPhim?maNhom=${groupID}`,
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
    datVe = (thongTinDatVe) => {
        return axios({
            url:`${domain}/QuanLyDatVe/DatVe`,
            method:'POST',
            data: thongTinDatVe,
            headers: {
                // "Authorization": `Bearer ${localStorage.getItem(accessToken)}`
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzQGFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiS2hhY2hIYW5nIiwibmJmIjoxNTkxOTcxNDI4LCJleHAiOjE1OTE5NzUwMjh9.khL55C9DPGJxgv_aEV_v2PomELumTLUQYwvyfnpVX1I`
            }
        })
    }
}

export const qlPhimService = new quanLyPhimService();