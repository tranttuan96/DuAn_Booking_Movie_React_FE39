import React, { useEffect, useState } from 'react'
import { qlPhimService } from '../../../services/quanLyPhimService';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export default function CinemaList(props) {

    const [heThongRap, setHeThongRap] = useState([]);
    const [lichChieuTheoHeThongRap, setLichChieuTheoHeThongRap] = useState([]);
    const [heThongRapShow, setHeThongRapShow] = useState({});
    const [cumRapShow, setCumRapShow] = useState({});
    const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(0);

    // Ứng với componentdidmount
    useEffect(() => {
        //Gọi service Api set lại state danhSachPhim

        qlPhimService.layThongTinHeThongRap().then(res => {
            // console.log(res.data);
            setHeThongRap(res.data)
        }).catch(error => {
            console.log(error.response.data);
        });

        qlPhimService.layThongTinLichChieuHeThongRap().then((res) => {
            // console.log(res.data);
            setLichChieuTheoHeThongRap(res.data)
            setHeThongRapShow(res.data[0])
            setCumRapShow(res.data[0].lstCumRap[0])
        }).catch(errors => {
            console.log(errors.response.data);
        });

    }, []);

    const chonHeThongRap = (maHeThongRap) => {
        let heThongRapShowTemp = lichChieuTheoHeThongRap.find(heThongRap => heThongRap.maHeThongRap === maHeThongRap);
        setHeThongRapShow(heThongRapShowTemp)
        setCumRapShow(heThongRapShowTemp.lstCumRap[0])
        setSelectedCinemaIndex(0)
    }

    const chonCumRap = (cumRap, index) => {
        setCumRapShow(cumRap)
        setSelectedCinemaIndex(index)
    }

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
                        return <a key={index} className={`nav-link ${classChoPhepActive}`} id="v-pills-home-tab" data-toggle="pill" href={`#${heThongRapChieu.maHeThongRap}`} role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => { chonHeThongRap(heThongRapChieu.maHeThongRap) }}>
                            <img src={heThongRapChieu.logo} />
                        </a>
                    })}
                </div>

                <div className="tab-content listCinema" id="v-pills-tabContent">
                    <div className='tab-pane fade active show' id={heThongRapShow?.maHeThongRap} role="tabpanel" aria-labelledby={`v-pills-${heThongRapShow?.maHeThongRap}-tab`}>
                        <div className="nav nav-pills" id={`v-pills-tab-${heThongRapShow?.maHeThongRap}`} role="tablist" aria-orientation="vertical">
                            {heThongRapShow.lstCumRap?.map((cumRap, index) => {
                                let classHienThi = .5;
                                if (index === selectedCinemaIndex) {
                                    classHienThi = 1;
                                }
                                let splitName = cumRap.tenCumRap.split("-", 2);
                                let tenCumRap = splitName[0];
                                let tenRap = splitName[1];
                                return <a key={index} className={`nav-link active`} data-toggle="pill" href={`#${cumRap.maCumRap}`} role="tab" aria-selected="false" onClick={() => { chonCumRap(cumRap, index) }} style={{opacity:`${classHienThi}`}}>
                                    <div className="partWrapper"></div>
                                    <img src={"./images/cinemaListImg.jpg"} />
                                    <div className='cinemaInfo'>
                                        <p className="cinemaName">
                                            <span className='tenCumRap'>{tenCumRap}</span>
                                            <span className='tenRap'>- {tenRap}</span>
                                        </p>
                                        <p className="cinemaAddress"> {cumRap.diaChi}</p>
                                        <span onClick={() => { chonRapChieu(heThongRapShow?.maHeThongRap, cumRap.maCumRap) }} className="cinemaDetail">[chi tiết]</span>
                                    </div>
                                </a>
                            })}
                        </div>

                    </div>
                </div>

                <div className="tab-content listMovieOfCinema" id="v-pills-tabContent" style={{ height: 300, overflowY: "auto" }}>
                    <div className={`tab-pane fade active show`} id={cumRapShow?.maCumRap} role="tabpanel">
                        {cumRapShow.danhSachPhim?.map((phim, index3) => {
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
                                <div className="bookingTime row">
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
    )
}
