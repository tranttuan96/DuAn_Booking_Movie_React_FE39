import React, { useEffect, useState } from 'react'
// import { currentDate } from '../../../settings/config'

import Carousel from './Carousel';
import ModalPlayTrailer from '../ModalPlayTrailer';
import MovieList from './MovieList/MovieList';
import CinemaList from './CinemaList';

export default function Home(props) {

    return (
        <div className="homepage">
            <div className='homepage__carousel'>
                <Carousel ></Carousel>
            </div>
            <MovieList></MovieList>
            <CinemaList history={props.history}></CinemaList>
            <ModalPlayTrailer></ModalPlayTrailer>
        </div>
    )
}

