const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  locid: {
    type: Number
  },
  position: {
    lat: {
    type: Number,
    required: true,
    unique: true,
    },
    lng: {
    type: Number,
    required: true,
    unique: true,
    },
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  country: {
    type: String,
    required: true,
    unique: false,
  },
  city: {
    type: String,
    required: true,
    unique: false,
  },
  time: {
    type: String,
    required: true,
  },
  photos: {
    type: [Object]
  },
  summary: {
    type: String,
    required: true,
    unique: false,
  },
  comments: {
    type:[Object]
  },
},
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;