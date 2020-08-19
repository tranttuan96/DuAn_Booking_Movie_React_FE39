import React, { useState, useEffect } from 'react';
import { qlPhimService } from '../../../services/quanLyPhimService';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import { Rate } from 'antd';
import ButtonPlayTrailer from '../../../components/ButtonPlayTrailer';
import ModalPlayTrailer from '../ModalPlayTrailer'

export default function MovieDetail(props) {


    let [thongTinPhim, setThongTinPhim] = useState({});


    //Gọi service lấy dữ liệu hiển thị component tại lifecycle componentDidmount
    useEffect(() => {
        qlPhimService.layThongTinPhim_LichChieu(props.match.params.maPhim).then((res) => {
            console.log(res.data);
            setThongTinPhim(res.data)
        }).catch(errors => {
            console.log(errors.response.data);
        })
    }, [])

    const renderRatingValue = () => {
        if (Object.keys(thongTinPhim).length !== 0) {
            return <div className="progress-value">
                <div>{(thongTinPhim?.danhGia).toFixed(1)}</div>
            </div>
        }
    }

    const renderRatingStar = () => {
        if (Object.keys(thongTinPhim).length !== 0) {
            return <div className="ratingStar text-center">
                <Rate disabled allowHalf defaultValue={thongTinPhim?.danhGia / 2} />
                <span className="half">&frac12;</span>
            </div>
        }
    }

    return (
        <div className="movieDetail">
            <div className="movieDetail__intro">
                <div className="movieDetail__intro-backImg">
                    <img className="landscape" src={thongTinPhim.hinhAnh} />
                </div>
                <div className="movieDetail__intro-backGradient">
                </div>
                <div className="movieDetail__intro-info">
                    <div className="movieImg col-3">
                        <img class='movieThump' src={thongTinPhim.hinhAnh}></img>
                        <ButtonPlayTrailer phimTrailer={thongTinPhim?.trailer}></ButtonPlayTrailer>
                    </div>
                    <div className="movieInfo col-6">
                        <p className="movieStart">{moment(thongTinPhim?.ngayKhoiChieu).format('L')}</p>
                        <div className="info1">
                            <span className="ageType">C18</span>
                            <span className="movieName">{thongTinPhim?.tenPhim}</span>
                        </div>
                        <div className="info2">
                            <span>100 phút - 0 IMDb - 2D/Digital</span>
                        </div>
                        <a className="directToContent" href="#pills-tab">Mua vé</a>
                    </div>
                    <div className="movieRating col-3">
                        <div className="progress" data-percentage={String(thongTinPhim?.danhGia * 10)}>
                            <span className="progress-left">
                                <span className="progress-bar" />
                            </span>
                            <span className="progress-right">
                                <span className="progress-bar" />
                            </span>
                            {renderRatingValue()}
                        </div>
                        {renderRatingStar()}
                    </div>
                </div>
            </div>
            <div className="movieDetail__content">
                <ul className="nav nav-pills mb-3 mainMenu" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#lichChieu" role="tab" aria-controls="pills-home" aria-selected="true">Lịch chiếu</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#thongTin" role="tab" aria-controls="pills-profile" aria-selected="false">Thông tin</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#danhGia" role="tab" aria-controls="pills-contact" aria-selected="false">Đánh giá</a>
                    </li>
                </ul>

                <div className="tab-content mainContent" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="lichChieu" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="row mx-0">
                            <div className="nav flex-column nav-pills listPCinema" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {thongTinPhim.heThongRapChieu?.map((heThongRap, index) => {
                                    let classChoPhepActive = '';
                                    let isUpppercase = '';
                                    if (index == 0) {
                                        classChoPhepActive = "active";
                                    }
                                    if (heThongRap.tenHeThongRap === 'cgv') {
                                        isUpppercase = 'text-uppercase';
                                    }
                                    return <a key={index} className={`nav-link ${classChoPhepActive}`} id="v-pills-home-tab" data-toggle="pill" href={`#${heThongRap.maHeThongRap}`} role="tab" aria-controls="v-pills-home" aria-selected="true">
                                        <img className="mr-1" src={heThongRap.logo} />
                                        <span className={isUpppercase}>{heThongRap.tenHeThongRap}</span>
                                    </a>
                                })}
                            </div>

                            <div className="tab-content listCinema" id="v-pills-tabContent">
                                {thongTinPhim.heThongRapChieu?.map((heThongRap, index) => {
                                    let classChoPhepActive = '';
                                    if (index == 0) {
                                        classChoPhepActive = "active show";
                                    }
                                    return <div key={index} className={`tab-pane fade ${classChoPhepActive}`} id={heThongRap.maHeThongRap} role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        {/* {heThongRap.tenHeThongRap} */}
                                        {heThongRap.cumRapChieu.map((cumRap, index) => {
                                            let splitName = cumRap.tenCumRap.split("-", 2);
                                            let tenCumRap = splitName[0];
                                            let tenRap = splitName[1];
                                            return <div key={index} className="movieShowtime">
                                                <img src={"/images/cinemaListImg.jpg"} />
                                                <div className="cinemaInfo">
                                                    <p className="cinemaName">
                                                        <span className='tenCumRap'>{tenCumRap}</span>
                                                        <span>- {tenRap}</span>
                                                    </p>
                                                    <p className="cinemaAddress">Địa chỉ......</p>
                                                </div>
                                                <div className='type'>2D Digital</div>
                                                <div className="bookingTime row mx-0">
                                                    {cumRap.lichChieuPhim?.slice(0, 6).map((lichChieu, index) => {
                                                        return <NavLink to={`/showtime/${lichChieu.maLichChieu}`} key={index}>{moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}</NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        })}

                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="thongTin" role="tabpanel" aria-labelledby="pills-profile-tab">123123</div>
                    <div className="tab-pane fade" id="danhGia" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                </div>
            </div>
            <ModalPlayTrailer></ModalPlayTrailer>
        </div>
    )
}

