import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API = "https://first-full-stack-1-v0b6.onrender.com";

const Feed = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${API}/posts`)
            .then((res) => {
                setPosts(res.data.posts)
            })
            .catch(console.error)
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/delete-post/${id}`)
            setPosts(posts.filter((post) => post._id !== id))
        } catch (err) {
            console.log(err)
            alert("Could not delete post")
        }
    }

    return (
        <section className='feed-section'>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className='post-card'>
                        <img src={post.image} alt={post.caption} />
                        <h3>{post.caption}</h3>
                        <button onClick={() => handleDelete(post._id)}>
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <h1>No posts available</h1>
            )}
        </section>
    )
}

export default Feed