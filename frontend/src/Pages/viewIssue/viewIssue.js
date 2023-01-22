import { useState, useEffect } from 'react'
import { getSingleIssue, deleteIssue } from '../../utils/api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { statusDescriptions, priorityLevels } from '../../utils/info'


const ViewIssue = () => {
    const navigate = useNavigate();
    let {issueId} = useParams()
    const [issueData, setIssueData] = useState({
        summary: '',
        description: '',
        work: [],
        priority: 0,
        status: 0,
        postedBy: null,
        assignedTo: null,
        closedBy: null
    });
    
    const [userData, setUserData] = useState(
        { 
        userId: localStorage.getItem('userId'),
        userGroup: localStorage.getItem('userGroup')
        }
    )
    useEffect(() => {
        let  mounted = true;
        getSingleIssue(issueId).then((res) => {
            if(mounted) {
                setIssueData(res)
            }
        })
        return () => mounted = false;
    }, [])

    const handleDelete = async (event) => {
        event.preventDefault();
        await deleteIssue(issueId);
        navigate("/", {replace: true})
    }

    return (
        <>
            <div className="container">
            <h4>Issue Detail</h4>
            
            <table>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>Status</th>
                        <td>{statusDescriptions[issueData.status]}</td>
                    </tr>
                    <tr>
                        <th>Priority</th>
                        <td>{priorityLevels[issueData.priority]}</td>
                    </tr>
                    <tr>
                        <th>Summary</th>
                        <td>{issueData.summary}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{issueData.description}</td>
                    </tr>
                    <tr>
                        <th>Posted by</th>
                        <td>{issueData.postedBy ? (issueData.postedBy.firstName + ' ' + issueData.postedBy.lastName): "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Assigned to</th>
                        <td>{issueData.assignedTo ? (issueData.assignedTo.firstName + ' ' + issueData.assignedTo.lastName): "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Closed by</th>
                        <td>{issueData.closedBy ? (issueData.closedBy.firstName + ' ' + issueData.closedBy.lastName): "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Posted</th>
                        <td>{issueData.createdAt}</td>
                    </tr>
                    <tr>
                        <th>Updated</th>
                        <td>{issueData.updatedAt}</td>
                    </tr>
                </tbody>
            </table>
            <div className="row"> 
                {issueData.status != 4 && userData.userGroup >= 1 &&
                <Link 
                    className="column column-25 column-offset-10" 
                    to={`/editIssue/${issueId}`}
                    state={{
                        description: issueData.description,
                        summary: issueData.summary,
                        work: issueData.work,
                        priority: issueData.priority,
                        status: issueData.status,
                        postedBy: issueData.postedBy,
                        assignedTo: issueData.assignedTo,
                        closedBy: issueData.closedBy,
                    }}
                >
                    <button className="button button-small">
                        Edit
                    </button>
                </Link>}
                {userData.userGroup >= 1 &&
                <div className="column column-25 column-offset-10">
                    <button 
                        className=" button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
                }
            </div>
            
            <h4>Support Details</h4>
            {issueData.work.length > 0 && issueData.work.map((workItem, i) =>
                <table key={workItem._id}>
                    <caption>
                        Work Item {(i++)+1}
                    </caption>
                    <thead>
                    </thead>
                    
                        <tbody>
                            <tr className='row'>
                                <th className='column'>Task:</th>
                                <td className="column">{workItem.task}</td>
                            </tr>
                            <tr className='row'>
                                <th className='column'>Support Staff:</th>
                                <td className="column">{workItem.supportStaff.firstName} {workItem.supportStaff.lastName}</td>
                            </tr>
                            <tr className='row'>
                                <th className='column'>Performed on:</th>
                                <td className="column">{workItem.createdAt}</td>
                            </tr>
                        </tbody>
                    
                </table>
            )}
        </div></>
    )
}


export default ViewIssue