import {useState, useEffect} from 'react'
import { getAllIssues } from '../../utils/api'
import { Link, useNavigate } from "react-router-dom";
import { statusDescriptions, priorityLevels } from '../../utils/info'


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
console.log(issues)
    return (
        <div className="container">
            <table>
                <thead>
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
                </thead>
                {issues.map(issue => 
                <tbody key={issue._id}>
                    <tr>
                        <td>{issue.summary}</td> 
                        <td>{issue.description}</td>
                        <td>{priorityLevels[issue.priority]}</td>
                        <td>{statusDescriptions[issue.status]}</td>
                        <td>{issue.postedBy.firstName} {issue.postedBy.lastName}</td>
                        <td>{issue.assignedTo ? (issue.assignedTo.firstName + ' ' + issue.assignedTo.lastName): "N/A"}</td>
                        <td>{issue.closedBy ? (issue.closedBy.firstName + ' ' + issue.closedBy.lastName): "N/A"}</td>
                        <td>
                            <Link to={`/viewIssue/${issue._id}`}><button>View</button></Link>
                            {userData.userGroup >= 1 && 
                                <>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </>
                            }
                        </td>
                    </tr>
                </tbody>)}
            </table>
        </div>
    )
}


export default IssueList