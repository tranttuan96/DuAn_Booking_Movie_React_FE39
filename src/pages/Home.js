import React, { useEffect, useState } from 'react'
import { qlPhimService } from '../services/quanLyPhimService';
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";

export default function Home(props) {

    let carouselPhim = [
        { stt: 1, hinhAnh: './images/carousel__image1.png', trailer: 'https://www.youtube.com/embed/dgUAoEIeigo' },
        { stt: 2, hinhAnh: './images/carousel__image2.png', trailer: 'https://www.youtube.com/embed/n78pJ_qsuw8' },
        { stt: 3, hinhAnh: './images/carousel__image3.png', trailer: 'https://www.youtube.com/embed/VMxp0LYtrKE' },
        { stt: 4, hinhAnh: './images/carousel__image4.png', trailer: 'https://www.youtube.com/embed/y2u2rJL_lDM' }
    ]

    let [danhSachPhim, setDanhSachPhim] = useState([]);
    let [trailerPhim, setTrailerPhim] = useState({});

    //Ứng với componentdidmount
    useEffect(() => {
        //Gọi service Api set lại state danhSachPhim
        qlPhimService.layDanhSachPhim().then(res => {
            console.log(res.data);
            setDanhSachPhim(res.data);
        }).catch(error => {
            console.log(error.response.data);
        })
    }, [])

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

    const renderCarousel = () => {
        return carouselPhim.map((phim, index) => {
            return <div key={index}>
                <img src={phim.hinhAnh} style={{ width: '100%', height: '100%' }}></img>
                {/* Button trigger modal */}
                <button type="button" className="btn slider__trailer" data-toggle="modal" data-target="#modelId" onClick={() => { chonTrailer(phim.trailer) }}>
                    <img src={'./images/play-video.png'}></img>
                </button>
            </div>
        })
    }

    const chonTrailer = (phimTrailer) => {
        console.log(phimTrailer)
        setTrailerPhim({...trailerPhim, trailer: phimTrailer });
    }

    const renderTrailer = () => {
        return <iframe width={560} height={315} src={trailerPhim?.trailer} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,

    };

    return (
        <div className="homepage">
            <Slider {...settings}>
                {renderCarousel()}
            </Slider>
            <div className="container">
                <div className="row">
                    {renderPhim()}
                </div>
            </div>



            {/* Modal */}
            <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {renderTrailer()}
                            {/* <iframe width={560} height={315} src="https://www.youtube.com/embed/dgUAoEIeigo" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

