const mongoose = require("mongoose");

const ProfessorSchema = new mongoose.Schema({
    ProfName        : {type: String, required: true},
    ProfEmail       : {type: String, required: true},
    Username        : {type: String, required: true},
    ProfPhone       : {type: String, required: true},
    Password        : {type: String, required: true},
    Prof_Faculty    : {type: String, required: true},
}, { 
    timestamps: true, 
    versionKey: false 
});

// Virtual สำหรับ ProfId
ProfessorSchema.virtual('ProfId').get(function() {
    return this._id;
});

// ตั้งค่าให้ virtual fields ถูก serialize ในผลลัพธ์ (เช่น JSON)
ProfessorSchema.set('toJSON', { virtuals: true });
ProfessorSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Professor', ProfessorSchema);
