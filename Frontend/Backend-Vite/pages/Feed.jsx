import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/posts")
            .then((res) => {
                console.log(res.data.posts[0]);
                setPosts(res.data.posts)
            })
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/delete-post/${id}`)
            setPosts(posts.filter((post) => post._id !== id))
        } catch (err) {
            console.log(err)
            alert("Could not delete post")
        }
    }

    return (
        <section className='feed-section'>
            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className='post-card'>
                            <img src={post.image} alt={post.caption} />
                            <h3>{post.caption}</h3>
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <h1>No posts available</h1>
                )
            }
        </section>
    )
}

export default Feed