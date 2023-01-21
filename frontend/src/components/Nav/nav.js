import { Link, useNavigate } from "react-router-dom";


const Nav = (props) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        props.setUser(null)
        navigate("/login", {replace: true});
    }
    return (
                <ul className="row">
                    <h1 className="column">MAJOR</h1>
                    <h5 className="column">for identifying malfunctions</h5>
                    { props.user &&
                    <>
                        <div className="column">
                            {props.user.userGroup == 0 && <p>Basic User</p>}
                            {props.user.userGroup == 1 && <p>Support User</p>}
                            {props.user.userGroup == 2 && <p>Admin User</p>}
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
                        {props.user.userGroup == 2 && 
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
                    </>
                    }
                </ul>
    )

}

export default Nav
