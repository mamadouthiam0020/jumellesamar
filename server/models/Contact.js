const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['information', 'rendez-vous', 'sur-mesure', 'autre'],
      default: 'information',
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Le message est requis'],
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    preferredDate: Date,
    preferredTime: String,
    readAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
