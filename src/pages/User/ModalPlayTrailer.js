import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tatTrailerAction } from '../../redux/actions/quanLyTrailerAction'

export default function ModalPlayTrailer(props) {

    const trailerPhim = useSelector((state) => state.quanLyTrailerReducer.trailerPhim)
    const dispatch = useDispatch();

    const renderTrailer = () => {
        return <iframe src={`${trailerPhim}`} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
    }


    const tatTrailer = () => {
        dispatch(tatTrailerAction(''))
    }

    return (
        <div className="modal fade" id="playTrailer" tabIndex={-1} role="dialog" aria-labelledby="playTrailer" aria-hidden="true" data-keyboard="false" onClick={() => { tatTrailer() }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                    >
                            <img src={'/images/closeModal.png'}></img>
                    </button>
                    <div className="modal-body">
                        {renderTrailer()}
                    </div>
                </div>
            </div>
        </div>
    )
}
