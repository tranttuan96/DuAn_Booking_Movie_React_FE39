
let taiKhoan = '';

if (localStorage.getItem('userLogin')) 
{
    taiKhoan = localStorage.getItem('userLogin');
}

const stateDefault={
    taiKhoan:taiKhoan
}

const quanLyNguoiDungReducer = (state= stateDefault, action) => {
    switch(action.type) {
        case 'DANG_NHAP': {
            state.taiKhoan = action.taiKhoan;
            return {...state}
        };break;
    }

    return {...state}
}

export default quanLyNguoiDungReducer;