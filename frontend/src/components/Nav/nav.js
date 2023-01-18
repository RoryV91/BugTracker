import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";


const Nav = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(
        { 
        userId: localStorage.getItem('userId'),
        userGroup: localStorage.getItem('userGroup')
        }
    )
    return (
        <div>
                <ul>
                    <h1>MAJOR</h1>
                    <Link to="/">Home</Link>
                    <Link to="/newissue">New Issue</Link>
                    <Link to="/myposts">My Posts</Link>
                    <Link to="/editprofile">Edit Profile</Link>
                    {userData.userGroup == 2 && <p>fuck you shut up</p>}
                    <button>Logout</button>
                </ul>
        </div>
    )

}

export default Nav