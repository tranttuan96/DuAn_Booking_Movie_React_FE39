import React, { useEffect, useState } from 'react'
import { qlPhimService } from '../services/quanLyPhimService';
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import moment from 'moment';
import 'moment/locale/vi'
moment.locale('vi')

export default function Home(props) {

    let carouselPhim = [
        { stt: 1, hinhAnh: './images/carousel__image1.png', trailer: 'https://www.youtube.com/embed/dgUAoEIeigo' },
        { stt: 2, hinhAnh: './images/carousel__image2.png', trailer: 'https://www.youtube.com/embed/n78pJ_qsuw8' },
        { stt: 3, hinhAnh: './images/carousel__image3.png', trailer: 'https://www.youtube.com/embed/VMxp0LYtrKE' },
        { stt: 4, hinhAnh: './images/carousel__image4.png', trailer: 'https://www.youtube.com/embed/y2u2rJL_lDM' }
    ]

    let [danhSachPhim, setDanhSachPhim] = useState([]);
    let [trailerPhim, setTrailerPhim] = useState({});
    let [selectMovie, setSelectMovie] = useState({
        values: {
            phim: '',
            rap: '',
            ngayXem: '',
            suatChieu: '',
        },
    });
    let [thongTinPhim, setThongTinPhim] = useState({});
    let [heThongRap, setHeThongRap] = useState([]);
    let [lichChieuTheoHeThongRap, setLichChieuTheoHeThongRap] = useState([]);
    // Ứng với componentdidmount
    useEffect(() => {
        //Gọi service Api set lại state danhSachPhim
        qlPhimService.layDanhSachPhim().then(res => {
            console.log(res.data);
            setDanhSachPhim(res.data);
        }).catch(error => {
            console.log(error.response.data);
        });

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

    const renderPhim = () => {
        return danhSachPhim.map((phim, index) => {
            return <div className="col-4" key={index} >
                <div className="card text-left mt-5">
                    <img className="card-img-top" src={phim.hinhAnh} style={{ width: '100%', height: 450 }} alt={phim.hinhAnh} />
                    <div className="card-body">
                        <h4 className="card-title">{phim.tenPhim}</h4>
                        <NavLink className="btn btn-success" to={`/moviedetail/${phim.maPhim}`}>ĐẶT VÉ</NavLink>
                    </div>
                </div>
            </div>
        })
    }

    //carousel
    const renderCarousel = () => {
        return carouselPhim.map((phim, index) => {
            return <div key={index}>
                <img src={phim.hinhAnh} style={{ width: '100%', height: '100%' }}></img>
                {/* Button trigger modal */}
                <button type="button" className="btn slider__trailer" data-toggle="modal" data-target="#modelId" onClick={() => { xemTrailer(phim.trailer) }}>
                    <img src={'./images/play-video.png'}></img>
                </button>
            </div>
        })
    }

    const xemTrailer = (phimTrailer) => {
        setTrailerPhim({ ...trailerPhim, trailer: phimTrailer });
    }

    const tatTrailer = () => {
        setTrailerPhim({ ...trailerPhim, trailer: '' });
    }

    const renderTrailer = () => {
        return <iframe width={560} height={315} src={trailerPhim?.trailer} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
    }


    //searchBar
    const renderSelectFilm = () => {
        return danhSachPhim.map((phim, index) => {
            if (index < 10) {
                return <option value={phim.maPhim} key={index}>{phim.tenPhim}</option>
            }
        })
    }

    const renderSelectCinema = () => {
        if (selectMovie.values.phim) {
            return thongTinPhim.heThongRapChieu?.map((heThongRap, index) => {
                return heThongRap.cumRapChieu.map((cumRap, index2) => {
                    return <option value={cumRap.maCumRap} key={index2}>{cumRap.tenCumRap}</option>
                })

            })
        }
        else {
            return <option disabled>Vui lòng chọn phim</option>
        }

    }

    const renderSelectDate = () => {
        if (selectMovie.values.rap) {
            return thongTinPhim.heThongRapChieu?.map((heThongRap, index) => {
                let cumRapTemp = heThongRap?.cumRapChieu.find(cumRap => cumRap.maCumRap === selectMovie.values.rap);
                return cumRapTemp?.lichChieuPhim.map((ngayChieu, index2) => {
                    if (index2 === 0) {
                        return <option key={index2} value={moment(ngayChieu.ngayChieuGioChieu).format('L')}>{moment(ngayChieu.ngayChieuGioChieu).format('L')}</option>;
                    }
                    else {
                        let tempDate = moment(cumRapTemp?.lichChieuPhim[index2 - 1].ngayChieuGioChieu).format('L');
                        if (tempDate !== moment(ngayChieu.ngayChieuGioChieu).format('L')) {
                            return <option key={index2} value={moment(ngayChieu.ngayChieuGioChieu).format('L')}>{moment(ngayChieu.ngayChieuGioChieu).format('L')}</option>;
                        }
                    }
                })
            })
        }
        else {
            return <option disabled>Vui lòng chọn rạp</option>
        }
    }

    const renderSelectSession = () => {
        if (selectMovie.values.ngayXem) {
            return thongTinPhim.heThongRapChieu?.map((heThongRap, index) => {
                let cumRapTemp = heThongRap?.cumRapChieu.find(cumRap => cumRap.maCumRap === selectMovie.values.rap);
                return cumRapTemp?.lichChieuPhim.map((ngayChieu, index2) => {
                    if (moment(ngayChieu.ngayChieuGioChieu).format('L') === selectMovie.values.ngayXem) {
                        return <option key={index2} value={ngayChieu.maLichChieu}>{moment(ngayChieu.ngayChieuGioChieu).format("hh:mm A")}</option>;
                    }
                })
            })
        }
        else {
            return <option disabled>Vui lòng chọn ngày xem</option>
        }
    }

    const renderButtonSelectFilm = () => {
        let classChoPhepDat = "disabled";
        let { values } = selectMovie;
        let valid = true;
        for (let key in values) {
            if (values[key] === '') { //Nếu như có 1 values = rổng thì không hợp lệ
                valid = false;
            }
        }
        if (valid) {
            classChoPhepDat = "";
        }
        return <NavLink className={`btn ${classChoPhepDat}`} id="buy_tiket" to={`/showtime/${selectMovie.values.suatChieu}`}>MUA VÉ NGAY</NavLink>
    }

    const handleChangeSelectFilm = (event) => {
        let { value, name } = event.target;
        console.log(event.target.value)
        console.log(event.target.value)
        //Tạo ra object this.selectMovie.values mới
        const newValues = {
            // phim: event.target.value,
            // rap: '',
            ...selectMovie.values,
            [name]: value,
            rap: '',
            ngayXem: '',
        }
        //setState lại values
        setSelectMovie({ values: newValues });
        qlPhimService.layThongTinPhim_LichChieu(newValues?.phim).then((res) => {
            console.log(res.data);
            setThongTinPhim(res.data)
        }).catch(errors => {
            console.log(errors.response.data);
        });
    };

    const handleChangeSelectCinema = (event) => {
        console.log(event.target.value)
        // console.log(event.currentTarget.getAttribute('data-rap'))
        let { value, name } = event.target;
        //Tạo ra object this.selectMovie.values mới
        const newValues = {
            ...selectMovie.values,
            [name]: value
        }
        console.log(newValues)
        //setState lại values và errors
        setSelectMovie({ values: newValues });
    };

    //xử lý component CumRap
    const chonRapChieu = (maHeThongRap, maCumRap) => {
        console.log(maHeThongRap, maCumRap)
        props.history.push(`/cinemadetail/${maHeThongRap}/${maCumRap}`);
    }



    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 6000,

    };

    return (
        <div className="homepage">
            <Slider {...settings}>
                {renderCarousel()}
            </Slider>
            <div className="container homepage__movieList">
                <form className="searchMovie">
                    <div className="form-group w30p widthByPercent selectFilm">
                        <select className="selectMenu" name="phim" onChange={handleChangeSelectFilm}>
                            {renderSelectFilm()}
                            <option defaultValue hidden>Phim</option>
                        </select>
                    </div>
                    <div className="form-group dropdown smallBlock widthByPercent selectCinema">
                        <select className="selectMenu" name="rap" onChange={handleChangeSelectCinema}>
                            <option defaultValue hidden>Rạp</option>
                            {renderSelectCinema()}
                        </select>
                    </div>
                    <div className="form-group dropdown smallBlock widthByPercent selectDate">
                        <select className="selectMenu" name="ngayXem" onChange={handleChangeSelectCinema}>
                            <option defaultValue hidden>Ngày xem</option>
                            {renderSelectDate()}
                        </select>
                    </div>
                    <div className="form-group dropdown smallBlock widthByPercent selectSession">
                        <select className="selectMenu" name="suatChieu" onChange={handleChangeSelectCinema}>
                            <option defaultValue hidden>Suất chiếu</option>
                            {renderSelectSession()}
                        </select>
                    </div>

                    <div className="form-group smallBlock widthByPercent">
                        {renderButtonSelectFilm()}
                    </div>
                </form>
                <div className="row">
                    {renderPhim()}
                </div>
            </div>
            <div id="cumRap" className="container mt-5">
                <div className="row">
                    <div className="nav flex-column nav-pills col-1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        {heThongRap?.map((heThongRapChieu, index) => {
                            let classChoPhepActive = '';
                            if (index == 0) {
                                classChoPhepActive = "active";
                            }
                            return <a key={index} className={`nav-link ${classChoPhepActive}`} id="v-pills-home-tab" data-toggle="pill" href={`#${heThongRapChieu.maHeThongRap}`} role="tab" aria-controls="v-pills-home" aria-selected="true">
                                <img className="mr-1" src={heThongRapChieu.logo} style={{ width: 35, height: 35 }} />
                            </a>
                        })}
                    </div>

                    <div className="tab-content col-4" id="v-pills-tabContent" style={{ height: 300, overflowY: "auto" }}>
                        {lichChieuTheoHeThongRap?.map((heThongRapChieu, index) => {
                            let classChoPhepActive = '';
                            if (index ==0) {
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
                                            <p> {cumRap.tenCumRap}</p>
                                            <p> {cumRap.diaChi}</p>
                                            <div onClick={() => { chonRapChieu(heThongRapChieu.maHeThongRap, cumRap.maCumRap) }}>[chi tiết]</div>
                                        </a>
                                    })}
                                </div>

                            </div>
                        }
                        )}
                    </div>
                    <div className="tab-content col-7" id="v-pills-tabContent" style={{ height: 300, overflowY: "auto" }}>
                        {lichChieuTheoHeThongRap?.map((heThongRapChieu, index) => {
                            return heThongRapChieu.lstCumRap.map((cumRap, index2) => {
                                let classChoPhepActive = '';
                                if (index ==0 && index2 == 0) {
                                    classChoPhepActive = "active show";
                                }
                                return <div key={index2} className={`tab-pane fade ${classChoPhepActive}`} id={cumRap.maCumRap} role="tabpanel">
                                    {cumRap.danhSachPhim.map((phim, index3) => {
                                        return <p key={index3}>{phim.tenPhim}</p>
                                    })}
                                </div>
                            })
                        }
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" data-keyboard="false" onClick={() => { tatTrailer() }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {renderTrailer()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

