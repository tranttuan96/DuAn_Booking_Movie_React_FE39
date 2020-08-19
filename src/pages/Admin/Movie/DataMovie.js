import React, { Fragment } from 'react'

export default function DataMovie(props) {

    const renderDataPhim = () => {
        if (props.loading) {
            return <tr>
                <td>Loading....</td>
            </tr>
        }
        else {
            return props.posts.map((phim, index) => {
                return <tr key={index}>
                    <td>{phim.maPhim}</td>
                    <td>{phim.tenPhim}</td>
                    <td><img src={phim.hinhAnh} style={{width: '50px', height : '50px' }}></img></td>
                    <td>{phim.moTa}</td>
                    <td>{phim.maNhom}</td>
                    <td>{phim.ngayKhoiChieu}</td>
                    <td>
                        <button className="btn btn-success" data-toggle="modal" data-target="#updateMovie" onClick={() => props.chonPhimCapNhat(phim)}>Chỉnh sửa</button>
                        <button className="btn btn-danger" onClick={() => props.xoaPhim(phim.maPhim)}>Xóa</button>
                    </td>
                </tr>
            })
        }
    }

    return (
        <Fragment>
            {renderDataPhim()}
        </Fragment>
    )
}
