import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout';

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout()
        navigate('/');
    }

    return (
        <section className='container'>
            <h1>Home</h1>
            <p>You are logged in!</p>
            <Link to='../admin'>Go to Admin Page</Link>
            <Link to='../lounge'>Go to Lounge Page</Link>
            <Link to='../editor'>Go to Editor Page</Link>
            <Link to='..'>Go to Link Page</Link>
            <button onClick={signOut} className='alignSelf'>Sign Out</button>
        </section>
    )
}

export default Home