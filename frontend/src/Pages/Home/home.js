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
            <h1>Home page</h1>
            <p>This is a page</p>
            <IssueList />
            {userData.userGroup == 0 && <p>Basic User</p>}
            {userData.userGroup == 1 && <p>Support User</p>}
            {userData.userGroup == 2 && <p>Admin User</p>}
        </>
    )
}


export default Home