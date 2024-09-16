const mongoose = require("mongoose");

const PostStuSchema = new mongoose.Schema({
    St_skill: { type: String },
    St_ability: { type: String },
    St_work_time: { type: String },
    // StuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
}, { 
    timestamps: true, 
    versionKey: false 
});

// Virtual สำหรับ PostStuId
PostStuSchema.virtual('PostStuId').get(function() {
    return this._id;
});

// ตั้งค่าให้ virtual fields ถูก serialize ในผลลัพธ์ (เช่น JSON)
PostStuSchema.set('toJSON', { virtuals: true });
PostStuSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("PostStu", PostStuSchema);
