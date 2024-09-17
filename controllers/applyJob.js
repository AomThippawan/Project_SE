const Apply = require("../models/applyJob");
const PostProf = require("../models/PostProf");
exports.applyJob = async (req, res) => {
    const { StudentName, StudentEmail, PostId } = req.body;

    try {
        const post = await PostProf.findById(PostId);
        if (!post) {
            return res.status(400).json({ message: 'Post not found' });
        }

        if (post.applyJob >= post.Count) {
            return res.status(400).json({ message: 'No available slots' });
        }

        const apply = new Apply({
            StudentName,
            StudentEmail,
            PostId
        });
        await apply.save();
        
        // เพิ่มจำนวนผู้สมัครในโพสต์
        await PostProf.findByIdAndUpdate(PostId, { $inc: { applyJob: 1 } });
        const updatedPost = await PostProf.findById(PostId); // ดึงโพสต์ที่อัปเดตแล้ว
        res.status(200).json(updatedPost); // ส่งข้อมูลโพสต์ที่อัปเดตกลับไป

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// exports.applyJob = async (req, res) => {
//     const { StudentName, StudentEmail, PostId } = req.body; // ใช้ชื่อฟิลด์ที่ถูกปรับปรุง

//     try {
//         // ตรวจสอบว่าโพสต์ที่เลือกมีอยู่จริง
//         const post = await PostProf.findById(PostId);
//         if (!post) {
//             return res.status(400).json({ message: 'Post not found' });
//         }

//         // ตรวจสอบข้อมูลของนิสิต (ถ้าจำเป็น)
//         // const student = await Student.findOne({ StudentName, StudentEmail });
//         // if (!student) {
//         //     return res.status(400).json({ message: 'Invalid student credentials' });
//         // }

//          // ตรวจสอบจำนวนผู้สมัคร
//          if (post.applyJob >= post.Count) {
//             return res.status(400).json({ message: 'No available slots' });
//         }
//         // สร้างเอกสารการสมัครใหม่
//         const apply = new Apply({
//             StudentName,
//             StudentEmail,
//             PostId
//         });
//         await apply.save();

//         // post.Count += 1; // เพิ่มจำนวนผู้สมัคร
//         // await post.save();

//         await PostProf.findByIdAndUpdate(PostId, { $inc: { applyJob: 1 } });
//         res.status(200).json({ message: 'Applied successfully' });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
