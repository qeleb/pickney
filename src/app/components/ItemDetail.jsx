import React from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ConnectedUsernameDisplay } from './UsernameDisplay'
import {
    setItemName,
    setItemGroup,
    setItemImg,
    setItemHidden,
    addItemComment
} from '../store/mutations'

/* Automatically calls the REST API [via a mutation] to update the server on every change. */
const ItemDetail = ({
    id,
    comments,
    item,
    isOwner, //TODO: Check if owner to show edit form
    isHidden,
    sessionID,
    groups,

    setItemName,
    setItemGroup,
    setItemImg,
    setItemHidden,
    addItemComment
}) => {
    return (
        <div className="card p-3 col-6">
            <div className="input-group">
                <p className="me-4">title</p>
                <input type="text" value={item.name} onChange={setItemName} className="form-control form-control-lg" />
                <button className="btn btn-secondary ml-2" onClick={() => setItemHidden(id, !isHidden)}>{isHidden ? `show` : `hide`} this item</button>
            </div>

            <form className="input-group pt-3 pb-0">
                <span className="me-4">change category</span>
                <select onChange={setItemGroup} className="form-control">
                    <option key='default' value={null}>keep current category</option>
                    {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                </select>
            </form>

            <form className="input-group pt-3 pb-0">
                <p className="m-0 me-3">item image</p>
                <input className='btn btn-secondary' onChange={setItemImg} type="file" accept=".jpg, .jpeg, .png" />
            </form>

            <div className="mt-3">
                <p className="m-0 mb-1">comments</p>
                <div className="list-group p-3 pt-0">
                    {comments.map(comment => <li className="list-group-item" key={comment.id}><ConnectedUsernameDisplay id={comment.owner} /> : {comment.content}</li>)}
                </div>
            </div>

            <form className="input-group p-3 ps-0" onSubmit={(e) => addItemComment(id, sessionID, e)}>
                <p className="me-4">post a comment</p>
                <input type="text" name="commentContents" autoComplete="off" placeholder="comment" className="form-control" />
                <button type="submit" className="btn btn-primary">post</button>
            </form>

            <Link to="/dashboard"><button className="btn btn-primary mt-2">back</button></Link>
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
        setItemName(e) {
            dispatch(setItemName(id, e.target.value));
        },
        setItemGroup(e) {
            dispatch(setItemGroup(id, e.target.value));
        },
        setItemImg(e) {
            dispatch(setItemImg(id, e.target.value));
        },
        setItemHidden(id, isHidden) {
            dispatch(setItemHidden(id, isHidden));
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