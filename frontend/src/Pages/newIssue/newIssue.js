import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import { createIssue } from '../../utils/api';

const NewIssue = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        summary: '',
        description: '',
        priority: 0,
        status: 0,
        postedBy: localStorage.getItem('userId'),
        assignedTo: null,
        closedBy: null
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value })
    }
        
    const handleSubmit = async (event, formData) => {
        event.preventDefault()
        console.log(formData)
        createIssue(formData)
            .then((data) => {
                if (data.message) {
                    setFormData({
                        summary: '',
                        description: '',
                        priority: 0,
                        status: 0,
                        postedBy: localStorage.getItem('userId'),
                        assignedTo: null,
                        closedBy: null
                    })
                    navigate("/", {replace: true})
                } else {
                        window.alert("Error posting Issue!");
                }
            })
        }

    return (
        <>
            <section className="container">
                <h1>Post a new issue</h1>
                <form>
                    <label>Summary</label>
                    <input 
                        type="text"
                        name="summary"
                        onChange={handleChange}
                        value={formData.summary}
                        placeholder="Summary"
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        placeholder="Description"
                    />
                    <button 
                        onClick={(event) => handleSubmit(event, formData)}
                        type="submit"    
                    >
                        Submit
                    </button>
                </form>
            </section>
        </>
    )

}


export default NewIssue