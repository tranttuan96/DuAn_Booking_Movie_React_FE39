import React, { Fragment } from 'react'

export default function Pagination(props) {

    const totalPages = Math.ceil(props.totalPosts / props.postsPerPage);

    const pageNumbers = [];
    let { currentPage } = props;
    let pageCutLow = currentPage - 1;
    let pageCutHigh = currentPage + 1;
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPagination = () => {
        if (totalPages < 6) {
            return pageNumbers.map(number => (
                <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                    <a onClick={() => props.paginate(number)} className='page-link'>
                        {number}
                    </a>
                </li>
            ))
        }
        else {
            if (currentPage === 1) {
                pageCutHigh += 2;
            } else if (currentPage === 2) {
                pageCutHigh += 1;
            }
            // Determine how many pages to show before the current page index
            if (currentPage === totalPages) {
                pageCutLow -= 2;
            } else if (currentPage === totalPages - 1) {
                pageCutLow -= 1;
            }
            const pageShortNumber = [];
            for (let i = pageCutLow; i <= pageCutHigh; i++) {
                if (i === 0) {
                    i += 1;
                }
                if (i > totalPages) {
                    continue
                }
                pageShortNumber.push(i);
            }
            return <Fragment>
                {renderFrontShort()}
                {pageShortNumber.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <a onClick={() => props.paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                {renderBackShort()}
            </Fragment>
        }
    }

    const renderFrontShort = () => {
        if (currentPage > 2) {
            return <Fragment>
                <li key={1} className={`page-item`}>
                    <a onClick={() => props.paginate(1)} className='page-link'>
                        1
                    </a>
                </li>
                {renderSubFrontShort()}
            </Fragment>
        }
    }
    const renderSubFrontShort = () => {
        if (currentPage > 3) {
            return <Fragment>
                <li key={currentPage - 2} className={`page-item`}>
                    <a onClick={() => props.paginate(currentPage - 2)} className='page-link'>
                        ...
                    </a>
                </li>
            </Fragment>
        }
    }

    const renderBackShort = () => {
        if (currentPage < totalPages - 1) {
            return <Fragment>
                {renderSubBackShort()}
                <li key={totalPages} className={`page-item`}>
                    <a onClick={() => props.paginate(totalPages)} className='page-link'>
                        {totalPages}
                    </a>
                </li>
            </Fragment>
        }
    }

    const renderSubBackShort = () => {
        if (currentPage < totalPages - 1) {
            return <Fragment>
                <li key={currentPage + 2} className={`page-item`}>
                    <a onClick={() => props.paginate(currentPage + 2)} className='page-link'>
                        ...
                    </a>
                </li>
            </Fragment>
        }
    }

    return (
        <nav className="myPagination float-right">
            <ul className='pagination'>
                <li className="page-item">
                    <a className="page-link" aria-label="Previous" disabled={currentPage > 1 ? '' : 'disable'} onClick={() => props.paginate(currentPage - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {renderPagination()}
                <li className="page-item">
                    <a className="page-link" aria-label="Next" disabled={currentPage < totalPages ? '' : 'disable'} onClick={() => props.paginate(currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
