import React from 'react'
import { useDispatch } from 'react-redux'
import { chonTrailerAction } from '../redux/actions/quanLyTrailerAction'

export default function ButtonPlayTrailer(props) {

    const dispatch = useDispatch();

    const xemTrailer = (phimTrailer) => {
        dispatch(chonTrailerAction(phimTrailer))
    }

    return (

        <button type="button" className="btn buttonTrailer" data-toggle="modal" data-target="#playTrailer" onClick={() => { xemTrailer(props.phimTrailer) }}>
            <img src={'/images/play-video.png'}></img>
        </button>

    )
}
