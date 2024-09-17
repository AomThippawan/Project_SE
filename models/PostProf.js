const mongoose = require("mongoose");

const PostProfSchema = new mongoose.Schema({
    Job_title: { type: String, required: true },
    Job_description: { type: String, required: true },
    Job_location: { type: String, required: true },
    Job_building: { type: String },
    Job_room: { type: String },
    Job_time_start: { type: String, required: true },  
    Job_time_end: { type: String, required: true },   
    Count: { type: Number, required: true },           
    Reserve_count: { type: String },
    Traveling_type: { type: String },
    Food_Sup: { type: String },
    Salary: { type: String }
}, { 
    timestamps: true, 
    versionKey: false 
});

// Virtual สำหรับ PostProfId
PostProfSchema.virtual('PostProfId').get(function() {
    return this._id;
});

// ตั้งค่าให้ virtual fields ถูก serialize ในผลลัพธ์ (เช่น JSON)
PostProfSchema.set('toJSON', { virtuals: true });
PostProfSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("PostProf", PostProfSchema);