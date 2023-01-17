import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'

const NewIssue = () => {
    
const [formItems, setFormItems] = useState(initialState);
initialState = [
    <>
        <label></label>
        <input></input>
        <label></label>
        <input></input>
    </>
]


    return (
        <section>
            <h1>Post a new issue</h1>
            <form>
                <label></label>
                <input></input>
                <label></label>
                <input></input>
            </form>
        </section>
    )
}

export default NewIssue