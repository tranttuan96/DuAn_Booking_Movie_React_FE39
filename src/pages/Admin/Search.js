import React from 'react'

export default function Search(props) {

    return (

        <div className="form-group has-search float-left">
            {/* <span className="fa fa-search form-control-feedback" /> */}
            <input type="text" className="form-control" placeholder={props.searchPlaceholder} name="search" onChange={props.handleSearch} style={{width: '450px'}}/>
        </div>

    )
}
