const Post = require('../models/PostProf');
const mongoose = require("mongoose");
// postPostProf (POST)
exports.postPostProf = async (req, res) => {
    const {
        Job_title,
        Job_description,
        Job_location,
        Job_building,
        Job_room,
        Job_time_start,  
        Job_time_end,   
        Count,           
        Reserve_count,
        Traveling_type,
        Food_Sup,
        Salary,
    } = req.body;

    try {
        // สร้าง object ใหม่ตาม PostProfSchema
        const post = new Post({
            Job_title,
            Job_description,
            Job_location,
            Job_building,
            Job_room,
            Job_time_start,  
            Job_time_end,   
            Count,           
            Reserve_count,
            Traveling_type,
            Food_Sup,
            Salary,
        });

        // บันทึกข้อมูลในฐานข้อมูล
        const savedPost = await post.save();
        res.status(200).json(savedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UpdatePost (PUT)
exports.editPostProf = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            Job_title,
            Job_description,
            Job_location,
            Job_building,
            Job_room,
            Job_time_start,  
            Job_time_end,   
            Count,           
            Reserve_count,
            Traveling_type,
            Food_Sup,
            Salary,
        } = req.body;

        console.log('Received ID:', id); // ดีบัก: ตรวจสอบค่า ID ที่ได้รับ

        // ตรวจสอบว่าค่า id เป็น ObjectId ที่ถูกต้องหรือไม่
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Post ID' });
        }

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        // อัปเดตฟิลด์ต่างๆ ตามข้อมูลที่ได้รับจาก req.body
        post.Job_title = Job_title;
        post.Job_description = Job_description;
        post.Job_location = Job_location;
        post.Job_building = Job_building;
        post.Job_room = Job_room;
        post.Job_time_start = Job_time_start;
        post.Job_time_end = Job_time_end;
        post.Count = Count;
        post.Reserve_count = Reserve_count;
        post.Traveling_type = Traveling_type;
        post.Food_Sup = Food_Sup;
        post.Salary = Salary;

        // บันทึกการแก้ไข
        const updatedPost = await post.save();
        res.json(updatedPost);

    } catch (error) {
        console.error('Error:', error); // ดีบัก: ตรวจสอบข้อผิดพลาด
        res.status(500).json({ message: error.message });
    }
};

// ฟังก์ชันลบโพสต์
exports.deletePostProf = async (req, res) => {
    try {
        const id = req.params.id;

        // ตรวจสอบว่า ID เป็น ObjectId ที่ถูกต้องหรือไม่
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Post ID' });
        }

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        // ลบโพสต์จากฐานข้อมูล
        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post deleted!' });

    } catch (error) {
        console.error('Error deleting post:', error); // ดีบักข้อผิดพลาด
        res.status(500).json({ message: error.message });
    }
};

// GetAllPost (GET)
exports.getPostProf = async (req, res) => {
    try {
        // ดึงข้อมูลโพสต์ทั้งหมดจากฐานข้อมูล
        const posts = await Post.find();
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
