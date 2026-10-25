const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
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
    excerpt: {
      type: String,
      required: [true, "L'accroche est requise"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Le contenu est requis'],
    },
    coverImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Événement', 'Mode', 'Coulisses', 'Nouveauté', 'Presse'],
      default: 'Mode',
    },
    tags: [String],
    author: {
      type: String,
      default: 'Jumelles Amar',
    },
    published: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('News', newsSchema);
