import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {showErrorMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    password: '',
    confr_password: '',
    error: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {password, confr_password, error, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, error: '', success: ''})
    }


    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, error: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, confr_password))
            return setData({...data, error: "Password did not match.", success: ''})
        
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, error: "", success: res.data.msg})

        } catch (error) {
            error.response.data.msg && setData({...data, error: error.response.data.msg, success: ''})
        }
        
    }


    return (
        <div className="container">
        <div className="loginPage">
            <h2>Reset Your Password</h2>

            <div className="row">
                {error && showErrorMsg(error)}
                {success && showSuccessMsg(success)}

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password}
                onChange={handleChangeInput} />

                <label htmlFor="confr_password">Confirm Password</label>
                <input type="password" name="confr_password" id="confr_password" value={confr_password}
                onChange={handleChangeInput} />         
            </div>

            <div className="row">
                <button onClick={handleResetPass}>Reset Password</button>
            </div>
        </div>
        </div>
    )
}

export default ResetPassword
