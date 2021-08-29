import React from 'react'
import { useSelector} from 'react-redux'
import NotSignIn from './NotSignIn'
import BugHome from './BugHome'

function Home() {
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth




    return (
        <div>
        { 
            isLogged 
            ? <BugHome />
            : <NotSignIn />
        }
        </div>
    )
}

export default Home
