import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SignupComponent = ({ requestCreateUserAccount, authenticated }) => (
    <div className="mt-5" style={{display: 'flex', justifyContent: 'center'}}>
        <div className="card p-3 col-6">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>sign up</h1>
                <Link to="/" className='h4'>
                    login<i className="bi bi-person ms-2"></i>
                </Link>
            </div>
            <form onSubmit={requestCreateUserAccount}>
                <span>username</span>
                <input type="text" placeholder="username" name="username" className="form-control mt-1" />
                <span>password</span>
                <input type="password" placeholder="password" name="password" className="form-control mt-1 mb-4" />
                <span>confirm password</span>
                <input type="password" placeholder="password" name="password-confirm" className="form-control mt-1" />

                {authenticated == mutations.USERNAME_RESERVED ? <p>this username already exists</p> : null}
                {/*TODO: Show Password Validation Text <p>{passwordValid}</p> */}
                <button type="submit" className="form-control mt-2 btn btn-primary">sign up</button>
            </form>
        </div>
    </div>
);

const mapStateToProps = state => ({
    authenticated: state.session.authenticated
});

const mapDispatchToProps = dispatch => ({
    requestCreateUserAccount(e) {
        e.preventDefault();
        const PASSWORD_REQUIREMENTS=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/;
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        let passwordConfirm = e.target[`password-confirm`].value;
        if (password.length < 8 || password.length > 32) {
            // TODO: Show in UI that the password length is not valid
            console.log(`password must be 8-32 characters long`);
            return;
        }
        if (!password.match(PASSWORD_REQUIREMENTS)) {
            // TODO: Show in UI that the password needs 1 lower, 1 upper, 1 number, and 1 special character
            console.log(`password needs 1 lower, 1 upper, 1 number, and 1 special character`);
            return;
        }
        if (password !== passwordConfirm) {
            // TODO: Show in UI that the passwords do not match
            console.log(`passwords do not match`);
            return;
        }
        dispatch(mutations.requestCreateUserAccount(username, password, passwordConfirm));
    }
})

export const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);