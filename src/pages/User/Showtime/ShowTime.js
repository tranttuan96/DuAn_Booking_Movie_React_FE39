import React, { useState, useEffect, Fragment } from 'react';
import { qlPhimService } from '../../../services/quanLyPhimService';
import { qlNguoiDungService } from '../../../services/quanLyNguoiDungService'
import { userLogin } from '../../../settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { luuTruDSGheAction } from '../../../redux/actions/quanLyDatGheAction'

export default function ShowTime(props) {

    let [thongTinLichChieu, setThongTinLichChieu] = useState({ danhSachGhe: [], thongTinPhim: {} });
    let [danhSachGheDangDat, setDanhSachGheDangDat] = useState([]);

    const dispatch = useDispatch();

    const dataGheDangDat = useSelector((state) => state.quanLyDatGheReducer.dataGheDangDat);
    console.log(dataGheDangDat)

    // đặt bên ngoài chứ không đặt trong useEffect do useEffect chỉ chạy 1 lần, khi gọi API layThongTinPhongVe về xong => render lại danh sách ghế, tuy nhiên khi có hàm set danhSachGheDangDat từ dataGheDangDat (như bên dưới) sẽ chỉ chạy 1 lần nếu đặt trong useEffect => đặt bên ngoài
    if (dataGheDangDat?.danhSachGheDangDatData.length !== 0 && dataGheDangDat?.maLichChieu === props.match.params.maLichChieu) {
        dataGheDangDat.danhSachGheDangDatData.map((gheDangDat, index) => {
            return danhSachGheDangDat = [...danhSachGheDangDat, gheDangDat];
        });
    }

    console.log(danhSachGheDangDat)

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
        let { thongTinPhim, danhSachGhe } = thongTinLichChieu;
        let price = danhSachGheDangDat?.reduce((tongTien, gheDangDat, index) => {
            return tongTien += gheDangDat.giaVe;
        }, 0).toLocaleString();
        return (<Fragment>
            <div className="thongTinDatVe container">
                <div className='bookingPrice'>
                    {price} đ
                </div>
                <div className="thongTinPhimSub">
                    <div className="movieInfo">
                        <span className="ageType">C18</span>
                        <span className="movieName">{thongTinPhim?.tenPhim}</span>
                    </div>
                    <div className="thongTinRap">
                        {thongTinPhim?.tenCumRap}
                    </div>
                    <div className="thongTinSuatChieu">
                        Ngày giờ chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu} - {thongTinPhim?.tenRap}
                    </div>
                </div>
                <div className="row mx-0 thongTinGhe">
                    <div className="gheDangChon col-7">
                        <span className="tilteGhe">Ghế</span>
                        {danhSachGheDangDat.map((gheDangDat, index) => {
                            return <span key={index} className="soGhe">{`${index === 0 ? '' : ', '}G${gheDangDat.tenGhe}`}
                            </span>
                        })}
                    </div>
                    <div className="giaGhe col-5">
                        {price} đ
                    </div>
                </div>
                <div className="thanhToan text-left">
                    <div className="title">Hình thức thanh toán</div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="thanhToanRadios" id="zaloPay" defaultValue="option1" defaultChecked />
                        <label className="form-check-label" htmlFor="zaloPay">
                            <img src={"/images/zaloPay.jpg"}></img>
                        Thanh toán qua ZaloPay
                </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="thanhToanRadios" id="CC" defaultValue="option2" />
                        <label className="form-check-label" htmlFor="CC">
                            <img src={"/images/CreditCard.png"}></img>
                        Visa, Master, JCB
                    </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="thanhToanRadios" id="ATM" defaultValue="option3" />
                        <label className="form-check-label" htmlFor="ATM">
                            <img src={"/images/ATM.png"}></img>
                        Thẻ ATM nội địa
                     </label>
                    </div>
                </div>
                
            </div>

            <div className="datVe">
                <div className="warning">
                    <img src={"/images/warningIcon.png"}></img>
                    <span>Vé đã mua không thể đổi hoặc hoàn tiền.</span>
                </div>
                {renderButtonDatve()}
            </div>
        </Fragment>)

    }

    const renderButtonDatve = () => {
        let classDisable = "disable";
        if (danhSachGheDangDat.length !== 0) {
            classDisable = '';
        }
        return <button className="btn" onClick={() => {
            datVe()
        }} disabled={classDisable}>ĐẶT VÉ</button>
    }

    const datVe = () => {

        let taiKhoanNguoiDung = localStorage.getItem(userLogin);
        //Làm chức năng đăng nhập
        if (taiKhoanNguoiDung) {
            let thongTinDatVe = {
                "maLichChieu": props.match.params.maLichChieu,
                "danhSachVe": danhSachGheDangDat,
                "taiKhoanNguoiDung": JSON.parse(localStorage.getItem(userLogin)).taiKhoan
            }
            qlNguoiDungService.datVe(thongTinDatVe).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err.response.data);
            })
        }
        else {
            //dispatch danhSachGheDangDat lên reducer
            let dataGheDangDatTemp = {
                maLichChieu: props.match.params.maLichChieu,
                danhSachGheDangDatData: danhSachGheDangDat
            }
            console.log(dataGheDangDatTemp)
            dispatch(luuTruDSGheAction(dataGheDangDatTemp));
            props.history.push('/login');
        }


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
        if (ghe.stt === 1) {
            console.log(danhSachGheDangDat)
        }
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
        <div className="container-fluid text-center mt-5 showTime">
            <img className='screen' src={"/images/CinemaScreen.png"} ></img>
            <div className="danhSachGhe">
                {renderDanhSachGhe()}
            </div>
            <div className="loaiGhe">
                <div>
                    <button className='ghe'></button>
                    <div>Ghế thường</div>
                </div>
                <div>
                    <button className='ghe gheVip'></button>
                    <div>Ghế Vip</div>
                </div>
                <div>
                    <button className='ghe gheDangDat'></button>
                    <div>Ghế đang chọn</div>
                </div>
                <div>
                    <button className='ghe gheDaDat' disabled>X</button>
                    <div>Ghế đã có người đặt</div>
                </div>
            </div>
            <div className="thongTinPhim">
                {renderThongTinPhim()}
            </div>
        </div>
    )
}
