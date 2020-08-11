import React, { Fragment } from 'react'

export default function DataUser(props) {

    const renderDataUser = () => {
        if (props.loading) {
            return <tr>
                <td>Loading....</td>
            </tr>
        }
        else {
            return props.posts.map((user, index) => {
                return <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{user.taiKhoan}</td>
                    <td type="password">{user.matKhau}</td>
                    <td>{user.hoTen}</td>
                    <td>{user.email}</td>
                    <td>{user.soDt}</td>
                    <td>
                        <button className="btn btn-success" data-toggle="modal" data-target="#updateUser" onClick={() => props.chonUserCapNhat(user)}>Chỉnh sửa</button>
                        <button className="btn btn-danger" onClick={() => props.xoaNguoiDung(user.taiKhoan)}>Xóa</button>
                    </td>
                </tr>
            })
        }
    }
    return (
        <Fragment>
            {renderDataUser()}
        </Fragment>
    )
}
