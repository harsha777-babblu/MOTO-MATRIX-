// Test script to verify image integration
const axios = require('axios');

async function testImageIntegration() {
  try {
    console.log('🚀 Testing image integration...\n');

    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const serverResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Server is running:', serverResponse.data.message);

    // Test 2: Check bike images endpoint
    console.log('\n2. Testing bike images endpoint...');
    const imagesResponse = await axios.get('http://localhost:5000/api/images/bikes');
    const bikeNames = Object.keys(imagesResponse.data);
    console.log(`✅ Found ${bikeNames.length} bikes with images`);
    console.log('   Sample bikes:', bikeNames.slice(0, 3));

    // Test 3: Check specific vehicle images
    console.log('\n3. Testing specific vehicle images...');
    const vehicleResponse = await axios.get('http://localhost:5000/api/vehicles/1');
    const vehicle = vehicleResponse.data;
    console.log(`✅ Vehicle: ${vehicle.name}`);
    console.log(`   Available colors: ${vehicle.availableColors?.length || 0}`);
    console.log(`   Default images: ${vehicle.images?.length || 0}`);

    // Test 4: Check color-specific images
    if (vehicle.availableColors && vehicle.availableColors.length > 0) {
      console.log('\n4. Testing color-specific images...');
      const colorImagesResponse = await axios.get(
        `http://localhost:5000/api/vehicles/${encodeURIComponent(vehicle.name)}/images/${encodeURIComponent(vehicle.availableColors[0])}`
      );
      console.log(`✅ Color "${vehicle.availableColors[0]}" has ${colorImagesResponse.data.images.length} images`);
      console.log('   Sample image paths:', colorImagesResponse.data.images.slice(0, 2));
    }

    // Test 5: Check if images are accessible
    console.log('\n5. Testing image accessibility...');
    if (vehicle.images && vehicle.images.length > 0) {
      try {
        const imageResponse = await axios.head(vehicle.images[0]);
        console.log(`✅ Image accessible: ${imageResponse.status === 200 ? 'Yes' : 'No'}`);
      } catch (error) {
        console.log(`❌ Image not accessible: ${error.message}`);
      }
    }

    console.log('\n🎉 Image integration test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the server is running on port 5000');
    }
  }
}

// Run the test
testImageIntegration();
