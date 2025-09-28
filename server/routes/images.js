const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Serve static images from bikes_real_images folder
router.use('/bikes', express.static(path.join(__dirname, '../../bikes_real_images')));

// Get available bike images
router.get('/bikes', (req, res) => {
  try {
    const bikesDir = path.join(__dirname, '../../bikes_real_images');
    const bikeImages = {};

    console.log('__dirname is:', __dirname);
    console.log('Looking for bikes directory at:', bikesDir);
    console.log('Directory exists:', fs.existsSync(bikesDir));

    if (!fs.existsSync(bikesDir)) {
      return res.json({ message: 'Bike images directory not found', path: bikesDir });
    }

    const bikeFolders = fs.readdirSync(bikesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    bikeFolders.forEach(bikeName => {
      const bikePath = path.join(bikesDir, bikeName);
      const colorFolders = fs.readdirSync(bikePath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      bikeImages[bikeName] = {};
      
      colorFolders.forEach(colorName => {
        const colorPath = path.join(bikePath, colorName);
        const imageFiles = fs.readdirSync(colorPath)
          .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
          .sort();

        bikeImages[bikeName][colorName] = imageFiles.map(file => 
          `/api/images/bikes/${encodeURIComponent(bikeName)}/${encodeURIComponent(colorName)}/${file}`
        );
      });
    });

    res.json(bikeImages);
  } catch (error) {
    console.error('Error reading bike images:', error);
    res.status(500).json({ message: 'Error reading bike images' });
  }
});

// Get images for a specific bike and color
router.get('/bikes/:bikeName/:color', (req, res) => {
  try {
    const { bikeName, color } = req.params;
    const decodedBikeName = decodeURIComponent(bikeName);
    const decodedColor = decodeURIComponent(color);
    
    const colorPath = path.join(__dirname, '../../bikes_real_images', decodedBikeName, decodedColor);
    
    if (!fs.existsSync(colorPath)) {
      return res.status(404).json({ message: 'Color not found' });
    }

    const imageFiles = fs.readdirSync(colorPath)
      .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
      .sort()
      .map(file => 
        `/api/images/bikes/${encodeURIComponent(decodedBikeName)}/${encodeURIComponent(decodedColor)}/${file}`
      );

    res.json({
      bikeName: decodedBikeName,
      color: decodedColor,
      images: imageFiles
    });
  } catch (error) {
    console.error('Error reading bike color images:', error);
    res.status(500).json({ message: 'Error reading bike color images' });
  }
});

// Get available colors for a specific bike
router.get('/bikes/:bikeName', (req, res) => {
  try {
    const { bikeName } = req.params;
    const decodedBikeName = decodeURIComponent(bikeName);
    
    const bikePath = path.join(__dirname, '../../bikes_real_images', decodedBikeName);
    
    if (!fs.existsSync(bikePath)) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    const colorFolders = fs.readdirSync(bikePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    res.json({
      bikeName: decodedBikeName,
      colors: colorFolders
    });
  } catch (error) {
    console.error('Error reading bike colors:', error);
    res.status(500).json({ message: 'Error reading bike colors' });
  }
});

module.exports = router;
