import {useState, useEffect} from 'react'
import { deleteUser, getAllUsers, sendEmail } from '../../utils/api'
import { Link, useNavigate } from "react-router-dom";
import { userGroupNames } from '../../utils/info'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';




const UserList = () => {
    const navigate = useNavigate(); 
    const [users, setUsers] = useState([]);
    useEffect(() => {
            let  mounted = true;
            getAllUsers().then((res) => {
                if(mounted) {
                    setUsers(res)
                }
            })
            return () => mounted = false;
        }, [])

    const showEmailSent = () => {
        toast('Email was sent!');
    }

    const inviteUser = (id, email) => {
        sendEmail(id, email)
        .then(
            (res) => {showEmailSent();}
        )
            .then((res) => {navigate(`/userList`, {replace: true})})
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        await deleteUser(userId);
        navigate("/userList", {replace: true})
    }

    return (
        <>
            <div className="container">
                <h1>User List 📇</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Group</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {users.map(userInfo =>
                    <tbody key={userInfo._id}>
                        <tr>
                            <td>{userInfo.email}</td>
                            <td>{JSON.stringify(userInfo.verified)}</td>
                            <td>{userInfo.firstName}</td>
                            <td>{userInfo.lastName}</td>
                            <td>{userGroupNames[userInfo.userGroup]}</td>
                            <td>
                                <>
                                    {userInfo.verified == false ? 
                                        <button
                                           onClick={() => inviteUser(userInfo._id, userInfo.email)}
                                        >
                                            Invite
                                        </button> : 
                                        <Link 
                                            to={`/editUser/${userInfo._id}`} 
                                            className="column"
                                            state={{
                                                email: userInfo.email,
                                                _id: userInfo._id,
                                                verified: userInfo.verified,
                                                firstName: userInfo.firstName,
                                                lastName: userInfo.lastName,
                                                userGroup: userInfo.userGroup
                                            }}
                                            >
                                            <div className="column">
                                            <button>Edit</button>
                                            </div>
                                        </Link>
                                    }
                                    <button
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </>
                            </td>
                        </tr>
                    </tbody>
                    )}
                </table>
                <ToastContainer position="top-right" autoClose={3000} closeOnClick />
            </div>
        </>
    )
}


export default UserList