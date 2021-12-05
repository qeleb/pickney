import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const ItemListItem = ({ id, name, commentCount, isHidden }) => (
    <Link to={`/item/${id}`}>
        <div className="card pt-2 m-2">
            <div className='center'>
                <img src="../../../public/no-img.png" style={{width:'100%', maxWidth: '100px'}}className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
                <div className='center'><p className="card-text m-0">{name}</p></div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <p className="card-text text-muted m-0">{`${commentCount} comment${commentCount == 1 ? '' : 's'}`}</p>
                    <p className="card-text secondary m-0">{isHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}</p> {/* TODO: Only Show for Admins */}
                </div>
            </div>
        </div>
    </Link>
);

export const ConnectedItemListItem = connect((state, ownProps) => {
    return {
        ...state.items.find(item => item.id === ownProps.id),
        commentCount: state.comments.filter(comment => comment.item === ownProps.id).length
    };
})(ItemListItem);