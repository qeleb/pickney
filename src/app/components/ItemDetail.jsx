import React from 'react';
import { connect } from 'react-redux';
import { history } from '../store';
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
    addToCollection
} from '../store/mutations'

/* Automatically calls the REST API [via a mutation] to update the server on every change. */
const ItemDetail = ({
    id,                 // ID of Selected Item (For Matching Item Info)
    comments,           // Comments on the Item
    item,               // Item
    image_path,         // Image Path
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
    addItemComment,
    addToCollection
}) => {
    return (
        <div className="mt-5" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <div className="card p-4">
            {console.log(item)}
                {isAdmin ?
                    <>
                        <h1>product editor</h1>
                        <hr />
                        <div className="input-group mt-3">
                            <p className="4">name</p>
                            <input type="text" value={item.name} onChange={setItemName} className="form-control form-control-lg" />
                            <button className="btn btn-secondary" onClick={() => setItemHidden(id, !item.isHidden)}>{item.isHidden ? 'show' : 'hide'}</button>
                            <button className="btn btn-danger" onClick={() => setItemDeleted(id, !item.isDeleted)}>{item.isDeleted ? 'undelete' : 'delete'}</button>
                        </div>

                        <div className="input-group pt-3 pb-0">
                            <p className="me-4">description</p>
                            <textarea type="text" value={item.desc} rows='4' onChange={setItemDesc} className="form-control form-control-lg" />
                        </div>

                        <form className="input-group pt-3 pb-0">
                        {/* 
                            <select onChange={setItemGroup} className="form-control">
                            <option key='default' value={null}>keep current category</option>
                            {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                            </select>
                        */}
                        <span className="me-4">category</span>
                        <ul style={{listStyleType:"none"}}>
                            {groups.map(group => <li key={group.id} style={{display:"inline"}} className="px-3">
                                <input type="checkbox" value={group.id} checked={(item.group).includes(group.id)} onChange={setItemGroup}/>
                            {group.name}</li>)}
                        </ul>
                        </form>

                        <div className="input-group pt-3 pb-0">
                            <p className="me-4">inventory</p>
                            <input type="number" value={item.inventory} onChange={setItemInventory} className="form-control form-control" />
                        </div>

                        <form className="input-group pt-3 pb-0 mb-3">
                            <p className="m-0 me-3">image</p>
                            <img src={image_path} style={{width:'100%', maxWidth: '100px'}} alt="missing product image" />
                            <input className='btn btn-secondary' onChange={setItemImg} type="file" accept=".jpg, .jpeg, .png" />
                        </form>
                    </>
                :
                    <>
                        <h1 className="center">{item.name}</h1>
                        <hr />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img src={image_path} style={{width:'100%', maxWidth: '300px'}} alt="missing product image" />
                        </div>
                        <h5 className="p-5">{item.desc}</h5>
                    </>
                }
                <hr />
                <div className="mt-3" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    {/* Show Which Items are Already in Cart or Favorites and Don't Allow them to be added again */}
                    <button className="btn btn-warning" style={{width: '20%'}} onClick={history.back}><i className="bi bi-arrow-left"></i>&nbsp;go back</button>
                    <button className="btn btn-secondary" style={{width: '20%'}} onClick={()=>addToCollection(sessionID, id, 'favorites')}><i className="bi bi-star"></i>&nbsp;favorite</button>
                    <button className="btn btn-primary" style={{width: '20%'}} onClick={()=>addToCollection(sessionID, id, 'cart')}><i className="bi bi-cart-plus"></i>&nbsp;add to cart</button>
                </div>
            </div>

            <div className="card p-3 mt-5">
                <h1>comments</h1>
                <hr />
                <div className="list-group p-3 pt-0" style={{ border: 'none' }}>
                    {comments.map(comment =>
                        <li className="list-group-item mx-5 mt-1" key={comment.id}><ConnectedUsernameDisplay id={comment.owner} />: {comment.content}</li>)}
                </div>
                <form className="input-group p-3 ps-0" onSubmit={(e) => addItemComment(id, sessionID, e)}>
                    <p className="me-4">post a comment</p>
                    <input type="text" name="commentContents" autoComplete="off" placeholder="comment" className="form-control" />
                    <button type="submit" className="btn btn-primary">post</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let item = state.items.find(item => item.id === id);
    return {
        id,
        item: item,
        image_path: item.img ? `${__dirname}public/images/${item.img}` : `${__dirname}public/no-img.png`,
        comments: state.comments.filter(comment => comment.item === id),
        sessionID: state.session.id,
        groups: state.groups,
        isAdmin: state.user.isAdmin
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        setItemName: (e) => dispatch(setItemName(id, e.target.value)),
        setItemDesc: (e) => dispatch(setItemDesc(id, e.target.value)),
        setItemGroup: (e) => dispatch(setItemGroup(id, e.target.value)),
        setItemInventory: (e) => dispatch(setItemInventory(id, e.target.value)),
        setItemImg: (e) => dispatch(setItemImg(id, e.target.files[0] || e.dataTransfer.files[0])),
        setItemHidden: (id, isHidden) => dispatch(setItemHidden(id, isHidden)),
        setItemDeleted: (id, isDeleted) => dispatch(setItemDeleted(id, isDeleted)),
        addToCollection: (ownerID, itemID, location) => dispatch(addToCollection(ownerID, itemID, location)),
        addItemComment: (itemID, ownerID, e) => {
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