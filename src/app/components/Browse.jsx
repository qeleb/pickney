import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemList } from './ItemList';

const Browse = ({ groups }) => (
    <div className="item-grid">
        {groups.map(group => (
            <ConnectedItemList key={group.id} {...group} />
        ))}
    </div>
);

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedBrowse = connect(mapStateToProps)(Browse);