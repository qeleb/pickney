import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

export const ItemListItem = ({ id, name, commentCount, isComplete }) => (
    <Link to={`/item/${id}`}>
        <div className="card p-2 mt-2">
            <span>
                {name} ({commentCount}) {isComplete ? `✓` : null}
            </span>
        </div>
    </Link>
);

export const ConnectedItemListItem = connect((state, ownProps) => {
    return {
        ...state.items.find(item => item.id === ownProps.id),
        commentCount: state.comments.filter(comment => comment.item === ownProps.id).length
    };
})(ItemListItem);