import React, {useState} from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {showErrorMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import {GoogleLogin} from 'react-google-login'


const initialState ={
    email:'',
    password: '',
    error: '',
    success: ''
}

function Login() {
    const [user, setUser]=useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    
    const{email, password, error, success} = user 


    const handleChangeInput = e => {
        const{name, value} = e.target
        setUser({...user, [name]:value, error:'', success:''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, error: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            window.location.href = "/profile";

        } catch (error) {
            if (error.response) {
                setUser({...user, error: error.response.data.msg, success: ''});
              }
        }
    }


    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})
    
            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)
    
            dispatch(dispatchLogin())
            return history.push('/')
            } catch (error) {
                setUser({...user, error: error.response.data.msg, success: ''})
            }
        }

    return (
        <div className="container">
        <div className="loginPage">
            <h2>Login</h2>
            {error && showErrorMsg(error)}
            {success && showSuccessMsg(success)}
       
            <form onSubmit={handleSubmit}>
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

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forgot your password?</Link>
                </div>
            </form>

            
        <div>Or Login With</div>
        <div >
     
        <GoogleLogin
            clientId="SECRET_ID"
            buttonText="Login With Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
        </div>

            <p>New User?  <Link to="/register">Register</Link></p>
        </div>
        </div>
    )
}

export default Login
