import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import BugSvg from '../images/bug-solid.svg'
import AstroUser from '../images/user-astronaut-solid.svg'
import Logo from '../images/HeaderLogo.png'
import angleDown from '../images/angledown.png'


function Header() {
    const auth = useSelector(state => state.auth)
    
    const {user, isLogged} = auth


    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (error) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="dropNav">
            <Link to="#" className="avatar">
            <img src={user.avatar} alt="" style={{'border-radius': '50%'}}/> {user.name} <img src={angleDown} alt="Angle Down" />
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <header>
            <div className="logo">
                <h1><Link to ="/"><img src={Logo} alt={"Code Beasties"} /></Link> </h1>
            </div>

            <ul style={transForm}>
            <li><Link to="/create"><img src= {BugSvg} alt={"Create Bug"} /> Create Bug</Link></li> 
                {
                    isLogged
                    ?userLink()
                    :<li><Link to="/login"><img src= {AstroUser} alt={"Sign In"} /> Sign In</Link></li> 
                } 
            </ul>

        </header>
    )
}

export default Header
