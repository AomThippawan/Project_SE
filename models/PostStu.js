const mongoose = require('mongoose');

const PostStuSchema = new mongoose.Schema({
    St_skill: { type: String },
    St_ability: { type: String },
    St_work_time: { type: String },
}, { 
    timestamps: true, 
    versionKey: false 
});

PostStuSchema.virtual('PostStuId').get(function() {
    return this._id;
});

PostStuSchema.set('toJSON', { virtuals: true });
PostStuSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('PostStu', PostStuSchema);