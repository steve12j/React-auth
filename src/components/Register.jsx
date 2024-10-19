import { faCheck, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [success, setSuccess] = useState(false);

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pass, setPass] = useState("");
    const [isValidPass, setIsValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [match, setMatch] = useState("");
    const [isValidMatch, setIsValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user))
    }, [user])

    useEffect(() => {
        setIsValidPass(PWD_REGEX.test(pass))
        setIsValidMatch(pass === match)
    }, [pass, match])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pass);

        if (!v1 || !v2) {
            setErrorMsg('Invalid Entry');
            return;
        };

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    username: user,
                    password: pass
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'withCredentials': true
                    },
                })
            console.log(response, 'Response data');
            setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrorMsg('No Server Response');
            } else if (error?.response?.status === 409) {
                setErrorMsg('Username Taken');
            } else {
                setErrorMsg('Registration Failed');
            }

            console.log(error, 'Error')

            errorRef?.current?.focus();
        }

    }

    return (
        <>
            {success ?
                <section>
                    <h1 aria-live='assertive'>
                        Registration Successful!
                    </h1>
                    <p>
                        <Link to='/login'>Sign In</Link>
                    </p>
                </section>
                :
                <section>
                    {errorMsg && <p ref={errorRef} aria-live="assertive" className='errmsg'>{errorMsg}</p>}
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faXmark} className={!validName && user ? "invalid" : "hide"} />
                        </label>
                        <input
                            ref={userRef}
                            autoComplete='off'
                            type="text"
                            id='username'
                            name="user"
                            value={user}
                            aria-invalid={!validName ? true : false}
                            aria-describedby='uidnote'
                            onChange={(e) => setUser(e.target.value)}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            4 to 24 characters<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor='password'>Password:
                            <FontAwesomeIcon icon={faCheck} className={isValidPass ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faXmark} className={!isValidPass && pass ? "invalid" : "hide"} />
                        </label>
                        <input
                            type="password"
                            id='password'
                            name="pass"
                            value={pass}
                            aria-invalid={!isValidPass ? true : false}
                            aria-describedby='passnote'
                            onChange={(e) => setPass(e.target.value)}
                            onFocus={() => setPassFocus(true)}
                            onBlur={() => setPassFocus(false)}
                        />
                        <p id="passnote" className={passFocus && !isValidPass ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            8 to 24 characters<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span><span aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="precent">%</span>
                        </p>

                        <label htmlFor='confirm'>Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={isValidMatch && pass ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faXmark} className={!isValidMatch && match ? "invalid" : "hide"} />
                        </label>
                        <input
                            type="password"
                            id='confirm'
                            name="match"
                            value={match}
                            aria-invalid={!isValidMatch ? true : false}
                            aria-describedby='matchnote'
                            onChange={(e) => setMatch(e.target.value)}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="matchnote" className={matchFocus && !isValidMatch ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            Must match the first password input field.
                        </p>
                        <button disabled={!validName || !isValidMatch || !isValidPass ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to='../login'>Sign In</Link>
                        </span>
                    </p>
                </section>}
        </>
    )
}

export default Register