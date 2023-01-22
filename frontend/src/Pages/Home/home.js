import IssueList from "../../components/issueList/issueList"
import { useState } from 'react'



const Home = () => {
    const [userData, setUserData] = useState(
        { 
        userId: localStorage.getItem('userId'),
        userGroup: localStorage.getItem('userGroup')
        }
    )
    
    
    return (
        <>
            <IssueList />
            
        </>
    )
}


export default Home