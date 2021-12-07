import React from 'react';
import { connect } from 'react-redux';
import { ConnectedItemList } from './ItemList';

const Browse = ({ groups }) => (
    <div className="browse">
        <div className="item-grid">
            {groups.map(group => (
                <ConnectedItemList key={group.id} {...group} />
            ))}
        </div>
    </div>
);

export const ConnectedBrowseAll = connect(({ groups }) => ({ groups }))(Browse);
export const ConnectedBrowseBoys = connect(({ groups }) => ({ groups: groups.filter(group => group.name==='boys') }))(Browse);
export const ConnectedBrowseGirls = connect(({ groups }) => ({ groups: groups.filter(group => group.name==='girls') }))(Browse);
export const ConnectedBrowseSale = connect(({ groups }) => ({ groups: groups.filter(group => group.name==='sale') }))(Browse);