import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../utils/validation/Validation'
import {showErrorMsg, showSuccessMsg} from '../../utils/notification/Notification'

const initialState = {
    email: '',
    error: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const {email, error, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, error: '', success: ''})
    }

    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, error: 'Invalid emails.', success: ''})
            
        try {
            const res = await axios.post('/user/forgot', {email})

            return setData({...data, error: '', success: res.data.msg})
        } catch (error) {
            error.response.data.msg && setData({...data, error:  error.response.data.msg, success: ''})
        }
    }
    
    return (
        <div className="container">
        <div className="loginPage">
            <h2>Forgot Your Password?</h2>

            <div className="row">
                {error && showErrorMsg(error)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Enter your email address</label>
                <input type="email" name="email" id="email" value={email}
                onChange={handleChangeInput} />
            </div>

            <div className="row">
                <button onClick={forgotPassword}>Verify your email</button>
            </div>
        </div>
        </div>
    )
}

export default ForgotPassword