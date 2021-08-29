import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrorMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    name: '',
    email: '',
    password: '',
    confr_password: '',
    error: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password, confr_password, error, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, error: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, error: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, error: "Invalid email.", success: ''})

        if(isLength(password))
            return setUser({...user, error: "Password must be at least 8 characters.", success: ''})
        
        if(!isMatch(password, confr_password))
            return setUser({...user, error: "Password does not not match.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, error: '', success: res.data.msg})
        } catch (error) {
            error.response.data.msg && 
            setUser({...user, error: error.response.data.msg, success: ''})
        }
    }

    return (
        <div className="container">
        <div className="loginPage">
            <h2>Register</h2>
            {error && showErrorMsg(error)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter your name" id="name"
                    value={name} name="name" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="confr_password">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" id="confr_password"
                    value={confr_password} name="confr_password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already have an account?  <Link to="/login">Login</Link></p>
        </div>
        </div>
    )
}

export default Register