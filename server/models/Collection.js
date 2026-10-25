const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    longDescription: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Robes', 'Tenues Hommes', 'Accessoires', 'Sur-Mesure', 'Mariage'],
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    coverImage: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    designerNote: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Collection', collectionSchema);
