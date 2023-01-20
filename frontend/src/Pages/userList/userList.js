import {useState, useEffect} from 'react'
import { getAllUsers } from '../../utils/api'
import { Link, useNavigate } from "react-router-dom";
import { userGroupNames } from '../../utils/info'

const UserList = () => {

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

    return (
        <>
            <div className="container">
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
                    {users.map(user =>
                    <tbody key={user._id}>
                        <tr>
                            <td>{user.email}</td>
                            <td>{JSON.stringify(user.verified)}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{userGroupNames[user.userGroup]}</td>
                            <td>
                                <>
                                    {user.verified == false ? 
                                        <button>Invite</button> : 
                                        <button>Edit</button> 
                                    }
                                    <button>Delete</button>
                                </>
                            </td>
                        </tr>
                    </tbody>
                    )}
                </table>
            </div>
        </>
    )
}


export default UserList