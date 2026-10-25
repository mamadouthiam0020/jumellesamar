const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`),
});

const connectDB = require('../config/db');
const User = require('../models/User');
const Collection = require('../models/Collection');
const News = require('../models/News');
const Contact = require('../models/Contact');
const { generateSlug } = require('../utils/helpers');

const placeholders = {
  hero: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Boubou_homme.jpg/1920px-Boubou_homme.jpg',
  dress: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Boubou_en_ndop.jpg/1920px-Boubou_en_ndop.jpg',
  suit: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Boubou_traditionnel_du_S%C3%A9n%C3%A9gal.jpg/1280px-Boubou_traditionnel_du_S%C3%A9n%C3%A9gal.jpg',
  accessory: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Boubou_Ivoirien.jpg/1920px-Boubou_Ivoirien.jpg',
  news: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Boubou_-_MCN_4232.jpg/1920px-Boubou_-_MCN_4232.jpg',
  atelier: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Boubou_en_basin_avec_broderie.png/1280px-Boubou_en_basin_avec_broderie.png',
};

const seed = async () => {
  try {
    await connectDB();

    console.log('[Seed] Nettoyage des données existantes...');
    await Promise.all([
      User.deleteMany({}),
      Collection.deleteMany({}),
      News.deleteMany({}),
      Contact.deleteMany({}),
    ]);

    console.log('[Seed] Création des utilisateurs...');
    await User.create([
      {
        name: 'Admin Jumelles Amar',
        email: process.env.ADMIN_EMAIL || 'admin@jumellesamar.com',
        password: process.env.ADMIN_PASSWORD || 'adminJumelles2024!',
        role: 'admin',
        phone: '+229 97 00 00 00',
      },
      {
        name: 'Client Test',
        email: 'client@test.com',
        password: 'client123',
        role: 'client',
        phone: '+229 91 00 00 00',
        address: 'Cotonou, Bénin',
      },
    ]);

    console.log('[Seed] Création des collections...');
    const collections = [
      {
        title: 'Éclat de Soie',
        description: 'Des robes de soirée en soie pure, drapées à la main pour sublimer chaque silhouette.',
        longDescription:
          "La collection Éclat de Soie rend hommage au tissu le plus noble qui soit. Chaque pièce est coupée dans une soie sauvage soigneusement sélectionnée puis drapée à la main dans notre atelier. Les coupes fluides épousent le corps avec une légèreté incomparable.\n\nChaque robe représente plus de 40 heures de travail artisanal.",
        category: 'Robes',
        coverImage: placeholders.hero,
        images: [placeholders.hero, placeholders.dress],
        featured: true,
        year: 2026,
        designerNote: 'Conçue pour la femme qui veut briller sans en faire trop.',
      },
      {
        title: 'Mariage Royal',
        description: 'Robes de mariée sur-mesure, brodées de perles et de dentelle française.',
        longDescription:
          'Chaque robe de mariée est une pièce unique, façonnée selon les rêves et l\'histoire de chaque mariée. De la première esquisse à la dernière couture, notre équipe accompagne la future mariée tout au long d\'un parcours d\'exception.',
        category: 'Mariage',
        coverImage: placeholders.dress,
        images: [placeholders.dress, placeholders.hero],
        featured: true,
        year: 2026,
        designerNote: 'Une robe de princesse moderne, légère et dansante.',
      },
      {
        title: 'Saint-Honoré',
        description: 'Costumes sur-mesure pour homme, taillés dans les plus beaux tissus italiens.',
        longDescription:
          'Le sur-mesure masculin selon Jumelles Amar : une silhouette nette, des épaules travaillées, une finition irréprochable. Chaque costume est construit autour de votre morphologie unique.',
        category: 'Tenues Hommes',
        coverImage: placeholders.suit,
        images: [placeholders.suit],
        featured: false,
        year: 2025,
        designerNote: "Le costume n'habille pas l'homme, il le révèle.",
      },
      {
        title: 'Nuit d\'Ivoire',
        description: 'Tenues de cocktail et smokings pour des soirées mémorables.',
        longDescription:
          'La collection Nuit d\'Ivoire célèbre l\'élégance des grandes occasions. Des matières nobles, des coupes cinématiques, des détails qui font la différence.',
        category: 'Tenues Hommes',
        coverImage: placeholders.suit,
        images: [placeholders.suit, placeholders.accessory],
        featured: false,
        year: 2025,
        designerNote: 'La sophistication dans le détail.',
      },
    ];

    for (const c of collections) {
      await Collection.create({ ...c, slug: generateSlug(c.title) });
    }

    console.log('[Seed] Création des news...');
    const news = [
      {
        title: 'Jumelles Amar dévoile sa collection Éclat de Soie 2026',
        excerpt: 'Une collection qui marie la soie la plus pure à un savoir-faire artisanal exceptionnel.',
        content:
          "C'est avec une fierté immense que Jumelles Amar présente sa nouvelle collection « Éclat de Soie ». Cette collection marque un tournant dans l'histoire de la maison, avec des pièces d'une audace et d'un raffinement sans précédent.\n\nLes dix robes présentées représentent plus de 400 heures de travail collectif de nos artisans. La soie sauvage, importée de nos partenaires asiatiques, est travaillée localement dans notre atelier de Cotonou.\n\nVenez découvrir cette collection lors de notre défilé privé qui se tiendra le mois prochain.",
        coverImage: placeholders.news,
        category: 'Nouveauté',
        tags: ['collection', '2026', 'soie'],
        featured: true,
        author: 'Jumelles Amar',
      },
      {
        title: "Dans les coulisses de l'atelier",
        excerpt: "Découvrez comment nos artisans donnent vie à chaque création, aiguille après aiguille.",
        content:
          "Notre atelier est le cœur battant de Jumelles Amar. C'est là que tout se joue, entre les mains expertes de nos artisans. Chaque pièce demande entre 20 et 80 heures de travail minutieux.\n\nDe la coupe à l'assemblage, en passant par la broderie et les finitions, chaque étape est réalisée avec une exigence absolue. Nous croyons en une mode lente, responsable et profondément humaine.",
        coverImage: placeholders.atelier,
        category: 'Coulisses',
        tags: ['atelier', 'artisanat', 'savoir-faire'],
        featured: false,
        author: 'L\'équipe Jumelles Amar',
      },
      {
        title: 'Jumelles Amar au salon international de la mode',
        excerpt: 'La maison représentera le Bénin au prestigieux salon international de la mode.',
        content:
          "C'est un immense honneur d'annoncer que Jumelles Amar représentera le Bénin lors de la prochaine édition du salon international de la mode.\n\nCet événement sera l'occasion de présenter notre savoir-faire à un public international et de nouer des partenariats précieux pour le développement de la mode africaine.",
        coverImage: placeholders.news,
        category: 'Événement',
        tags: ['événement', 'international', 'mode'],
        featured: false,
        author: 'Jumelles Amar',
      },
    ];

    for (const n of news) {
      await News.create({ ...n, slug: generateSlug(n.title) });
    }

    console.log('[Seed] Création de messages de contact d\'exemple...');
    await Contact.create({
      name: 'Aïcha M.',
      email: 'aicha@example.com',
      phone: '+229 96 00 00 00',
      type: 'rendez-vous',
      subject: 'Essayage robe de mariée',
      message: "Bonjour, je souhaiterais prendre rendez-vous pour un essayage de robes de mariée le mois prochain.",
      preferredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      preferredTime: '15:00',
    });

    console.log('[Seed] ✅ Données de démonstration créées avec succès !');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Erreur : ${error.message}`);
    process.exit(1);
  }
};

seed();
