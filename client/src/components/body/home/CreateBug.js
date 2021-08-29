import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function CreateBug() {
    const initBug = {
        projectname: '',
        description: '',
        date: '',
        deadline: '',
        priority: '',
        status: ''

    }
  
    const [bug, setBug] = useState(initBug)
    const history = useHistory()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setBug({...bug, [name]:value})
    }


    const createBug = async e => {
        e.preventDefault()
        const {projectname, description, date, deadline, priority, status } = bug;
        const newBug = {
            projectname, description, date, deadline, priority, status
        }
        try {
            await axios.post('/api/bug', newBug)
            return history.push('/')
          
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="create-bug">
            <h2>Create bug</h2>
            <form onSubmit={createBug}  autoComplete="off">
                <div className="row">
                    <label htmlFor="projectname">Project Name</label>
                    <input type="text" value={bug.projectname} id="projectname"
                    name="projectname" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">description</label>
                    <textarea type="text" value={bug.description} id="description"
                    name="description" required rows="10" onChange={onChangeInput} />
                </div>

                <label htmlFor="date">Date:</label>
                <div className="row">
                    <input type="date" id="date" value={bug.date} 
                    name="date" onChange={onChangeInput} />
                </div>

                <label htmlFor="deadline">Deadline: </label>
                <div className="row">
                    <input type="date" id="deadline" value={bug.deadline}
                    name="deadline" onChange={onChangeInput} />
                </div>

                <label htmlFor="priority">Priority </label>
                <div className="">
                    <select
                        type ="text"
                        value={bug.priority}
                        id ="priority"
                        name="priority"
                        onChange={onChangeInput}
                    >   
                        <option>---</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>

                <label htmlFor="status">Status:</label>
                <div className="">
                <select
                        type ="text"
                        value={bug.status}
                        id ="status"
                        name="status"
                        onChange={onChangeInput}
                    >
                         <option>---</option>
                        <option value="Open">Open</option>
                        <option value="Close">Close</option>
                    </select>
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}