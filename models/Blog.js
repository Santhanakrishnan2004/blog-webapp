// // const mongoose = require('mongoose');
// // const Schema = mongoose.Schema;

// // const BlogSchema = new Schema({
// //     title: {
// //         type: String,
// //         required: true
// //     },
// //     content: {
// //         type: String,
// //         required: true
// //     },
// //     author: {
// //         type: Schema.Types.ObjectId,
// //         ref: 'User',
// //         required: true
// //     },
// //     reviews: [{
// //         type: Schema.Types.ObjectId,
// //         ref: 'Review'
// //     }]
// // });

// // module.exports = mongoose.model('Blog', BlogSchema);
// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//     rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5
//     },
//     comment: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const blogSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     reviews: [reviewSchema],  // Add reviews as a sub-document array
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Blog', blogSchema);
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// const blogSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     reviews: [reviewSchema],
//     views: {
//         type: Number,
//         default: 0
//     },
//     likes: {
//         type: Number,
//         default: 0
//     }
// });


const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    genres: {
        type: [String],
        default: []
    },
    reviews: [
        {
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
}, { timestamps: true });



module.exports = mongoose.model('Blog', blogSchema);
