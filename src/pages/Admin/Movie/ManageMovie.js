import React, { useState, useEffect } from 'react'
import { qlPhimService } from '../../../services/quanLyPhimService';
import Pagination from '../Pagination';
import Search from '../Search';
import { NavLink } from "react-router-dom";
import DataMovie from './DataMovie';
import ModalUpdateMovie from './ModalUpdateMovie';
import swal from 'sweetalert';

export default function ManageMovie() {

    const [danhSachPhim, setDanhSachPhim] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    let [currentPosts, setCurrentPosts] = useState([]);
    const [postsPerPage] = useState(10);

    const searchPlaceholder = 'Tìm kiếm';
    const [isSearching, setIsSearching] = useState(false);
    const [searchingData, setSearchingData] = useState([])

    const [updateMovie, setUpdateMovie] = useState({});

    
    useEffect(() => {
        setLoading(true);
        qlPhimService.layDanhSachPhim().then(res => {
            console.log(res.data);
            setDanhSachPhim(res.data);
            setLoading(false);
        }).catch(error => {
            console.log(error.response.data);
        });

    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // Get current posts
    if (isSearching === false) {
        currentPosts = danhSachPhim.slice(indexOfFirstPost, indexOfLastPost);
    }
    if (isSearching === true) {
        currentPosts = searchingData.slice(indexOfFirstPost, indexOfLastPost);
    }

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleSearch = (event) => {
        let searchValue = event.target.value;
        console.log(searchValue)
        if (searchValue !== '') {
            setIsSearching(true);
            let searchTempData = danhSachPhim.filter(phim =>
                // console.log(Object.values(phim))
                Object.values(phim).some(value =>
                    String(value)
                        .toLowerCase()
                        .includes(String(searchValue).toLowerCase())
                )
            )
            // let searchTempData = danhSachPhim.filter(phim =>  phim.maPhim === 1314 )
            setSearchingData(searchTempData);
            setCurrentPage(1)
        }
        else {
            setIsSearching(false);
            // setCurrentPosts([]);
        }
    }

    const chonPhimCapNhat = (phim) => {
        setUpdateMovie(phim)
    }

    const xoaPhim = (maPhim) => {
        console.log(maPhim)
        qlPhimService.xoaPhim(maPhim).then(res => {
            console.log(res.data);
            swal('', "Xóa phim thành công", "success", {
                buttons: false,
                timer: 1500,
            });
            qlPhimService.layDanhSachPhim().then(res => {
                console.log(res.data);
                setDanhSachPhim(res.data);
            }).catch(error => {
                console.log(error.response.data);
            });
        }).catch(err => {
            swal('Oops', err.response.data, "error", {
                buttons: false,
                timer: 1500,
            });
            console.log(err.response.data);
        })
    }

    return (
        <div className="manageMovie">
            <h4>Quản lý Phim</h4>
            <div className="clearfix">
                <Search handleSearch={handleSearch} searchPlaceholder={searchPlaceholder}></Search>
                <NavLink className='btn btn-success nav-link float-right' to="/admin/themphim">Thêm phim</NavLink>
            </div>

            <div className="danhSachPhim">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mã phim</th>
                            <th>Tên phim</th>
                            <th>Hình ảnh</th>
                            <th>Mô tả</th>
                            <th>Mã nhóm</th>
                            <th>Ngày khởi chiếu</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <DataMovie posts={currentPosts} loading={loading} chonPhimCapNhat={chonPhimCapNhat} xoaPhim={xoaPhim}></DataMovie>
                    </tbody>
                </table>
                <div>
                    <Pagination postsPerPage={postsPerPage}
                        totalPosts={isSearching === false ? danhSachPhim.length : searchingData.length}
                        paginate={paginate}
                        currentPage={currentPage}></Pagination>
                </div>
                
            </div>
            <ModalUpdateMovie updateMovie={updateMovie} setDanhSachPhim={setDanhSachPhim}></ModalUpdateMovie>
        </div>
    )
}
