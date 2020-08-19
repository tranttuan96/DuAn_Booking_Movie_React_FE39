import React, { useEffect, useState } from 'react'
import { qlPhimService } from '../../../../services/quanLyPhimService';
import ChooseShowTimeBar from './ChooseShowTimeBar';
import CarouselMovieList from './CarouselMovieList';
export default function MovieList() {

    let [danhSachPhim, setDanhSachPhim] = useState([]);

    useEffect(() => {
        //Gọi service Api set lại state danhSachPhim
        qlPhimService.layDanhSachPhim().then(res => {
            console.log(res.data);
            setDanhSachPhim(res.data);
        }).catch(error => {
            console.log(error.response.data);
        });
    }, []);

    return (
        <div className="homepage__movieList">
            <ChooseShowTimeBar danhSachPhim={danhSachPhim}></ChooseShowTimeBar>
            <ul className="nav nav-tabs menuFilm" id="menuFilm" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="phimDangChieu-tab" data-toggle="tab" href="#phimDangChieu" role="tab" aria-controls="phimDangChieu" aria-selected="true">Phim đang chiếu</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="phimSapChieu-tab" data-toggle="tab" href="#phimSapChieu" role="tab" aria-controls="phimSapChieu" aria-selected="false">Phim sắp chiếu</a>
                </li>
            </ul>
            <div className="tab-content pt-5 text-center" id="myTabContent">
                <div className="tab-pane fade show active" id="phimDangChieu" role="tabpanel" aria-labelledby="phimDangChieu-tab">
                    <CarouselMovieList danhSachPhim={danhSachPhim}></CarouselMovieList>
                </div>
                <div className="tab-pane fade" id="phimSapChieu" role="tabpanel" aria-labelledby="phimSapChieu-tab">
                    <CarouselMovieList danhSachPhim={danhSachPhim}></CarouselMovieList>
                </div>
            </div>

        </div>
    )
}
