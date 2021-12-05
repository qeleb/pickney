import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ConnectedUsernameDisplay } from './UsernameDisplay'
import {
    setItemName,
    setItemDesc,
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
    setItemDesc,
    setItemGroup,
    setItemInventory,
    setItemImg,
    setItemHidden,
    setItemDeleted,
    addItemComment
}) => {
    return (
        <div className="mt-5" style={{display: 'flex', justifyContent: 'center'}}>
            {isAdmin ?
                <div className="card p-3 col-10">
                    <h1>product editor</h1>
                    <div className="input-group">
                        <p className="me-4">name</p>
                        <input type="text" value={item.name} onChange={setItemName} className="form-control form-control-lg" />
                        <button className="btn btn-secondary" onClick={() => setItemHidden(id, !item.isHidden)}>{item.isHidden ? 'show' : 'hide'}</button>
                        <button className="btn btn-danger" onClick={() => setItemDeleted(id, !item.isDeleted)}>{item.isDeleted ? 'undelete' : 'delete'}</button>
                    </div>

                    <div className="input-group pt-3 pb-0">
                        <p className="me-4">description</p>
                        <textarea type="text" value={item.desc} rows='4' onChange={setItemDesc} className="form-control form-control-lg" />
                    </div>

                    <form className="input-group pt-3 pb-0">
                        <span className="me-4">category</span>
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
                        <p className="m-0 me-3">image</p>
                        <input className='btn btn-secondary' onChange={setItemImg} type="file" accept=".jpg, .jpeg, .png" />
                    </form>

                    <div className="mt-5">
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

                    <Link to="/" className="btn btn-primary mt-5">return to home page</Link>
                </div>
            :
                <div className="card p-3 col-10">
                    <h1 className="center">{item.name}</h1>
                    {/* TODO: Load Actual Product Images */}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={`${__dirname}public/no-img.png`} style={{width:'100%', maxWidth: '300px'}} alt="missing product image" />
                    </div>
                    <h5>{item.desc}</h5>
                </div>
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
        setItemDesc (e) { dispatch(setItemDesc(id, e.target.value)); },
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