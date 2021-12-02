import { connect } from 'react-redux';
import React from 'react';
import { ConnectedItemList } from './ItemList';

const Dashboard = ({ groups }) => (
    <div className="item-grid">
        {groups.map(group => (
            <ConnectedItemList key={group.id} {...group} className="col" />
        ))}
    </div>
);

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);