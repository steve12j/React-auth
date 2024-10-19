import { useEffect, useRef, useState } from 'react'
import axios from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const userRef = useRef(null);
    const errorMessageRef = useRef(null);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username: user, password }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
            setAuth(response?.data);
            setUser('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error)
            if (!error?.response) {
                setErrorMessage('No Server Response');
            } else if (error.response.status === 400) {
                setErrorMessage('Username And Password Is Required');
            } else if (error.response.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }

            errorMessageRef.current?.focus();
        }

    }

    const toggleCheckbox = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist))
    }, [persist])

    return (
        <section>
            {errorMessage && <p ref={errorMessageRef} className='errmsg' aria-live='assertive'>{errorMessage}</p>}
            <h1>Sign In</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id='username'
                    autoComplete='off'
                    ref={userRef}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    aria-label='username'
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id='password'
                    aria-label='password'
                    autoComplete='off'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className='persistCheck'>
                    <input
                        type="checkbox"
                        id="persist"
                        checked={!!persist}
                        onChange={toggleCheckbox}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
                <button className='button'>Sign In</button>
            </form>
            <>
                <p>Need An Account? </p>
                <Link to='../register'>Sign up</Link>
            </>
        </section>
    )
}

export default Login