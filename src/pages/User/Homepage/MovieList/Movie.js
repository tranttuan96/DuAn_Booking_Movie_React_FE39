import React from 'react'
import { NavLink } from 'react-router-dom';
import ButtonPlayTrailer from '../../../../components/ButtonPlayTrailer';
import moment from 'moment';
import 'moment/locale/vi'
import { Rate } from 'antd';

export default function Movie(props) {

    let { phim } = props;

    return (
        <div className="px-2 film col-6 col-md-4 col-lg-3">
            <div className='filmThumnail'>
                <img src={phim.hinhAnh} style={{ width: '100%', height: '100%' }} alt={phim.hinhAnh} />
                <ButtonPlayTrailer phimTrailer={phim.trailer}></ButtonPlayTrailer>
                <div className="filmThumnail__hover"></div>
                <div className="filmThumnail__rating">
                    <p className="rating__number">{phim.danhGia}</p>
                    <Rate disabled allowHalf defaultValue={phim.danhGia / 2} />
                    <span className="half">&frac12;</span>
                </div>
                <div className={`publishDate ${props.showPublishDate}`}>
                   <p>{moment(phim.ngayKhoiChieu).format('L').slice(0, 5)}</p>
                </div>
            </div>
            <div className="filmInfo">
                <h4 className="filmName text-left" style={{ height: '60px', overflowY: 'hidden' }}>{phim.tenPhim}</h4>
                <NavLink className="btn btnDatVe" to={`/moviedetail/${phim.maPhim}`}>ĐẶT VÉ</NavLink>
            </div>
        </div>
    )
}
