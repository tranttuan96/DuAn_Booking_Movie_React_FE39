import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { qlPhimService } from '../../../services/quanLyPhimService';
import moment from 'moment';

export default function CinemaDetail(props) {

    const [lichChieuTheoHeThongRap, setLichChieuTheoHeThongRap] = useState([]);
    let [thongTinRapChinh, setThongTinRapChinh] = useState({});
    let [thongTinRapPhu, setThongTinRapPhu] = useState({});

    useEffect(() => {
        console.log(props.match.params.maHeThongRap)
        qlPhimService.layThongTinLichChieuTungHeThongRap(props.match.params.maHeThongRap).then(res => {
            console.log(res.data);
            setLichChieuTheoHeThongRap(res.data)
        }).catch(error => {
            console.log(error.response.data);
        });
    }, []);
    // console.log(lichChieuTheoHeThongRap?.lstCumRap)
    thongTinRapChinh = lichChieuTheoHeThongRap[0]?.lstCumRap.find(rap => rap.maCumRap === props.match.params.maCumRap)
    console.log(thongTinRapChinh)
    thongTinRapPhu = lichChieuTheoHeThongRap[0]?.lstCumRap.filter(rap => rap.maCumRap !== props.match.params.maCumRap)
    console.log(thongTinRapPhu)


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
                        <a className="directToContent" href="#v-pills-tab">Mua vé</a>
                    </div>
                </div>
            </div>
            <div className="cinemaDetail__content">
                <h4>Lịch chiếu</h4>
                <div className="row mx-0">
                    <div className="nav flex-column nav-pills listCinema" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className='nav-link active' id="v-pills-home-tab" data-toggle="pill" href={`#${thongTinRapChinh?.maCumRap}`} role="tab" aria-controls="v-pills-home" aria-selected="true">
                            <img src={"/images/cinemaListImg.jpg"} />
                            <div className='cinemaInfo'>
                                <p className="cinemaName"> {thongTinRapChinh?.tenCumRap}</p>
                                <p className="cinemaAddress"> {thongTinRapChinh?.diaChi}</p>
                            </div>
                        </a>
                        {thongTinRapPhu?.map((rap, index) => {
                            return <a key={index} className='nav-link' id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">
                            <img src={"/images/cinemaListImg.jpg"} />
                            <div className='cinemaInfo'>
                                <p className="cinemaName"> {rap.tenCumRap}</p>
                                <p className="cinemaAddress"> {rap.diaChi}</p>
                            </div>
                        </a>
                        })}

                    </div>
                    <div className="tab-content listMovieOfCinema" id="v-pills-tabContent" style={{ height: 300, overflowY: "auto" }}>
                        <div className='tab-pane fade show active' id={thongTinRapChinh?.maCumRap} role="tabpanel">
                        {thongTinRapChinh?.danhSachPhim.map((phim, index3) => {
                                    return <div className="movieShowtime" key={index3}>
                                        <img src={phim.hinhAnh}></img>
                                        <div className="movieInfo">
                                            <p className="tenPhim">{phim.tenPhim}</p>
                                        </div>
                                        <div className='type'>2D Digital</div>
                                        <div className="bookingTime row mx-0">
                                            {phim.lstLichChieuTheoPhim.slice(0,6).map((lichChieu, index4) => {
                                                return <NavLink to={`/showtime/${lichChieu.maLichChieu}`} key={index4}>{moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}</NavLink>
                                            })}
                                        </div>
                                    </div>
                                })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
