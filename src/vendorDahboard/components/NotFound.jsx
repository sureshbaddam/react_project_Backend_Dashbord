import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="errorSection">
                <h1>404</h1>
                <div>Page Not found</div>
                <Link to="/" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>Go Back</Link>
            </div>
        </>
    )
}

export default NotFound