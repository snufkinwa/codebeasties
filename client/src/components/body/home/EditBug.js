
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function EditBug({match}) {
    const [bug, setBug] = useState({
        projectname: '',
        description: '',
        date: '',
        status: '',
        id: ''
    })
    const history = useHistory()

    useEffect(() =>{
        const getBug = async () =>{
            if(match.params.id){
                const res = await axios.get(`/api/bug/${match.params.id}`)
                setBug({
                    projectname: res.data.projectname,
                    description: res.data.description,
                    date: new Date(res.data.date).toLocaleDateString(),
                    status: res.data.status,
                    id: res.data._id
                })
            }
        }
        getBug()
    },[match.params.id])

    const onChangeInput = e => {
        const {name, value} = e.target;
        setBug({...bug, [name]:value})
    }


    const editBug = async e => {
        e.preventDefault()
                const {projectname, description, date, status, id} = bug;
                const newBug = {
                    projectname, description, date, status
                }

                await axios.put(`/api/bug/${id}`, newBug)
                return history.push('/')
}

    return (
        <div className="create-bug">
            <h2>Edit bug</h2>
            <form onSubmit={editBug} autoComplete="off">
                <div className="row">
                    <label htmlFor="projectname">projectname</label>
                    <input type="text" value={bug.projectname} id="projectname"
                    name="projectname" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">description</label>
                    <textarea type="text" value={bug.description} id="description"
                    name="description" required rows="10" onChange={onChangeInput} />
                </div>

                <label htmlFor="date">Date: {bug.date} </label>
                <div className="row">
                    <input type="date" id="date"
                    name="date" onChange={onChangeInput} />
                </div>

                <label htmlFor="status">Status:{bug.status} </label>
                <div className="">
                <select
                        type ="text"
                        value={bug.status}
                        id ="status"
                        name="status"
                        onChange={onChangeInput}
                    >
                        <option value="Open">Open</option>
                        <option value="Close">Close</option>
                    </select>
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}