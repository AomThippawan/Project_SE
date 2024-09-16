const Post = require('../models/PostProf');

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
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        // อัปเดตฟิลด์ต่างๆ ตามข้อมูลที่ได้รับจาก req.body
        Object.assign(post, req.body);

        // บันทึกการแก้ไข
        const updatedPost = await post.save();
        res.json(updatedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DeletePost (DELETE)
exports.deletePostProf = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        // ลบโพสต์จากฐานข้อมูล
        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post deleted!' });

    } catch (error) {
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
