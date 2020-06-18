import React, { useState, useEffect, Fragment } from 'react';
import { qlPhimService } from '../services/quanLyPhimService';
import { userLogin } from '../settings/config';

export default function ShowTime(props) {

    // let [thongTinPhim, setThongTinPhim] = useState({});
    let [thongTinLichChieu, setThongTinLichChieu] = useState({danhSachGhe: [], thongTinPhim: {}});
    let [danhSachGheDangDat, setDanhSachGheDangDat] = useState([]);


    useEffect(() => {
        //Lấy maLichChieu từ params
        let { maLichChieu } = props.match.params;
        qlPhimService.layThongTinPhongVe(maLichChieu).then((res) => {
            console.log(res.data);
            // setLichChieuPhim(res.data)
            //Lấy dữ liệu BE trả về set vào danhSachGhe
            setThongTinLichChieu({
                danhSachGhe: res.data.danhSachGhe,
                thongTinPhim: res.data.thongTinPhim,
            });
        }).catch(errors => {
            console.log(errors.response.data);
        })
    }, [])

    const renderThongTinPhim = () => {
        let {thongTinPhim, danhSachGhe} = thongTinLichChieu;
        return (<div className="container">
            <h3 style={{color: 'green', fontSize: 20}}>{danhSachGheDangDat?.reduce((tongTien, gheDangDat, index) => {
                return tongTien += gheDangDat.giaVe;
            },0).toLocaleString()}</h3>
            <hr />
            <div className="thongTinPhim">
                <h3 className="display-5">{thongTinPhim?.tenPhim}</h3>
                <p>{thongTinPhim?.tenCumRap}</p>
                <p>Ngày giờ chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
            </div>
            <hr />
            {danhSachGheDangDat.map((gheDangDat, index) => {
                return <span key={index} style={{fontSize:17, color:'green'}} className="mr-1">G-{gheDangDat.tenGhe}
                </span>
            })}

            <hr />
            <button className="w-100 btn btn-success" onClick={() => {
                datVe()
            }}>ĐẶT VÉ</button>
        </div>)

    }

    const datVe = () => {

        // let taiKhoanNguoiDung = JSON.parse(localStorage.getItem(userLogin)).taiKhoan;
        //Làm chức năng đăng nhập
        let taiKhoanNguoiDung = "123@admin";

        let thongTinDatVe = {
            "maLichChieu": props.match.params.maLichChieu,
            "danhSachVe": danhSachGheDangDat,
            "taiKhoanNguoiDung": taiKhoanNguoiDung
        }

        qlPhimService.datVe(thongTinDatVe).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err.response.data);
        })
    }

    const renderDanhSachGhe = () => {
        return thongTinLichChieu.danhSachGhe?.map((ghe, index) => {
            return <Fragment key={index}>
                {renderGhe(ghe)}
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>

        });
    }

    const renderGhe = (ghe) => {

        let classGheVip = "";
        if (ghe.loaiGhe === "Vip") {
            classGheVip = "gheVip"
        }

        if (ghe.daDat) {
            return <button className={`ghe gheDaDat ${classGheVip}`} disabled>X</button>
        }
        //Thay vì render ghế thường => ghế đó có được đặt hay không
        let classGheDangDat = '';
        let index = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);
        if (index !== -1) {
            classGheDangDat = 'gheDangDat';
        }
        return <button onClick={() => { chonGhe(ghe) }} className={`ghe ${classGheVip} ${classGheDangDat}`}>{ghe.stt}</button>
    }

    const chonGhe = (ghe) => {
        //Tìm trong mảng danhSachGheDangDat có ghế đó thì remove nếu ngược lại thì thêm vào
        let index = danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.stt === ghe.stt);
        if (index != -1) {
            danhSachGheDangDat.splice(index, 1);
        } else {
            danhSachGheDangDat.push(ghe)
        }
        //setDanhSachGheDangDat => giao diện render lại
        setDanhSachGheDangDat([...danhSachGheDangDat]);

    }

    return (
        <div className="container-fluid text-center mt-5">
            <div className="row">
                <div className="col-8">
                    {/* Danh Sách Ghế  */}
                    <div className="trapezoid mb-5">Màn hình</div>
                    {renderDanhSachGhe()}
                </div>
                <div className="col-4">
                    {/* Thông tin Phim  */}
                    {renderThongTinPhim()}
                </div>
            </div>
        </div>
    )
}
