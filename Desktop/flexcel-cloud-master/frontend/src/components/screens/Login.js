import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './../../styling/Login.css';
import Button from 'react-bootstrap/esm/Button';
import LoginButton from './LoginButton.js';
import { useAuth0 } from '@auth0/auth0-react';

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    /*
    const handleSubmit = async e => {
        e.preventDefault();
        const token = ({
            username,
            password
        });
        setToken(token);
    }*/

    return(
        <div className="loginWrapper">
            <h1 className="loginHeader">Log In</h1>
            <form>
                <label className="loginLabel">
                    <text className="loginText">Username</text>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label className="loginLabel">
                    <text className="loginText">Password</text>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div className="loginButton">
                    <button onClick={() => loginWithRedirect()}>
                        Log In
                    </button>
                    <button onClick={() => logout()}>
                        Log Out
                    </button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};