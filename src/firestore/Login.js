import React, { useState, useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { auth } from './base';
import { AuthContext } from './Auth';
import './login.css';

const Login = ({ history }) => {
    const [newUser, setNewUser] = useState(false);

    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await auth.signInWithEmailAndPassword(email.value, password.value);
                history.push('/');
            } catch (error) {
                //if no user found
                let errorDiv = document.querySelector('.error');
                return (errorDiv.innerHTML = error);
            }
        },
        [history]
    );

    const handleSignUp = useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await auth.createUserWithEmailAndPassword(email.value, password.value);
                history.push('/');
            } catch (error) {
                let errorDiv = document.querySelector('.error');
                return (errorDiv.innerHTML = error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to='/' />;
    }

    function toggleNewUser() {
        setNewUser(!newUser);
    }

    return (
        <div className='login_container'>
            <div className='container_padding'>
                <div className='container_body'>
                    <form className='account_form' id='login_form' onSubmit={!newUser ? handleLogin : handleSignUp}>
                        <span className='account_form_title'> {!newUser ? 'Log in' : 'SignUp'} </span>
                        <div className='login_form_body'>
                            <div className='input_field' data-validate='Valid email is required: ex@abc.xyz'>
                                <input className='account_input' id='login_email' type='email' name='email' placeholder='Email' />
                                <span className='svg_container'>
                                    <svg
                                        className='svg-inline--fa fa-envelope fa-w-16'
                                        aria-hidden='true'
                                        focusable='false'
                                        data-prefix='fa'
                                        data-icon='envelope'
                                        role='img'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 512 512'
                                        data-fa-i2svg=''
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z'
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                            <div className='input_field' data-validate='Valid email is required: ex@abc.xyz'>
                                <input className='account_input' id='login_password' type='password' name='password' placeholder='Password' />
                                <span className='svg_container'>
                                    <svg
                                        className='svg-inline--fa fa-lock fa-w-14'
                                        aria-hidden='true'
                                        focusable='false'
                                        data-prefix='fa'
                                        data-icon='lock'
                                        role='img'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 448 512'
                                        data-fa-i2svg=''
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z'
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                            <div className='error'></div>
                            <button className='button btn_blue'>{!newUser ? 'Log in' : 'Signup'}</button>
                        </div>
                        <p className='toggle_link' onClick={toggleNewUser}>
                            {!newUser ? 'New User? Signup!' : 'Existing User? Login!'}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);
