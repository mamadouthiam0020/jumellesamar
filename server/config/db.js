const mongoose = require('mongoose');

const resolveMongoURI = () =>
  process.env.MONGODB_URI ||
  process.env.LIVE_MONGODB_URI ||
  process.env.MONGO_URI;

const connectDB = async () => {
  const uri = resolveMongoURI();

  if (!uri) {
    console.error(
      '[DB] MONGODB_URI introuvable. Ajoutez la variable dans Render > Environment ' +
        '(ou renseignez-la dans .env.prod en local).'
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
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
