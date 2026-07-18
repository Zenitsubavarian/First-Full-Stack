import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <section className='home-section'>
            <h1>Welcome</h1>
            <p>Share your moments or see what others are posting</p>
            <div className='home-buttons'>
                <Link to="/create-post" className='home-btn create-btn'>
                    Create Post
                </Link>
                <Link to="/feed" className='home-btn feed-btn'>
                    View Feed
                </Link>
            </div>
        </section>
    )
}

export default Home