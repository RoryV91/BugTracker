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

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/login", {replace: true});
    }
    return (
                <ul className="row">
                    <h1 className="column">MAJOR</h1>
                    <h5 className="column">for identifying malfunctions</h5>
                    <div className="column">
                        {userData.userGroup == 0 && <p>Basic User</p>}
                        {userData.userGroup == 1 && <p>Support User</p>}
                        {userData.userGroup == 2 && <p>Admin User</p>}
                    </div>
                    <Link to="/" className="column">
                        <button className="button button-outline">
                            Home
                        </button>
                    </Link>
                    <Link to="/newissue" className="column">
                        <button className="button button-outline">
                            New Issue
                        </button>
                    </Link>
                    <Link to="/myPosts" className="column">
                        <button className="button button-outline">
                            My Posts
                        </button>
                    </Link>
                    <Link to="/editprofile" className="column">
                        <button className="button button-outline">
                            Edit Profile
                        </button>
                    </Link>
                    {userData.userGroup == 2 && 
                        <Link to="/userList" className="column">
                            <button className="button button-outline">
                                User List
                            </button>
                        </Link>
                    }
                    <div className="column">
                    <button className="button button-outline" onClick={handleLogOut}>
                        Logout
                    </button>
                    </div>
                </ul>
    )

}

export default Nav