import React from 'react'

export default function SelectRowPerPage(props) {

    const {arrPostsPerPage} = props;
    const renderOption = () => {
        return arrPostsPerPage.map((rowNumber, index) => {
            return <option key={index}>{rowNumber}</option>
        })
    }

    return (
        <div className="form-group float-left d-flex"  style={{alignItems: 'center'}}>
            <label style={{width: '280px'}}>Số phần tử trên trang:
            </label>
            <select className="form-control" name="" id="" style={{display: 'inline-block'}} onChange={props.handleChangeSelectPostsPerPage}>
                    {renderOption()}
                </select>
        </div>
    )
}
