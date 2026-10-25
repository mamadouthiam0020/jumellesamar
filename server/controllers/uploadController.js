const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier uploadé' });
  }

  res.status(201).json({
    url: req.file.path,
    public_id: req.file.filename,
    secure_url: req.file.path,
  });
};

const uploadMultiple = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Aucun fichier uploadé' });
  }

  const urls = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));

  res.status(201).json({ urls });
};

module.exports = { uploadFile, uploadMultiple };
