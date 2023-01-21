import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateUser, getSingleUser, deleteUser } from '../../utils/api';
import { userGroupNames } from '../../utils/info'


const EditUser = (props) => {

    let {userId} = useParams()
    const location = useLocation()
    const { state } = location;
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
                        value={props.user.firstName}
                    />
                    <label>Last Name</label>
                    <input/>
                    <label>E-Mail Address</label>
                    <input/>
                    <label>User Group</label>
                    <select>
                        <option></option>
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