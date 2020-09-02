import React, { useEffect, useState } from 'react'
import { qlPhimService } from '../../../../services/quanLyPhimService';
import ChooseShowTimeBar from './ChooseShowTimeBar';
import CarouselMovieList from './CarouselMovieList';
export default function MovieList() {

    // let [danhSachPhim, setDanhSachPhim] = useState([]);
    const [danhSachPhimDangChieu, setDanhSachPhimDangChieu] = useState([]);
    const [danhSachPhimSapChieu, setDanhSachPhimSapChieu] = useState([]);

    useEffect(() => {
        // qlPhimService.layDanhSachPhim().then(res => {
        //     console.log(res.data);
        //     setDanhSachPhim(res.data);
        // }).catch(error => {
        //     console.log(error.response.data);
        // });
        qlPhimService.layDanhSachPhimDangChieu().then(res => {
            // console.log(res.data);
            setDanhSachPhimDangChieu(res.data);
        }).catch(error => {
            console.log(error.response.data);
        });
        qlPhimService.layDanhSachPhimSapChieu().then(res => {
            // console.log(res.data);
            setDanhSachPhimSapChieu(res.data);
        }).catch(error => {
            console.log(error.response.data);
        });
    }, []);

    const renderPhimSapChieu = () => {
        if (danhSachPhimSapChieu.length === 0) {
            return <h5>Chưa có phim mới!</h5>
        }
        else return <CarouselMovieList danhSachPhim={danhSachPhimSapChieu} showPublishDate={'d-block'}></CarouselMovieList>
    }

    return (
        <div className="homepage__movieList" id="movieList">
            <ChooseShowTimeBar danhSachPhim={danhSachPhimDangChieu}></ChooseShowTimeBar>
            <ul className="nav nav-tabs menuFilm" id="menuFilm" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="phimDangChieu-tab" data-toggle="tab" href="#phimDangChieu" role="tab" aria-controls="phimDangChieu" aria-selected="true">Đang Chiếu</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="phimSapChieu-tab" data-toggle="tab" href="#phimSapChieu" role="tab" aria-controls="phimSapChieu" aria-selected="false">Sắp Chiếu</a>
                </li>
            </ul>
            <div className="tab-content pt-5 text-center" id="myTabContent">
                <div className="tab-pane fade show active" id="phimDangChieu" role="tabpanel" aria-labelledby="phimDangChieu-tab">
                    <CarouselMovieList danhSachPhim={danhSachPhimDangChieu} showPublishDate={'d-none'}></CarouselMovieList>
                </div>
                <div className="tab-pane fade" id="phimSapChieu" role="tabpanel" aria-labelledby="phimSapChieu-tab">
                    {renderPhimSapChieu()}
                </div>
            </div>

        </div>
    )
}
