import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate()
    const [fileName, setFileName] = useState("")

    const handleFileChange = (e) => {
        setFileName(e.target.files[0]?.name || "")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const API = "https://first-full-stack-1-v0b6.onrender.com";

        axios.post(`${API}/create-post`, formData)
            .then((res) => {
                e.target.reset()
                setFileName("")
                navigate("/feed")
            })
            .catch((err) => {
                console.log(err)
                alert("Something went wrong")
            })
    }

    return (
        <section className='create-post-section'>
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                />
                {fileName && <p className="file-name">Selected: {fileName}</p>}

                <input
                    type="text"
                    name="caption"
                    required
                    placeholder="Enter Caption"
                />

                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default CreatePost