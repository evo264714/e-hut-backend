const { connectToDB } = require('../db');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      req.userId = decoded.id; 
      next(); 
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  

const addProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  try {
    const db = await connectToDB();
    const productsCollection = db.collection('products');
    const newProduct = {
      name,
      description,
      price,
      category,
      image,
      userId: req.userId,
      createdAt: new Date(),
    };
    await productsCollection.insertOne(newProduct);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product' });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const db = await connectToDB();
    const productsCollection = db.collection('products');
    const myProducts = await productsCollection.find({ userId: req.userId }).toArray();
    res.status(200).json(myProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
};

const getAllProducts = async (req, res) => {
    try {
      const db = await connectToDB();
      const productsCollection = db.collection('products');
      const allProducts = await productsCollection.find().toArray(); 
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve products' });
    }
  };

module.exports = {
  authenticate,
  addProduct,
  getMyProducts,
  getAllProducts
};
