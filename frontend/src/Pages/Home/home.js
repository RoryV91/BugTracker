import IssueList from "../../components/issueList/issueList"
import Nav from "../../components/Nav/nav";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginToAccount } from '../../utils/api';



const Home = () => {
    const [userData, setUserData] = useState(
        { 
        userId: localStorage.getItem('userId'),
        userGroup: localStorage.getItem('userGroup')
        }
    )
    
    
    return (
        <>
            <header>
                <Nav />
            </header>
            <IssueList />
            
        </>
    )
}


export default Home