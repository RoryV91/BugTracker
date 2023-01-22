import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getSingleUser, updateUser } from '../../utils/api';


const EditProfile = (props) => {
const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        userGroup: 0,
        verified: true
    });

    const [initialPassword, setInitialPassword] = useState('')

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.password == initialPassword) {
            userData.password = '';
        }
        console.log(JSON.stringify(userData))
        await updateUser(userData, userId).then((res) => {navigate(`/`, {replace: true})})
        }

    useEffect(() => {
            let  mounted = true;
            getSingleUser(userId).then((res) => {
                if(mounted) {
                    setUserData(res);
                    setInitialPassword(res.password)
                }
            })
            return () => mounted = false;
    }, [])

    return (
        <>
            <section className="container">
                <h1>Edit Profile 👤</h1>
                <form>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                    />
                    <label>E-Mail Address</label>
                    <input
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <div className="row">
                    <button 
                        className="column"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button 
                        className="column column-offset-25"
                        onClick={() => navigate(`/`)}
                    >
                        Cancel
                    </button>
                    </div>
                </form>
            </section>
        </>
    )
}


export default EditProfile