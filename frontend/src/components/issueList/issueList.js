import {useState, useEffect} from 'react'
import { getAllIssues } from '../../utils/api'



const IssueList = () => {

    const [userData, setUserData] = useState(
        { 
        userId: localStorage.getItem('userId'),
        userGroup: localStorage.getItem('userGroup')
        }
    )
    const [issues, setIssues] = useState([]);

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
            <table>
                <tr>
                    <th>Summary</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Posted By</th>
                    <th>Assigned To</th>
                    <th>Closed By</th>
                    <th>Action</th>
                </tr>
                {issues.map(issue => 
                <tr key={issue._id}>
                    <td>{issue.summary},</td> 
                    <td>{issue.description},</td>
                    <td>{issue.priority},</td>
                    <td>{issue.status},</td>
                    <td>{issue.postedBy}</td>
                    <td>{issue.assignedTo}</td>
                    <td>{issue.closedBy}</td>
                    <td>
                        <button>View</button>
                        {userData.userGroup >= 1 && 
                            <>
                                <button>Edit</button>
                                <button>Delete</button>
                            </>
                        }
                    </td>
                </tr>)}
            </table>
        </div>
    )
}


export default IssueList