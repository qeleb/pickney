import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ConnectedUsernameDisplay } from './UsernameDisplay'
import {
    setItemName,
    setItemGroup,
    setItemInventory,
    setItemImg,
    setItemHidden,
    setItemDeleted,
    addItemComment,
} from '../store/mutations'

/* Automatically calls the REST API [via a mutation] to update the server on every change. */
const ItemDetail = ({
    id,                 // ID of Selected Item (For Matching Item Info)
    comments,           // Comments on the Item
    item,               // Item
    sessionID,          // Session ID
    groups,             // All Available Groups
    isAdmin,            // True/False, If User is Admin
    setItemName,        // Functions to Update Item & Add Comments ⬇
    setItemGroup,
    setItemInventory,
    setItemImg,
    setItemHidden,
    setItemDeleted,
    addItemComment
}) => {
    return (
        <div className="card p-3 col-6">
            {isAdmin ?
                <>
                    <div className="input-group">
                        <p className="me-4">title</p>
                        <input type="text" value={item.name} onChange={setItemName} className="form-control form-control-lg" />
                        <button className="btn btn-secondary" onClick={() => setItemHidden(id, !item.isHidden)}>{item.isHidden ? 'show' : 'hide'}</button>
                        <button className="btn btn-danger" onClick={() => setItemDeleted(id, !item.isDeleted)}>{item.isDeleted ? 'undelete' : 'delete'}</button>
                    </div>

                    <form className="input-group pt-3 pb-0">
                        <span className="me-4">change category</span>
                        <select onChange={setItemGroup} className="form-control">
                            <option key='default' value={null}>keep current category</option>
                            {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                        </select>
                    </form>

                    <div className="input-group pt-3 pb-0">
                        <p className="me-4">inventory</p>
                        <input type="number" value={item.inventory} onChange={setItemInventory} className="form-control form-control" />
                    </div>

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

                    <Link to="/"><button className="btn btn-primary mt-2">return to home page</button></Link>
                </>
            :
                <h1>Not an Admin</h1>
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        id,
        item: state.items.find(item => item.id === id),
        comments: state.comments.filter(comment => comment.item === id),
        sessionID: state.session.id,
        groups: state.groups,
        isAdmin: state.users.find(user => id === id).isAdmin
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    let id = ownProps.match.params.id;
    return {
        setItemName (e) { dispatch(setItemName(id, e.target.value)); },
        setItemGroup(e) { dispatch(setItemGroup(id, e.target.value)); },
        setItemInventory(e) { dispatch(setItemInventory(id, e.target.value)); },
        setItemImg(e) { dispatch(setItemImg(id, e.target.value)); },
        setItemHidden(id, isHidden) { dispatch(setItemHidden(id, isHidden)); },
        setItemDeleted(id, isDeleted) { dispatch(setItemDeleted(id, isDeleted)); },
        addItemComment(itemID, ownerID, e) {
            e.preventDefault();
            let input = e.target['commentContents'];
            if (input.value.length > 0) {
                dispatch(addItemComment(uuid()/*ID*/, itemID, ownerID, input.value));
                input.value =''; // Clear Comment Box
            }
        }
    }
}

export const ConnectedItemDetail = connect(mapStateToProps, mapDispatchToProps)(ItemDetail);