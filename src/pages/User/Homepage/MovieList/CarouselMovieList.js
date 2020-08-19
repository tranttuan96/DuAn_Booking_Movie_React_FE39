import React from 'react'
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import Movie from './Movie';

export default function ShowingMovieList(props) {
    console.log(1)

    const totalPages = Math.ceil(props.danhSachPhim.length / 8);

    const carouselPhim = [];
    for (let i = 1; i <= totalPages; i++) {
        let tempPart = props.danhSachPhim.slice(8 * (i - 1), i * 8)
        carouselPhim.push(tempPart);
    }

    const renderPhim = () => {
        return carouselPhim.map(number => {
            return <div key={number} className="d-flex flex-wrap">
                {number.map((phim, index) => {
                    return <Movie phim={phim} key={index}></Movie>
                })
                }
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
        <div className='movieList__carousel'>
            <Slider {...settings}>
                {renderPhim()}
            </Slider>
        </div>

    )
}
