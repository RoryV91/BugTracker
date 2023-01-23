import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { signUpUser, lookupNewUser } from '../../utils/api';

const Signup = (props) => {

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

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userNumber = userId
        const userDataCopy = {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userGroup: userData.userGroup,
            verified: userData.verified
    
        }
        await signUpUser( userNumber, userDataCopy).then((data) => {
                if (data.accessToken) {
                    localStorage.accessToken = data.accessToken;
                    localStorage.refreshToken = data.refreshToken;
                    localStorage.email = data.email;
                    localStorage.userId = data.userId;
                    localStorage.userGroup = data.userGroup;
                    props.setUser(data);
                    navigate("/", {replace: true})
                } 
            })
    }

    useEffect(() => {
        let  mounted = true;
        lookupNewUser(userId).then((res) => {
            if(mounted) {
                setUserData(res)
            }
        })
        return () => mounted = false;
    }, [])

    return (
        <>
            <div className="container">
                <h1>Welcome to MAJOR</h1>
                <h2>To get started, enter your information below</h2>
                <form>
                <div className="row">
                        <label className="column">{userData.email}</label>
                    </div>
                    <div className="row">
                        <label className="column">first name</label>
                    </div>
                    <div className="row">
                        <input 
                            className="column"
                            name="firstName"
                            onChange={handleChange}
                            value={userData.firstName}
                        />
                    </div>
                    <div className="row">
                        <label className="column">last name</label>
                    </div>
                    <div className="row">
                        <input 
                            className="column"
                            name="lastName"
                            onChange={handleChange}
                            value={userData.lastName}    
                        />
                    </div>
                    <div className="row">
                        <label className="column">
                            password
                        </label>
                    </div>
                    <div className="row">
                        <input 
                            type="password"
                            name="password"
                            className="column"
                            onChange={handleChange}
                            value={userData.password}
                        />
                    </div>
                    <div className="row">
                        <button 
                            className="column"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button className="column column-offset-33">
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default Signup