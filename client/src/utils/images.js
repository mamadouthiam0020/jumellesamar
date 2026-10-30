const asset = (name) => `/assets/${name}`;

export const collectionImages = Array.from({ length: 16 }, (_, i) =>
  asset(`collection-${String(i + 1).padStart(2, '0')}.jpeg`)
);

export const heroImages = collectionImages.slice(0, 3);

export const pageImages = {
  about: collectionImages[3],
  atelier: collectionImages[4],
  collections: collectionImages[5],
  contact: collectionImages[6],
  news: collectionImages[7],
};
