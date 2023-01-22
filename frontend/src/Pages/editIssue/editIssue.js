import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { 
    updateIssue, 
    deleteIssue, 
    getSingleIssue, 
    getAllSupport, 
    createWorkItem, 
    updateWorkItem, 
    deleteWorkItem,
    addWorkItem, 
    removeWorkItem 
} from '../../utils/api';
import { statusDescriptions, priorityLevels } from '../../utils/info'

const EditIssue = (props) => {
    let {issueId} = useParams()
    const location = useLocation()
    const { state } = location;
    const navigate = useNavigate();
    const [newWorkItem, setNewWorkItem] = useState('')     
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
        
    const [supportUsers, setSupportUsers] = useState([])


    useEffect(() => {
        if (props.user.userGroup >= 1) {
            let  mounted = true;
            getSingleIssue(issueId).then((res) => {
                if(mounted) {
                    setIssueData(res)
                }
            })
            .then(
                getAllSupport().then((res) => {
                    if(mounted) {
                        setSupportUsers(res)
                    }
                })
            )
            return () => mounted = false;
        } else {
            let  mounted = true;
            getSingleIssue(issueId).then((res) => {
                if(mounted) {
                    setIssueData(res)
                }
            })
        }
    }, [])

    const handleChange = (event) => {
        setIssueData({...issueData, [event.target.name]: event.target.value })
    }

    const handleWorkItemChange = (event) => {
        setNewWorkItem(event.target.value)
    }
    
    const handleWorkItemDelete = async (workItemId) => {
        await removeWorkItem(workItemId, issueId).then(
            deleteWorkItem(workItemId).then((res) => {
                getSingleIssue(issueId).then((res) => {
                    setIssueData(res)
                })
            })
        )
    }

    const handleWorkItemCreate = async (event) => {
        event.preventDefault();
        const workItemData = {
            task: newWorkItem,
            supportStaff: props.user._id
        }
        await createWorkItem(workItemData).then((res) => {
            console.log(res)
            const data = {
                workItemId: res._id
            } 
            addWorkItem(data, issueId).then((res) => {
                getSingleIssue(issueId).then((res) => {
                    setIssueData(res)
                    setNewWorkItem('')
                })
            })
        })
    }
        
    const handleSubmit = async (event, issueData) => {
        event.preventDefault();
        await updateIssue(issueData, issueId).then((res) => {navigate(`/viewIssue/${issueId}`, {replace: true})})
        }

    const handleDelete = async (event) => {
        event.preventDefault();
        await deleteIssue(issueId);
        navigate("/", {replace: true})
    }

        return (
            <>
                <section className="container">
                    <h1>Edit Issue 📝</h1>
                    <form>
                        <label>Summary</label>
                        {(props.user._id != issueData.postedBy) && (props.user.userGroup < 1 ) ?
                        <p>{issueData.summary}</p>:
                        <input 
                            type="text"
                            name="summary"
                            onChange={handleChange}
                            value={issueData.summary}
                            placeholder="Summary"
                        />}
                        <label>Description</label>
                        {(props.user._id != issueData.postedBy) && (props.user.userGroup < 1 ) ?
                        <p>{issueData.description}</p>:
                        <input
                            type="text"
                            name="description"
                            onChange={handleChange}
                            value={issueData.description}
                            placeholder="Description"
                        />}
                        <div className="row">
                            
                            
                            
                        </div>
                        <div className="row">
                            <label className="column">Priority:</label>
                            {props.user.userGroup >= 1 ? 
                                <select className="column" name="priority" onChange={handleChange} value={issueData.priority}>
                                    <option value={0}>Low</option>
                                    <option value={1}>Intermediate</option>
                                    <option value={2}>High</option>
                                </select>
                            : <p className='column'>{priorityLevels[issueData.priority]}</p>}
                            <label className="column column-offset-25">Status:</label>
                            {props.user.userGroup >= 1 ? 
                                <select className="column" name="status" onChange={handleChange} value={issueData.status}>
                                    <option value={0}>Submitted</option>
                                    <option value={1}>Assigned</option>
                                    <option value={2}>In Progress</option>
                                    <option value={3}>In Review</option>
                                </select>
                            : <p className='column'>{statusDescriptions[issueData.status]}</p>}
                        </div>
                        <div className="row">
                            <label className="column">Posted By: </label>
                            <p className="column">{issueData.postedBy ? (issueData.postedBy.firstName + ' ' + issueData.postedBy.lastName): "N/A"}</p>
                            <label className="column">Assigned To: </label>
                                {props.user.userGroup >= 1 ? 
                                    <select 
                                        className="column" 
                                        name="assignedTo" 
                                        onChange={handleChange} 
                                    >
                                        <option value={null}>Unassigned</option>
                                        {supportUsers.length > 0 && supportUsers.map(supportUser =>
                                            <option 
                                                key={supportUser._id}
                                                value={supportUser._id}
                                            >
                                                {supportUser ? (supportUser.firstName + ' ' + supportUser.lastName): "N/A"}
                                            </option>
                                        )}
                                    </select>
                                : 
                                    <p className="column">
                                        {issueData.assignedTo ? (issueData.assignedTo.firstName + ' ' + issueData.lastName): "N/A"}
                                    </p>
                                }
                            
                            <label className="column">Closed By:</label>
                            <p className="column">{issueData.closedBy ? (issueData.closedBy.firstName + ' ' + issueData.closedBy.lastName): "N/A"}</p>
                        </div>
                        
                            <label className='column'>Work Performed</label>
                                {issueData.work.length > 0 && issueData.work.map((workItem, i) =>
                                    <div key={workItem._id}>
                                        <table>
                                            <caption>
                                                Work Item number {(i++)+1}
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
                                                    <tr>
                                                        
                                                    </tr>
                                                </tbody>
                                        </table>
                                        <div className='row'>
                                            <button
                                                onClick={() => {handleWorkItemDelete(workItem._id)}}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                        {(props.user.userGroup == 2 )&&
                        <>
                            <div className="row">
                                <label className='column'>New Work Item:</label>
                            </div>
                            <div className="row">  
                                <input 
                                    type="text"
                                    onChange={handleWorkItemChange}
                                    className='column'
                                    value={newWorkItem} 
                                    placeholder="Enter task information here"
                                />
                            </div>
                            <div className="row">
                                <button 
                                    className='column-10'
                                    onClick={handleWorkItemCreate}
                                >
                                    Add Work Item
                                </button>
                            </div>   
                        </>
                        }
                        <div className='row'>
                        {(props.user._id == issueData.postedBy) || (props.user.userGroup >= 1 )  && 
                            <button 
                                className="column"
                                onClick={(event) => handleSubmit(event, issueData)}
                                type="submit"    
                            >
                                Submit
                            </button>}
                            {(props.user._id == issueData.postedBy) || (props.user.userGroup >= 1 )  && 
                            <button
                                className="column column-offset-10" 
                                onClick={(event) => handleDelete(event, issueId)}   
                            >
                                Delete
                            </button>}
                            {(props.user._id == issueData.postedBy) || (props.user.userGroup >= 1 )  && 
                            <button
                                className="column column-offset-10"
                                name="closedBy"
                                value={props.user._id}
                                onClick={(event) => {
                                    issueData.status = 4;
                                    issueData.closedBy = props.user._id;
                                    handleSubmit(event, issueData)
                                }}
                            >
                                Close Issue
                            </button>}
                            
                            <button 
                                className="column column-offset-10"
                                onClick={() => navigate(`/viewIssue/${issueId}`)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            </>
        )
    
    }


export default EditIssue