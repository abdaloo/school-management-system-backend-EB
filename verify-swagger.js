#!/usr/bin/env node

/**
 * Verification script for Swagger UI deployment
 * Tests that all endpoints are working correctly
 */

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = process.env.VERCEL_URL || 'https://eb-project-backend-kappa.vercel.app';
const LOCAL_URL = 'http://localhost:3003';

// Test endpoints
const endpoints = [
  { path: '/swagger.json', description: 'Swagger JSON specification' },
  { path: '/api-docs', description: 'Swagger UI HTML page' },
  { path: '/test-swagger', description: 'Swagger test endpoint' },
  { path: '/', description: 'Health check' }
];

/**
 * Make HTTP request
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

/**
 * Test a single endpoint
 */
async function testEndpoint(baseUrl, endpoint) {
  const url = baseUrl + endpoint.path;
  console.log(`Testing ${endpoint.description}: ${url}`);
  
  try {
    const response = await makeRequest(url);
    
    if (response.statusCode === 200) {
      console.log(`${endpoint.description} - OK`);
      
      // Additional checks for specific endpoints
      if (endpoint.path === '/swagger.json') {
        try {
          const spec = JSON.parse(response.body);
          const pathCount = Object.keys(spec.paths || {}).length;
          console.log(`Found ${pathCount} API paths`);
        } catch (e) {
          console.log(`Invalid JSON response`);
        }
      }
      
      if (endpoint.path === '/api-docs') {
        if (response.body.includes('swagger-ui') && response.body.includes('cdnjs.cloudflare.com')) {
          console.log(`HTML contains CDN references - Good!`);
        } else {
          console.log(`HTML might not load properly`);
        }
      }
      
      return true;
    } else {
      console.log(`${endpoint.description} - Status: ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    console.log(`${endpoint.description} - Error: ${error.message}`);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests(baseUrl) {
  console.log(`\nTesting Swagger UI deployment at: ${baseUrl}\n`);
  
  let passed = 0;
  let total = endpoints.length;
  
  for (const endpoint of endpoints) {
    const success = await testEndpoint(baseUrl, endpoint);
    if (success) passed++;
    console.log(''); // Empty line for readability
  }
  
  console.log(`\nResults: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('All tests passed! Swagger UI should be working correctly.');
  } else {
    console.log('Some tests failed. Check the output above for details.');
  }
  
  return passed === total;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const testLocal = args.includes('--local');
  const testUrl = args.find(arg => arg.startsWith('--url='))?.split('=')[1];
  
  const targetUrl = testUrl || (testLocal ? LOCAL_URL : BASE_URL);
  
  console.log('🔍 Swagger UI Deployment Verification');
  console.log('=====================================');
  
  const success = await runTests(targetUrl);
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { runTests, testEndpoint };
