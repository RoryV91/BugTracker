import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";


const Nav = () => {
    const navigate = useNavigate();
    initialState = [
        <>
            <h1>MAJOR</h1>
            <Link to="/">Home</Link>
            <Link to="/newissue">New Issue</Link>
            <Link to="/myposts">My Posts</Link>
            <Link to="/editprofile">Edit Profile</Link>
            <button onClick={handleLogout}>Logout</button>
        </>
    ]
    const [navItems, setNavItems] = useState(initialState);


    return (
        <div>
            <header>
                <ul>
                    {navItems}
                </ul>
            </header>
        </div>
    )

}

export default Nav