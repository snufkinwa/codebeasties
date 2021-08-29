import React from 'react'
import FloatAstro from '../../images/ERROR404.png'

function Float() {
    return (
        <div className="wrapper">
        <div className="error404">
        <div className="floating">
        <img src={FloatAstro} alt ="Astro" />
        </div>
        <div className="TEST">
            <h1>OH NO! 404 NOT FOUND</h1>
        </div>
        </div>
        </div>
    )
}

export default Float