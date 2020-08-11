
let userLogin = '';

if (localStorage.getItem('userLogin')) 
{
    userLogin = JSON.parse(localStorage.getItem('userLogin'));
}

const stateDefault={
    taiKhoan: userLogin.taiKhoan
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