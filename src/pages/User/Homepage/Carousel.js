import React from 'react'
import { useDispatch } from 'react-redux'
import Slider from "react-slick";
import { chonTrailerAction } from '../../../redux/actions/quanLyTrailerAction'
import ButtonPlayTrailer from '../../../components/ButtonPlayTrailer';

export default function Carousel() {

    let carouselPhim = [
        { stt: 1, hinhAnh: './images/carousel__image1.png', trailer: 'https://www.youtube.com/embed/dgUAoEIeigo' },
        { stt: 2, hinhAnh: './images/carousel__image2.png', trailer: 'https://www.youtube.com/embed/n78pJ_qsuw8' },
        { stt: 3, hinhAnh: './images/carousel__image3.png', trailer: 'https://www.youtube.com/embed/VMxp0LYtrKE' },
        { stt: 4, hinhAnh: './images/carousel__image4.png', trailer: 'https://www.youtube.com/embed/y2u2rJL_lDM' }
    ]

    //carousel
    const renderCarousel = () => {
        return carouselPhim.map((phim, index) => {
            return <div key={index}>
                <img src={phim.hinhAnh} style={{ width: '100%', height: '100%' }}></img>
                {/* Button trigger modal */}

                <ButtonPlayTrailer phimTrailer={phim.trailer}></ButtonPlayTrailer>

            </div>
        })
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
        <Slider {...settings}>
            {renderCarousel()}
        </Slider>
    )
}
