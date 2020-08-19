import React from 'react'
import { NavLink } from 'react-router-dom';
import ButtonPlayTrailer from '../../../../components/ButtonPlayTrailer';

import { Rate } from 'antd';

export default function Movie(props) {

    let { phim } = props;

    return (
        <div className="px-2 film" style={{ width: "25%" }}>
            <div className='filmThumnail'>
                <img src={phim.hinhAnh} style={{ width: '100%', height: '320px' }} alt={phim.hinhAnh} />
                <ButtonPlayTrailer phimTrailer={phim.trailer}></ButtonPlayTrailer>
                <div className="filmThumnail__hover"></div>
                <div className="filmThumnail__rating">
                    <p className="rating__number">{phim.danhGia}</p>
                    <Rate disabled allowHalf defaultValue={phim.danhGia/2}/>
                    <span>&frac12;</span>
                </div>
            </div>
            <div className="filmInfo">
                <h4 className="filmName text-left" style={{ height: '60px', overflowY: 'hidden' }}>{phim.tenPhim}</h4>
                <NavLink className="btn btnDatVe" to={`/moviedetail/${phim.maPhim}`}>ĐẶT VÉ</NavLink>
            </div>
        </div>
    )
}
