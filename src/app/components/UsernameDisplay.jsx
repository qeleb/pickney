import React from 'react';
import { connect } from 'react-redux';

export const UsernameDisplay = ({ name, isAdmin }) =>
    <span>{name.length > 10 ? name.slice(0, 10) + '...' : name}{isAdmin ? ' (admin)' : ''}</span>;

const mapStateToProps = (state) => state.user;

export const ConnectedUsernameDisplay = connect(mapStateToProps)(UsernameDisplay);