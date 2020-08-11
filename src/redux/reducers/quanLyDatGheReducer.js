let dataGheDangDat = {
    maLichChieu:"",
    danhSachGheDangDatData : []
};

const initialState = {
    dataGheDangDat: dataGheDangDat
}

const quanLyDatGheReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LUU_TRU_DANH_SACH_GHE_DANG_DAT': {
            state.dataGheDangDat = action.dataGheDangDat;
            return {...state}
        };break;
    }

    return {...state}
}

export default quanLyDatGheReducer;
