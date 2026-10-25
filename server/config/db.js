const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LIVE_MONGODB_URI || process.env.MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
    });
    console.log(`[DB] MongoDB connecté : ${conn.connection.host} (${process.env.NODE_ENV})`);
    return conn;
  } catch (error) {
    console.error(`[DB] Erreur de connexion : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
