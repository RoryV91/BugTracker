import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateUser, getSingleUser, deleteUser } from '../../utils/api';
import { userGroupNames } from '../../utils/info'


const EditUser = () => {

    return (
        <>
            <div className="container">
                <h1>Edit User page</h1>
                <form>
                    <label>First Name</label>
                    <input></input>
                    <label>Last Name</label>
                    <input></input>
                    <label>E-Mail Address</label>
                    <input></input>
                    <label>User Group</label>
                    <select>
                        <option></option>
                    </select>
                    <div className="row">
                    <button className="column">Submit</button>
                    <button className="column column-offset-25">Delete</button>
                    <button className="column column-offset-25">Cancel</button>
                    </div>
                </form>  
            </div>
        </>
    )
}


export default EditUser