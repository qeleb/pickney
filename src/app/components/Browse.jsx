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
            <nav aria-label="...">
            <ul className="pagination justify-content-center pagination-sm">
                <li className="page-item active" aria-current="page">
                    <span className="page-link">1</span>
                </li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
            </ul>
        </nav>
    </div>
);

export const ConnectedBrowseAll = connect(({ groups }) => ({ groups }))(Browse);
export const ConnectedBrowseBoys = connect(({ groups }) => ({ groups: groups.filter(group => group.name==='boys') }))(Browse);
export const ConnectedBrowseGirls = connect(({ groups }) => ({ groups: groups.filter(group => group.name==='girls') }))(Browse);
export const ConnectedBrowseSale = connect(({ groups }) => ({ groups: groups.filter(group => group.name==='sale') }))(Browse);