const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`),
});

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bootstrapAdmin = require('./config/bootstrapAdmin');

const authRoutes = require('./routes/authRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const newsRoutes = require('./routes/newsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const fs = require('fs');

app.get('/api', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API Jumelles Amar',
    version: '1.0.0',
    env: process.env.NODE_ENV,
    endpoints: [
      '/api/auth',
      '/api/collections',
      '/api/news',
      '/api/contact',
      '/api/upload',
    ],
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

const clientDist = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    await bootstrapAdmin();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`[Server] API Jumelles Amar démarrée sur le port ${PORT} (${process.env.NODE_ENV})`);
    });
  } catch (error) {
    console.error(`[Server] Erreur au démarrage : ${error.message}`);
    process.exit(1);
  }
};

start();
