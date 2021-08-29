import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'
import deleteBugPNG from '../../images/deletebug.png'
import editBugPNG from '../../images/editBUG.png'

import {fetchBug, dispatchGetAllBugs} from '../../../redux/actions/bugActions'

function BugHome() {

    const bugs = useSelector(state => state.bug)
    const dispatch = useDispatch()

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }


  useEffect (() => { 
        fetchBug().then (res => {
            dispatch(dispatchGetAllBugs(res))
        })
    }, [dispatch])

    const deleteBug = (id) =>{
         axios.delete(`/api/bug/${id}`)
         window.location.href = "/";
    }


    return (
        <div className="bug-wrapper">
        {
            bugs.map(bug =>(
                <div className="card" key={bug._id}>
                    <h4 projectname={bug.projectname}>{bug.projectname}</h4>
                    <div className="text-wrapper">
                        <p>{bug.description}</p>
                    </div>
                    <p className="date">Opened {format(bug.date)}</p>
                    <p className="deadline">Deadline {(new Date(bug.deadline)).toLocaleDateString('en-US', DATE_OPTIONS)}</p>
                    <p className="priority">Priority:  {bug.priority}</p>
                    <div className="card-footer">
                        <Link to={`edit/${bug._id}`} ><img src={editBugPNG} alt="Edit" title="Edit" /></Link>
                        <p className="status">Status: {bug.status}</p>
                    </div>
                    <button className="close" 
                    onClick={() => deleteBug(bug._id)} ><img src={deleteBugPNG} alt="Delete" title="Delete" /></button>
                </div>
            ))
        }
        
    </div>
    )
}

export default BugHome
