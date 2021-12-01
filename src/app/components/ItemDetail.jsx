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
    isOwner,
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
            {isOwner ?
                <div>
                    <input type="text" value={item.name} onChange={setItemName} className="form-control form-control-lg" />
                </div>
                :
                <h3>
                    {item.name} {isHidden ? `✓` : null}
                </h3>
            }

            <div className="mt-3">
                {isOwner ?
                    <div>
                        <div>
                            You are the owner of this item.
                            <button className="btn btn-secondary ml-2" onClick={() => setItemHidden(id, !isHidden)}>
                                {isHidden ? `Visable` : `Hide`} This Item
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <ConnectedUsernameDisplay id={item.owner} /> is the owner of this item.
                    </div>}
            </div>
            <div className="mt-2">
                {comments.map(comment => (
                    <div key={comment.id}>
                        <ConnectedUsernameDisplay id={comment.owner} /> : {comment.content}
                    </div>
                ))}
            </div>

            <form className="form-inline">
                <span className="mr-4">
                    Change Group
                </span>
                <select onChange={setItemGroup} className="form-control">
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </form>

            <form className="form-inline" onSubmit={(e) => addItemComment(id, sessionID, e)}>
                <input type="text" name="commentContents" autoComplete="off" placeholder="Add a comment" className="form-control" />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <div>
                <Link to="/dashboard">
                    <button className="btn btn-primary mt-2 ">Done</button>
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