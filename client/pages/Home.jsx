import React from 'react'
import Fog from '../src/assets/fog.mp4'

const Home = () => {
    return (
        <div className="home-background">
            <video className="background-video" src={Fog} width="120%" height="120%" autoPlay loop muted>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Home
