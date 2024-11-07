const fs = require('fs');
const csv = require('csv-parser');

// Define file paths
const customerSuccessFile = 'customer-success.csv';
const postSGTVFile = 'Post SGTV 11_05 - Import Sheet - in progress (1).csv';

// Arrays to store our data
const customerSuccessData = [];
const postSGTVData = [];

// Results object
const results = {};

function readCustomerSuccessFile() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(customerSuccessFile)
      .pipe(csv())
      .on('data', (data) => customerSuccessData.push(data))
      .on('end', () => resolve())
      .on('error', reject);
  });
}

function readPostSGTVFile() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(postSGTVFile)
      .pipe(csv())
      .on('data', (data) => postSGTVData.push(data))
      .on('end', () => resolve())
      .on('error', reject);
  });
}

function compareHandles() {
  customerSuccessData.forEach(customer => {
    const customerHandle = customer.sold_to_handle.toLowerCase().trim();
    
    // Find matches in postSGTVData
    const matches = postSGTVData.filter(post => 
      post.sold_to_handle.toLowerCase().trim() === customerHandle
    );

    if (matches.length > 0) {
      results[customerHandle] = matches.length;
    }
  });
}

async function main() {
  try {
    // First, install required package
    // npm install csv-parser

    console.log('Reading CSV files...');
    
    // Read both files
    await Promise.all([
      readCustomerSuccessFile(),
      readPostSGTVFile()
    ]);

    console.log('Comparing handles...');
    compareHandles();

    // Output results
    console.log('\nResults:');
    console.log('------------------------');
    Object.entries(results).forEach(([handle, count]) => {
      console.log(`${handle}: ${count} matches`);
    });

    // Output summary
    const totalMatches = Object.values(results).reduce((a, b) => a + b, 0);
    console.log('\nSummary:');
    console.log('------------------------');
    console.log(`Total unique handles matched: ${Object.keys(results).length}`);
    console.log(`Total matches found: ${totalMatches}`);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
main();