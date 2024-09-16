const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    Name        : {type: String, required: true},
    Email       : {type: String, required: true},
    Username    : {type: String, required: true},
    Phone       : {type: String, required: true},
    Password    : {type: String, required: true},
    Faculty     : {type: String, required: true},
    Program     : {type: String, required: true},
    Sex         : {type: String, required: true},
    Year_of_study : {type: Number, required: true}
}, { 
    timestamps: true, 
    versionKey: false 
});

// Virtual สำหรับ StudentId
StudentSchema.virtual('StudentId').get(function() {
    return this._id;
});

// ตั้งค่าให้ virtual fields ถูก serialize ในผลลัพธ์ (เช่น JSON)
StudentSchema.set('toJSON', { virtuals: true });
StudentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Student', StudentSchema);
