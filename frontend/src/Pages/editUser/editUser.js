import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser, getSingleUser, deleteUser } from '../../utils/api';
import { userGroupNames } from '../../utils/info'


const EditUser = (props) => {

    let {userId} = useParams()
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        userGroup: 0,
        verified: true
    });
    
    useEffect(() => {
        if (props.user.userGroup >= 1) {
            let  mounted = true;
            getSingleUser(userId).then((res) => {
                if(mounted) {
                    setUserData(res)
                }
            })
            return () => mounted = false;
        } else {
            
        }
    }, [])

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event, issueData) => {
        event.preventDefault();
        await updateUser(userData, userId).then((res) => {navigate(`/userList`, {replace: true})})
        }

    const handleDelete = async (event) => {
        event.preventDefault();
        await deleteUser(userId);
        navigate("/userList", {replace: true})
    }

    return (
        <>
            <div className="container">
                <h1>Edit User page</h1>
                <form>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        value={userData.firstName}
                    />
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        value={userData.lastName}
                    />
                    <label>E-Mail Address</label>
                    <input
                        name="email"
                        value={userData.email}
                    />
                    <label>Password</label>
                    <input />
                    <label>User Group</label>
                    <select
                        name="userGroup"
                        value={userData.userGroup}
                    >
                        <option value={0}>User</option>
                        <option value={1}>Support</option>
                        <option value={2}>Admin</option>
                    </select>
                    <div className="row">
                    <button className="column">
                        Submit
                    </button>
                    <button className="column column-offset-25">
                        Delete
                    </button>
                    <button 
                        className="column column-offset-25"
                        onClick={() => navigate(`/userList`)}
                    >
                        Cancel
                    </button>
                    </div>
                </form>  
            </div>
        </>
    )
}


export default EditUser