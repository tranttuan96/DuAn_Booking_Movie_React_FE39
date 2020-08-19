import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tatTrailerAction } from '../../redux/actions/quanLyTrailerAction'

export default function ModalPlayTrailer(props) {

    const trailerPhim = useSelector((state) => state.quanLyTrailerReducer.trailerPhim)
    const dispatch = useDispatch();

    const renderTrailer = () => {
        return <iframe width={560} height={315} src={trailerPhim} frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
    }
    

    const tatTrailer = () => {
        dispatch(tatTrailerAction(''))
    }

    return (
        <div className="modal fade" id="playTrailer" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true" data-keyboard="false" onClick={() => { tatTrailer() }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {renderTrailer()}
                        </div>
                    </div>
                </div>
            </div>
    )
}
