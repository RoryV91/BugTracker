import { useState, useEffect } from 'react'
import { getSingleIssue } from '../../utils/api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { statusDescriptions, priorityLevels } from '../../utils/info'
import Nav from '../../components/Nav/nav'


const ViewIssue = () => {

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

useEffect(() => {
    let  mounted = true;
    getSingleIssue(issueId).then((res) => {
        if(mounted) {
            setIssueData(res)
        }
    })
    return () => mounted = false;
}, [])

    return (
        <>
        {console.log(issueData)}
            <header>
                <Nav />
            </header>
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
                    <td>{issueData.assignedTo ? (issueData.postedBy.firstName + ' ' + issueData.postedBy.lastName): "N/A"}</td>
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
            <h4>Support Details</h4>
            
            <table>
                <caption>Work Item number</caption>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>Support Staff</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Implemented on</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Updated on</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Task Performed</th>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div></>
    )
}


export default ViewIssue