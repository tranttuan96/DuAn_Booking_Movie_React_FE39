import React, { useState } from 'react'
import moment from 'moment';
import 'moment/locale/vi'
import { NavLink } from 'react-router-dom';
import { qlPhimService } from '../../../../services/quanLyPhimService';

export default function ChooseShowTimeBar(props) {

    let { danhSachPhim } = props;

    let [selectMovie, setSelectMovie] = useState({
        values: {
            phim: '',
            rap: '',
            ngayXem: '',
            suatChieu: '',
        },
    });

    let [thongTinPhim, setThongTinPhim] = useState({});

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
        // console.log(event.target.value)
        // console.log(event.target.value)
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
            // console.log(res.data);
            setThongTinPhim(res.data)
        }).catch(errors => {
            console.log(errors.response.data);
        });
    };

    const handleChangeSelectCinema = (event) => {
        // console.log(event.target.value)
        // console.log(event.currentTarget.getAttribute('data-rap'))
        let { value, name } = event.target;
        //Tạo ra object this.selectMovie.values mới
        const newValues = {
            ...selectMovie.values,
            [name]: value
        }
        // console.log(newValues)
        //setState lại values và errors
        setSelectMovie({ values: newValues });
    };

    return (
        <div className="searchMovie">
            <form >
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
        </div>

    )
}
