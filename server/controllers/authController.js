const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Un utilisateur existe déjà avec cet email' });
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
    role: 'client',
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    token: generateToken(user._id),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Email ou mot de passe invalide' });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    token: generateToken(user._id),
  });
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;
  if (req.body.avatar) user.avatar = req.body.avatar;

  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();
  res.json({ ...user.toObject(), password: undefined });
};

const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  await user.remove();
  res.json({ message: 'Utilisateur supprimé' });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getUsers,
  deleteUser,
};
