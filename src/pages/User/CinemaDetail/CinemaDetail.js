import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { qlPhimService } from '../../../services/quanLyPhimService';
import moment from 'moment';

export default function CinemaDetail(props) {

    const [lichChieuTheoHeThongRap, setLichChieuTheoHeThongRap] = useState([]);
    const [maCumRapChinh, setMaCumRapChinh] = useState(props.match.params.maCumRap);
    let [thongTinRapChinh] = useState({});
    let [thongTinRapPhu] = useState({});

    useEffect(() => {
        console.log(props.match.params.maHeThongRap)
        qlPhimService.layThongTinLichChieuTungHeThongRap(props.match.params.maHeThongRap).then(res => {
            // console.log(res.data);
            setLichChieuTheoHeThongRap(res.data)
        }).catch(error => {
            console.log(error.response.data);
        });
    }, []);
 
    thongTinRapChinh = lichChieuTheoHeThongRap[0]?.lstCumRap.find(rap => rap.maCumRap === maCumRapChinh)
    thongTinRapPhu = lichChieuTheoHeThongRap[0]?.lstCumRap.filter(rap => rap.maCumRap !== maCumRapChinh)

    const chonRapKhac = (maCumRap) => {
        setMaCumRapChinh(maCumRap)
    }


    return (
        <div className="cinemaDetail">
            <div className="cinemaDetail__intro">
                <div className="cinemaDetail__intro-backImg">
                    <img className="landscape" src={"/images/cinemaDetailBack.jpg"} />
                </div>
                <div className="cinemaDetail__intro-info">
                    <div className="cinemaImg col-3">
                        <img src={"/images/cinemaListImg.jpg"}></img>
                    </div>
                    <div className="cinemaInfo col-9">
                        <p className="cinemaName">{thongTinRapChinh?.tenCumRap}</p>
                        <p className="cinemaAddress">{thongTinRapChinh?.diaChi}</p>
                        <a className="directToContent" href="#cinemaDetail__content">Mua vé</a>
                    </div>
                </div>
            </div>
            <div className="cinemaDetail__content" id="cinemaDetail__content">
            <ul className="nav nav-tabs mainMenu" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="lichChieu-tab" data-toggle="tab" href="#lichChieu" role="tab" aria-controls="phimDangChieu" aria-selected="true">Lịch Chiếu</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="thongTin-tab" data-toggle="tab" href="#thongTin" role="tab" aria-controls="phimSapChieu" aria-selected="false">Thông Tin</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="danhGia-tab" data-toggle="tab" href="#danhGia" role="tab" aria-controls="phimSapChieu" aria-selected="false">Đánh Giá</a>
                </li>
            </ul>
            <div className="tab-content mainContent" id="myTabContent">
                <div className="tab-pane fade show active" id="lichChieu" role="tabpanel" aria-labelledby="lichChieu-tab">
                <div className="row mx-0">
                    <div className="nav nav-pills listCinema" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className='nav-link rapChinh active' id="v-pills-home-tab" data-toggle="pill" href={`#${thongTinRapChinh?.maCumRap}`} role="tab" aria-controls="v-pills-home" aria-selected="true">
                            <img src={"/images/cinemaListImg.jpg"} />
                            <div className='cinemaInfo'>
                                <p className="cinemaName"> {thongTinRapChinh?.tenCumRap}</p>
                                <p className="cinemaAddress"> {thongTinRapChinh?.diaChi}</p>
                            </div>
                        </a>
                        {thongTinRapPhu?.map((rap, index) => {
                            return <a key={index} className='nav-link' id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => { chonRapKhac(rap.maCumRap)}}>
                                <img src={"/images/cinemaListImg.jpg"} />
                                <div className='cinemaInfo'>
                                    <p className="cinemaName"> {rap.tenCumRap}</p>
                                    <p className="cinemaAddress"> {rap.diaChi}</p>
                                </div>
                            </a>
                        })}

                    </div>
                    <div className="tab-content listMovieOfCinema" id="v-pills-tabContent">
                        <div className='tab-pane fade show active' id={thongTinRapChinh?.maCumRap} role="tabpanel">
                            {thongTinRapChinh?.danhSachPhim.map((phim, index3) => {
                                return <div className="movieShowtime" key={index3}>
                                    <img src={phim.hinhAnh}></img>
                                    <div className="movieInfo">
                                        <div className='mainInfo'>
                                            <span className="ageType">C18</span>
                                            <span className="movieName">{phim.tenPhim}</span>
                                        </div>
                                        <div className="subInfo">
                                            <span>100 phút - 0 IMDb</span>
                                        </div>
                                    </div>
                                    <div className='type'>2D Digital</div>
                                    <div className="bookingTime row mx-0">
                                        {phim.lstLichChieuTheoPhim.slice(0, 6).map((lichChieu, index4) => {
                                            return <NavLink to={`/showtime/${lichChieu.maLichChieu}`} key={index4}>{moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}</NavLink>
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="thongTin" role="tabpanel" aria-labelledby="thongTin-tab">

                </div>
                <div className="tab-pane fade" id="danhGia" role="tabpanel" aria-labelledby="danhGia-tab">

                </div>
            </div>
                

            </div>
        </div>
    )
}

