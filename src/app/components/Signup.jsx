import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const SignupComponent = ({ requestCreateUserAccount, authenticated }) => (
    <div className="mt-5" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="card p-3 col-6">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>sign up</h1>
                <Link to="/login" className='h4'>login<i className="bi bi-person ms-2"></i></Link>
            </div>
            <form onSubmit={requestCreateUserAccount}>
                <span id='username-tip'>username</span>
                <input type="text" placeholder="username" name="username" className="form-control mt-1 mb-1" />
                <span id='password-tip'>password</span>
                <input type="password" placeholder="password" name="password" className="form-control mt-1 mb-4" />
                <span id='password-confirm-tip'>confirm password</span>
                <input type="password" placeholder="password" name="password-confirm" className="form-control mt-1  mb-4" />

                {authenticated == mutations.USERNAME_RESERVED ? <p>this username already exists</p> : null}
                <button type="submit" className="form-control mt-2 btn btn-primary">sign up</button>
            </form>
        </div>
    </div>
);

const mapStateToProps = state => ({ authenticated: state.session.authenticated });

const mapDispatchToProps = dispatch => ({
    requestCreateUserAccount(e) {
        e.preventDefault();
        const PASSWORD_REQUIREMENTS = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/;
        let username = e.target['username'].value;
        let password = e.target['password'].value;
        let passwordConfirm = e.target['password-confirm'].value;
        if (username.length < 3 || username.length > 32) {
            document.getElementById('username-tip').innerText = 'username (must be 3-32 characters long)';
            document.getElementById('username-tip').style = 'color: red';
            return;
        }
        document.getElementById('username-tip').innerText = 'username';
        document.getElementById('username-tip').style = 'color: white';
        if (password.length < 8 || password.length > 32) {
            document.getElementById('password-tip').innerText = 'password (must be 8-32 characters long)';
            document.getElementById('password-tip').style = 'color: red';
            return;
        }
        if (!password.match(PASSWORD_REQUIREMENTS)) {
            document.getElementById('password-tip').innerText = 'password (must contain 1 lowercase, 1 uppercase, 1 number, and 1 special character)';
            document.getElementById('password-tip').style = 'color: red';
            return;
        }
        if (password !== passwordConfirm) {
            document.getElementById('password-tip').innerText = 'password';
            document.getElementById('password-tip').style = 'color: white';
            document.getElementById('password-confirm-tip').innerText = 'confirm password (must match password)';
            document.getElementById('password-confirm-tip').style = 'color: red';
            return;
        }
        dispatch(mutations.requestCreateUserAccount(username, password, passwordConfirm));
    }
})

export const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);