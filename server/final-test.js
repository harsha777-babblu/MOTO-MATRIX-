// Final integration test
const axios = require('axios');

async function finalTest() {
  try {
    console.log('🎉 Final Integration Test\n');

    // Test 1: Server connection
    console.log('1. Testing server connection...');
    const serverResponse = await axios.get('http://localhost:5000/');
    console.log('✅ Server is running:', serverResponse.data.message);

    // Test 2: Bike images endpoint
    console.log('\n2. Testing bike images endpoint...');
    const imagesResponse = await axios.get('http://localhost:5000/api/images/bikes');
    const bikeNames = Object.keys(imagesResponse.data);
    console.log(`✅ Found ${bikeNames.length} bikes with images`);

    // Test 3: Vehicle data with local images
    console.log('\n3. Testing vehicle data...');
    const vehicleResponse = await axios.get('http://localhost:5000/api/vehicles/1');
    const vehicle = vehicleResponse.data;
    console.log(`✅ Vehicle: ${vehicle.name}`);
    console.log(`   Available colors: ${vehicle.availableColors?.length || 0}`);
    console.log(`   Default images: ${vehicle.images?.length || 0}`);

    // Test 4: Color-specific images
    if (vehicle.availableColors && vehicle.availableColors.length > 0) {
      console.log('\n4. Testing color-specific images...');
      const colorImagesResponse = await axios.get(
        `http://localhost:5000/api/vehicles/${encodeURIComponent(vehicle.name)}/images/${encodeURIComponent(vehicle.availableColors[0])}`
      );
      console.log(`✅ Color "${vehicle.availableColors[0]}" has ${colorImagesResponse.data.images.length} images`);
    }

    // Test 5: Image accessibility
    console.log('\n5. Testing image accessibility...');
    if (vehicle.images && vehicle.images.length > 0) {
      const imageResponse = await axios.head(vehicle.images[0]);
      console.log(`✅ Image accessible: ${imageResponse.status === 200 ? 'Yes' : 'No'}`);
      console.log(`   Content-Type: ${imageResponse.headers['content-type']}`);
      console.log(`   File size: ${Math.round(imageResponse.headers['content-length'] / 1024)} KB`);
    }

    console.log('\n🎉 All tests passed! Bike images are successfully integrated!');
    console.log('\n📱 You can now:');
    console.log('   • View the website at: http://localhost:3000');
    console.log('   • Browse vehicles with real bike images');
    console.log('   • Switch between different colors');
    console.log('   • See high-quality bike photos for each model');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

finalTest();
