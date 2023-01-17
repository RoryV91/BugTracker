import {useState, useEffect} from 'react'
import { getAllIssues } from '../../utils/api'



const IssueList = () => {

    const [issues, setIssues] = useState([]);
    const [testIssues, setTestIssues] = useState([{"summary": "something", "description": "something"}]);

    useEffect(() => {
            let  mounted = true;
            getAllIssues().then((res) => {
                if(mounted) {
                    setIssues(res)
                }
            })
            return () => mounted = false;
        }, [])

    return (
        <div>
            {console.log(issues)}
            <h1>Issues</h1>
            <ul>
                {issues.map(issue => 
                <li key={issue}>{issue.summary}, {issue.description}</li>)}
            </ul>
        </div>
    )
}


export default IssueList