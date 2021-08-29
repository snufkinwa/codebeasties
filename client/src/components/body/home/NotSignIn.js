import React from 'react'
import NOTLOGIN from '../../images/NOTLOGIN.gif'



export default function NotSignIn() {
    return (
        <div className="wrapper">
        <div className="notSignIn">
            <div>
            <img src={NOTLOGIN} alt = "Astronaut" />
            </div>
            <div>
            <h1>Get  back on top of the stack!</h1>
            </div>
        </div>
        </div>
    )
}
