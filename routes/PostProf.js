const express = require("express");
const router = express.Router();
const PostStu = require('../models/PostProf');
const {postPostProf,editPostProf,deletePostProf,getPostProf} = require ("../controllers/PostProf");
const PostProf = require("../models/PostProf");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.post("/post",postPostProf);
router.put("/update/:id",editPostProf);
router.delete("/delete/:id",deletePostProf);
router.get("/",getPostProf);

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostProf.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error); // เพิ่มการบันทึกข้อผิดพลาด
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;