const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes'); 
const { connectToDB } = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDB()
  .then(() => {
    console.log('Successfully connected to MongoDB');

    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes); 

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
