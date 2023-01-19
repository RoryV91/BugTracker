import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import { updateIssue } from '../../utils/api';
import Nav from '../../components/Nav/nav';

    

const EditIssue = () => {

    const location = useLocation()
    const { state } = location;
    const navigate = useNavigate();     
    const [formItems, setFormItems] = useState();
    const [issueData, setIssueData] = useState({
        summary: state.summary,
        description: state.description,
        priority: state.priority,
        status: state.status,
        assignedTo: issueData.assignedTo,
        closedBy: issueData.closedBy
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
                <header>
                    <Nav />
                </header>
                <section class ="container">
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


export default EditIssue