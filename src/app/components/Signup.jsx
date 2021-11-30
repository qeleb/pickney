import React from 'react';
import * as mutations from '../store/mutations';
import { connect } from 'react-redux';

const SignupComponent = ({ requestCreateUserAccount, authenticated }) => {
    return <div className="card p-3 col-6">
        <h2>sign up</h2>
        <form onSubmit={requestCreateUserAccount}>
            <span>username</span>
            <input type="text" placeholder="username" name="username" className="form-control mt-1" />
            <span>password</span>
            <input type="password" placeholder="password" name="password" className="form-control mt-1 mb-4" />
            <span>confirm password</span>
            <input type="password" placeholder="password" name="password-confirm" className="form-control mt-1" />

            {authenticated == mutations.USERNAME_RESERVED ? <p>this username already exists</p> : null}
            {/*true ? <p>the passwords do not match</p> : null*/}
            <button type="submit" className="form-control mt-2 btn btn-primary">sign up</button>
        </form>
    </div>
};

const mapStateToProps = state => ({
    authenticated: state.session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    requestCreateUserAccount(e) {
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        let passwordConfirm = e.target[`password-confirm`].value;
        if (password !== passwordConfirm) {
            // TODO: Show in UI that the passwords do not match
            console.log(`the passwords do not match`);
            return;
        }
        dispatch(mutations.requestCreateUserAccount(username, password, passwordConfirm));
    }
})

export const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);