// Test image accessibility
const axios = require('axios');

async function testImageAccess() {
  try {
    console.log('🧪 Testing image accessibility...\n');

    // Test a specific image URL
    const imageUrl = 'http://localhost:5000/api/images/bikes/Royal%20Enfield%20Hunter%20350/London%20Red/img1.jpg';
    console.log('Testing image URL:', imageUrl);

    const response = await axios.head(imageUrl);
    console.log('✅ Image accessible! Status:', response.status);
    console.log('Content-Type:', response.headers['content-type']);
    console.log('Content-Length:', response.headers['content-length']);

  } catch (error) {
    console.log('❌ Image not accessible:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Status Text:', error.response.statusText);
    }
  }
}

testImageAccess();
