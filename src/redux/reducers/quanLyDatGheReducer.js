let danhSachGheDangDatData = [];

const initialState = {
    danhSachGheDangDatData: danhSachGheDangDatData
}

const quanLyDatGheReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LUU_TRU_DANH_SACH_GHE_DANG_DAT': {
            state.danhSachGheDangDatData = action.danhSachGheDangDatData;
            return {...state}
        };break;
    }

    return {...state}
}

export default quanLyDatGheReducer;
