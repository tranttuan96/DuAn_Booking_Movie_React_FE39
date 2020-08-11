import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom';

export default function CinemaDetail(props) {

    useEffect(() => {
        console.log(props.match.params)
    }, [])
    return (
        <div>
            Cinema Detail
        </div>
    )
}
