import React, { useState, useEffect } from 'react'
import { qlNguoiDungService } from '../../../services/quanLyNguoiDungService';
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import Pagination from '../Pagination';
import Search from '../Search';
import DataUser from './DataUser';
import SelectRowPerPage from '../SelectRowPerPage';
import ModalUpdateUser from './ModalUpdateUser';

export default function ManageUser() {

    const [danhSachNguoiDung, setDanhSachNguoiDung] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    let [currentPosts, setCurrentPosts] = useState([]);

    const arrPostsPerPage = [10, 25, 50];
    const [postsPerPage, setPostsPerPage] = useState(arrPostsPerPage[0]);

    const searchPlaceholder = 'Nhập vào tài khoản, họ tên, số điện thoại hoặc email';
    const [isSearching, setIsSearching] = useState(false);
    const [searchingData, setSearchingData] = useState([])

    const [updateUser, setUpdateUser] = useState({});

    useEffect(() => {
        setLoading(true);
        qlNguoiDungService.layDanhSachNguoiDung().then(res => {
            console.log(res.data);
            setDanhSachNguoiDung(res.data);
            setLoading(false);
        }).catch(error => {
            console.log(error.response.data);
        });
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    // Get current posts
    if (isSearching === false) {
        currentPosts = danhSachNguoiDung.slice(indexOfFirstPost, indexOfLastPost);
    }

    if (isSearching === true) {
        currentPosts = searchingData.slice(indexOfFirstPost, indexOfLastPost);
    }

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleChangeSelectPostsPerPage = (event) => {
        setPostsPerPage(event.target.value)
    }

    const handleSearch = (event) => {
        let tempSearchValue = event.target.value;
        if (tempSearchValue !== '') {
            setIsSearching(true);
            let searchTempData = danhSachNguoiDung.filter(user =>
                Object.values(user).some(value =>
                    String(value)
                        .toLowerCase()
                        .includes(String(tempSearchValue).toLowerCase())
                )
            )
            setSearchingData(searchTempData);
            setCurrentPage(1)
        }
        else {
            setIsSearching(false);
        }
    }

    const chonUserCapNhat = (phim) => {
        setUpdateUser(phim)
    }

    const xoaNguoiDung = (taiKhoan) => {
        qlNguoiDungService.xoaNguoiDung(taiKhoan).then(res => {
            console.log(res.data);
            swal('', "Xóa Người dùng thành công", "success", {
                buttons: false,
                timer: 1500,
            });
            qlNguoiDungService.layDanhSachNguoiDung().then(res => {
                console.log(res.data);
                setDanhSachNguoiDung(res.data);
            }).catch(error => {
                console.log(error.response.data);
            });
            if (isSearching) {
                // let searchTempData = matchSearchData(searchValue);
                // console.log(danhSachNguoiDung)
                // setSearchingData(searchTempData);
                let searchingDataAfterDel = searchingData.filter(user => user.taiKhoan !== taiKhoan)
                setSearchingData(searchingDataAfterDel)
            }
            // ko được do hàm matchSearchData thực hiện trước khi danhSachNguoiDung set lại xong 
            // => ý tưởng: cắt phần tử xóa khỏi searchTempData
        }).catch(err => {
            swal('Oops', err.response.data, "error", {
                buttons: false,
                timer: 1500,
            });
            console.log(err.response.data);
        })
    }

    return (
        <div>
            <h4>Quản lý Người dùng</h4>
            <div className="clearfix">
                <Search searchPlaceholder={searchPlaceholder} handleSearch={handleSearch}></Search>
                <NavLink className='btn btn-success nav-link float-right' to="/admin/themnguoidung">Thêm Người dùng</NavLink>
            </div>

            <div className="danhSachPhim">
                <table className="table table-bordered ">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <DataUser posts={currentPosts} loading={loading} chonUserCapNhat={chonUserCapNhat} xoaNguoiDung={xoaNguoiDung}></DataUser>
                    </tbody>
                </table>
                <div className="clearfix">
                    <SelectRowPerPage arrPostsPerPage={arrPostsPerPage} handleChangeSelectPostsPerPage={handleChangeSelectPostsPerPage}></SelectRowPerPage>
                    <Pagination postsPerPage={postsPerPage}
                        totalPosts={isSearching === false ? danhSachNguoiDung.length : searchingData.length}
                        paginate={paginate} currentPage={currentPage}></Pagination>
                </div>
            </div>
            <ModalUpdateUser updateUser={updateUser} setDanhSachNguoiDung={setDanhSachNguoiDung}></ModalUpdateUser>
        </div>
    )
}
