import React from 'react'
import { Link } from 'react-router-dom'

const LinkPage = () => {
    return (
        <section className='container'>
            <h1>
                Links
            </h1>
            <div>
                <h1>Public</h1>
                <div className='linkContainer'>
                    <Link to='../login'>Login</Link>
                    <Link to='../register'>Register</Link>
                </div>
            </div>
            <div>
                <h1>Public</h1>
                <div className='linkContainer'>
                    <Link to='../home'>Home</Link>
                    <Link to='../editor'>Editors Page</Link>
                    <Link to='../admin'>Admin Page</Link>
                </div>
            </div>
        </section>
    )
}

export default LinkPage