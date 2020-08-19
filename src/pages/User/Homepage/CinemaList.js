import React, { useEffect, useState } from 'react'
import { qlPhimService } from '../../../services/quanLyPhimService';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export default function CinemaList(props) {

    let [heThongRap, setHeThongRap] = useState([]);
    let [lichChieuTheoHeThongRap, setLichChieuTheoHeThongRap] = useState([]);
    // Ứng với componentdidmount
    useEffect(() => {
        //Gọi service Api set lại state danhSachPhim

        qlPhimService.layThongTinHeThongRap().then(res => {
            console.log(res.data);
            // setThongTinCumRap({
            //     heThongRap: res.data
            // });
            // console.log(thongTinCumRap)
            setHeThongRap(res.data)
        }).catch(error => {
            console.log(error.response.data);
        });

        qlPhimService.layThongTinLichChieuHeThongRap().then((res) => {
            console.log(res.data);
            // setThongTinCumRap({
            //     cumRapTheoHeThong: res.data
            // });
            setLichChieuTheoHeThongRap(res.data)
        }).catch(errors => {
            console.log(errors.response.data);
        });

    }, []);

    //xử lý component CumRap
    const chonRapChieu = (maHeThongRap, maCumRap) => {
        props.history.push(`/cinemadetail/${maHeThongRap}/${maCumRap}`);
    }

    return (

        <div id="cinemaList">
            <div className="row">
                <div className="nav flex-column nav-pills listPCinema" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {heThongRap?.map((heThongRapChieu, index) => {
                        let classChoPhepActive = '';
                        if (index == 0) {
                            classChoPhepActive = "active";
                        }
                        return <a key={index} className={`nav-link ${classChoPhepActive}`} id="v-pills-home-tab" data-toggle="pill" href={`#${heThongRapChieu.maHeThongRap}`} role="tab" aria-controls="v-pills-home" aria-selected="true">
                            <img src={heThongRapChieu.logo} />
                        </a>
                    })}
                </div>

                <div className="tab-content listCinema" id="v-pills-tabContent">
                    {lichChieuTheoHeThongRap?.map((heThongRapChieu, index) => {
                        let classChoPhepActive = '';
                        if (index == 0) {
                            classChoPhepActive = "active show";
                        }
                        return <div key={index} className={`tab-pane fade ${classChoPhepActive}`} id={heThongRapChieu.maHeThongRap} role="tabpanel" aria-labelledby="v-pills-home-tab">
                            <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {heThongRapChieu.lstCumRap.map((cumRap, index2) => {
                                    let classChoPhepActive2 = '';
                                    if (index2 == 0) {
                                        classChoPhepActive2 = "active";
                                    }
                                    return <a key={index2} className={`nav-link ${classChoPhepActive2}`} data-toggle="pill" href={`#${cumRap.maCumRap}`} role="tab" aria-selected="true">
                                        <img src={"./images/cinemaListImg.jpg"} />
                                        <div className='cinemaInfo'>
                                            <p className="cinemaName"> {cumRap.tenCumRap}</p>
                                            <p className="cinemaAddress"> {cumRap.diaChi}</p>
                                            <span onClick={() => { chonRapChieu(heThongRapChieu.maHeThongRap, cumRap.maCumRap) }} className="cinemaDetail">[chi tiết]</span>
                                        </div>
                                    </a>
                                })}
                            </div>

                        </div>
                    }
                    )}
                </div>
                <div className="tab-content listMovieOfCinema" id="v-pills-tabContent" style={{ height: 300, overflowY: "auto" }}>
                    {lichChieuTheoHeThongRap?.map((heThongRapChieu, index) => {
                        return heThongRapChieu.lstCumRap.map((cumRap, index2) => {
                            let classChoPhepActive = '';
                            if (index == 0 && index2 == 0) {
                                classChoPhepActive = "active show";
                            }
                            return <div key={index2} className={`tab-pane fade ${classChoPhepActive}`} id={cumRap.maCumRap} role="tabpanel">
                                {cumRap.danhSachPhim.map((phim, index3) => {
                                    return <div className="movieShowtime" key={index3}>
                                        <img src={phim.hinhAnh}></img>
                                        <div className="movieInfo">
                                            <p className="tenPhim">{phim.tenPhim}</p>
                                        </div>
                                        <div className="bookingTime row">
                                            {phim.lstLichChieuTheoPhim.slice(0,6).map((lichChieu, index4) => {
                                                return <NavLink to={`/showtime/${lichChieu.maLichChieu}`} key={index4}>{moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}</NavLink>
                                            })}
                                        </div>
                                    </div>
                                })}
                            </div>
                        })
                    }
                    )}
                </div>
            </div>
        </div>

    )
}
