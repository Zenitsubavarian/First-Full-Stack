const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const dns = require('dns')
const postModel = require('./models/post.model')
dns.setServers(['1.1.1.1', '8.8.8.8'])
const app = express();
const cors = require('cors')
app.use(cors({
    origin: ["http://localhost:5173", "https://first-full-stack-psi.vercel.app"]
}));
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() })
app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file)
    const result = await uploadFile(req.file.buffer)
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })
    return res.status(201).json({
        message: "post has been created successfully",
        post
    })
})
app.get("/posts", async (req, res) => {
    const posts = await postModel.find()
    return res.status(200).json({
        message: "posts fetched successfully",
        posts
    })
})
app.delete("/delete-post/:id", async (req, res) => {
    await postModel.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        message: "post deleted successfully"
    })
})
module.exports = app;
