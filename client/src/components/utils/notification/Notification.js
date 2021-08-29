import React from 'react'
import './notification.css'

export const showErrorMsg = (msg) => {
    return <div className="errorMsg">{msg}</div>
}

export const showSuccessMsg = (msg) => {
    return <div className="successMsg">{msg}</div>
}