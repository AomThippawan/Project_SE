const express = require("express");
const router = express.Router();
const PostStu = require('../models/PostStu');
const {postPostStu,editPostStu,deletePostStu,getPostStu} = require ("../controllers/PostStu");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.post("/post",postPostStu);
router.put("/update/:id",editPostStu);
router.delete("/delete/:id",deletePostStu);
router.get("/",getPostStu);

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostStu.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error); // เพิ่มการบันทึกข้อผิดพลาด
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;