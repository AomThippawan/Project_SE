const Apply = require("../models/applyJob");
const PostProf = require("../models/PostProf");

exports.applyJob = async (req, res) => {
    const { StudentName, StudentEmail, PostId } = req.body; // ใช้ชื่อฟิลด์ที่ถูกปรับปรุง

    try {
        // ตรวจสอบว่าโพสต์ที่เลือกมีอยู่จริง
        const post = await PostProf.findById(PostId);
        if (!post) {
            return res.status(400).json({ message: 'Post not found' });
        }

        // ตรวจสอบข้อมูลของนิสิต (ถ้าจำเป็น)
        // const student = await Student.findOne({ StudentName, StudentEmail });
        // if (!student) {
        //     return res.status(400).json({ message: 'Invalid student credentials' });
        // }

        // สร้างเอกสารการสมัครใหม่
        const apply = new Apply({
            StudentName,
            StudentEmail,
            PostId
        });
        await apply.save();
        await PostProf.findByIdAndUpdate(PostId, { $inc: { Count: 1 } });
        res.status(200).json({ message: 'Applied successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
