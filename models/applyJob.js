const mongoose = require("mongoose");

const ApplySchema = new mongoose.Schema({
    StudentName: { type: String, required: true }, // เปลี่ยนชื่อฟิลด์เป็น StudentName
    StudentEmail: { type: String, required: true }, // เปลี่ยนชื่อฟิลด์เป็น StudentEmail
    PostId: { type: mongoose.Schema.Types.ObjectId, ref: 'PostProf', required: true }, // เชื่อมโยงกับ PostProf
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Apply', ApplySchema);
