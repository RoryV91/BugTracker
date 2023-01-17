import IssueList from "../../components/issueList/issueList"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginToAccount } from '../../utils/api';




const BasicUser = () => {


    
    return (
        <>
            <h1>Basic User page</h1>
            <p>This is a page</p>
            <IssueList />
        </>
    )
}


export default BasicUser