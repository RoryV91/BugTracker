import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import { createUser } from '../../utils/api';

const RequestAccess = () => {

    const navigate = useNavigate();     
    const [formData, setFormData] = useState({
        email: ''
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value })
    }
        
    const handleSubmit = async (event, formData) => {
        event.preventDefault()
        console.log(formData)
        createUser(formData)
            .then((data) => {
                if (data) {
                    setFormData({
                        email: ''
                    })
                    navigate("/", {replace: true})
                } else {
                        window.alert("Error!");
                }
            })
        }

    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className="column column-offset-33">REQUEST ACCESS</h1>
                </div>
                <div className="row">
                    <p className="column">Enter your e-mail address to request access to MAJOR from your organization. An Administrator will send you a unique access link for you to sign up with after verifying your e-mail address.</p>     
                </div>
                <p className="column">📩 Please check your spam folder for this e-mail!</p>
                <div className="row">
                    <form className="column">
                        <div className="row">
                            <label>E-mail Address</label>
                        </div>
                        <div className="row">
                            <input 
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={formData.email} 
                                className="column"
                                placeholder="Type your email here" 
                            />
                        </div>
                        <div className="row">
                            <button
                                onClick={(event) => handleSubmit(event, formData)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default RequestAccess