import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrorMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersActions'

import notAdminPNG from '../../images/deleteuserx.png'
import isAdminSVG from '../../images/check-solid.svg'
import editUserSVG from '../../images/user-edit-solid.svg'
import trashSVG from '../../images/115789_trash_icon.svg'
import cameraSVG from '../../images/camera-solid.svg'

const initialState = {
    name: '',
    password: '',
    confr_password: '',
    error: '',
    success: ''
}

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, confr_password, error, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, error:'', success: ''})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, error: "No files were uploaded." , success: ''})

            if(file.size > 10 * 1024 * 1024)
                return setData({...data, error: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, error: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (error) {
            setData({...data, error: error.response.data.msg , success: ''})
        }
    }

    const updateinfo = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, error: '' , success: "Updated Success!"})
        } catch (error) {
            setData({...data, error: error.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, error: "Password must be at least 8 characters.", success: ''})

        if(!isMatch(password, confr_password))
            return setData({...data, error: "Password does not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, error: '' , success: "Updated Success!"})
        } catch (error) {
            setData({...data, error: error.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar) updateinfo()
        if(password) updatePassword()
    }

    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Are you sure you want to delete this account?")){
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (error) {
            setData({...data, error: error.response.data.msg , success: ''})
        }
    }

    return (
        <>
        <div>
            {error && showErrorMsg(error)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
        </div>
        <div className="profilePage">
            <div className="col-left">
                <h2>{isAdmin ? "Admin": "Profile"}</h2>

                <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt=""/>
                    <span>
                        <img src={cameraSVG} title="Upload new avatar" alt="camera" />
                        <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.name}
                    placeholder="Your name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password" value={password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="confr_password">Confirm New Password</label>
                    <input type="password" name="confr_password" id="confr_password"
                    placeholder="Confirm password" value={confr_password} onChange={handleChange} />
                </div>

                <div>
                    <em style={{color: "crimson"}}> 
                    * By updating your password, you will not be able 
                        to login quickly using Google.
                    </em>
                </div>

                <button disabled={loading} onClick={handleUpdate}>Update</button>
            </div>

            <div className="col-right">
                <h2>{isAdmin ? "Users" : "Projects"}</h2>

                <div style={{overflowX: "auto"}}>
                    <table className="bugUsers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 1
                                                ? <img src={isAdminSVG} title="Admin" alt="Admin" />
                                                : <img src={notAdminPNG} title="User" alt="User" />
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${user._id}`}>
                                                <img src={editUserSVG} title="Edit" alt="Edit" />
                                            </Link>
                                            <img src= {trashSVG}  title="Remove" alt="Delete User"
                                            onClick={() => handleDelete(user._id)} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile