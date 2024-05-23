const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
