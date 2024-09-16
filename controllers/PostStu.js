const mongoose = require("mongoose");
const Post = require('../models/PostStu');


exports.postPostStu = async (req, res) => {
    const { St_skill, St_ability, St_work_time } = req.body;

    try {
        // สร้าง object ใหม่ตาม PostStuSchema
        const post = new Post({
            St_skill,
            St_ability,
            St_work_time,
        });

        // บันทึกข้อมูลในฐานข้อมูล
        const savedPost = await post.save();
        res.status(200).json(savedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.editPostStu = async (req, res) => {
    try {
        const { id, St_skill, St_ability, St_work_time } = req.body;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        // อัปเดตฟิลด์ต่างๆ ตามข้อมูลที่ได้รับจาก req.body
        post.St_skill = St_skill;
        post.St_ability = St_ability;
        post.St_work_time = St_work_time;

        // บันทึกการแก้ไข
        const updatedPost = await post.save();
        res.json(updatedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePostStu = async (req, res) => {
    try {
        const { id } = req.body;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        // ลบโพสต์จากฐานข้อมูล
        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post deleted!' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostStu = async (req, res) => {
    try {
        // ดึงข้อมูลโพสต์ทั้งหมดจากฐานข้อมูล
        const posts = await Post.find();
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
