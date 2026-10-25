const User = require('../models/User');

const bootstrapAdmin = async () => {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      const email = process.env.ADMIN_EMAIL || 'admin@jumellesamar.com';
      const password = process.env.ADMIN_PASSWORD || 'adminJumelles2024!';
      const name = process.env.ADMIN_NAME || 'Admin Jumelles Amar';

      await User.create({ name, email, password, role: 'admin' });
      console.log(`[Admin] Compte administrateur créé : ${email}`);
    } else {
      console.log('[Admin] Compte administrateur déjà présent');
    }
  } catch (error) {
    console.error(`[Admin] Erreur : ${error.message}`);
  }
};

module.exports = bootstrapAdmin;
