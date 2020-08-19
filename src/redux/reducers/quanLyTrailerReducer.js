
let trailerPhim = '';

const stateDefault={
    trailerPhim: trailerPhim
}

const quanLyTrailerReducer = (state= stateDefault, action) => {
    switch(action.type) {
        case 'TAT_TRAILER': {
            console.log(action.trailerPhim)
            state.trailerPhim = action.trailerPhim;
            console.log( state.trailerPhim)
            return {...state}
        };break;
        case 'CHON_TRAILER': {
            state.trailerPhim = action.trailerPhim;
            return {...state}
        };break;
    }

    return {...state}
}

export default quanLyTrailerReducer;