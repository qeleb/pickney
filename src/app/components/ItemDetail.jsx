/**
 * The item detail component route is a more sophisticated form that has many different fields.
 * The component automatically calls the REST API [via a mutation] to update the server on every change.
 */
import React from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ConnectedUsernameDisplay } from './UsernameDisplay'
import {
    setItemHidden,
    addItemComment,
    setItemGroup,
    setItemName
} from '../store/mutations'

const ItemDetail = ({
    id,
    comments,
    item,
    isOwner, // Check if owner to show edit form
    isHidden,
    sessionID,
    groups,

    setItemHidden,
    addItemComment,
    setItemGroup,
    setItemName
}) => {
    return (
        <div className="card p-3 col-6">
            <div className="input-group">
                <p className="me-4">title</p>
                <input type="text" value={item.name} onChange={setItemName} className="form-control form-control-lg" />
                <button className="btn btn-secondary ml-2" onClick={() => setItemHidden(id, !isHidden)}>{isHidden ? `Show` : `Hide`} This Item</button>
            </div>

            <div className="mt-3 mb-4">
                <p className="m-0 mb-1">comments</p>
                <div className="list-group p-3 pt-0">
                    {comments.map(comment => <li class="list-group-item" key={comment.id}><ConnectedUsernameDisplay id={comment.owner} /> : {comment.content}</li>)}
                </div>
            </div>

            <form className="input-group p-3 ps-0" onSubmit={(e) => addItemComment(id, sessionID, e)}>
                <p className="me-4">post a comment</p>
                <input type="text" name="commentContents" autoComplete="off" placeholder="comment" className="form-control" />
                <button type="submit" className="btn btn-primary">post</button>
            </form>

            <form className="input-group p-3 ps-0">
                <span className="me-4">change category</span>
                <select onChange={setItemGroup} className="form-control">
                    <option key='default' value={null}>keep current category</option>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
            </form>

            <div>
                <Link to="/dashboard">
                    <button className="btn btn-primary mt-2 ">save changes</button>
                </Link>
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.id;
    let item = state.items.find(item => item.id === id);
    let comments = state.comments.filter(comment => comment.item === id);
    let isOwner = state.session.id === item.owner;
    let groups = state.groups;

    return {
        id,
        item,
        comments,
        isOwner,
        sessionID: state.session.id,
        isHidden: item.isHidden,
        groups
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    let id = ownProps.match.params.id;
    return {
        setItemHidden(id, isHidden) {
            dispatch(setItemHidden(id, isHidden));
        },
        setItemGroup(e) {
            dispatch(setItemGroup(id, e.target.value));
        },
        setItemName(e) {
            dispatch(setItemName(id, e.target.value));
        },
        addItemComment(itemID, ownerID, e) {
            let input = e.target[`commentContents`];
            let commentID = uuid();
            let content = input.value;
            e.preventDefault();
            if (content !== ``) {
                input.value = ``;
                dispatch(addItemComment(commentID, itemID, ownerID, content));
            }
        }
    }
}

export const ConnectedItemDetail = connect(mapStateToProps, mapDispatchToProps)(ItemDetail);