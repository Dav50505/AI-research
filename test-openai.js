#!/usr/bin/env node

// Simple test script to verify your OpenAI API key works
// Run with: node test-openai.js

const https = require('https');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY environment variable is not set!');
  console.log('\n📝 To fix this:');
  console.log('1. Create a .env.local file in the root directory');
  console.log('2. Add: OPENAI_API_KEY=sk-your-key-here');
  console.log('3. Restart your terminal and try again');
  process.exit(1);
}

console.log('🔍 Testing OpenAI API connection...');
console.log('📡 API Key:', OPENAI_API_KEY.substring(0, 10) + '...');

const data = JSON.stringify({
  model: 'gpt-4o',
  messages: [
    {
      role: 'user',
      content: 'Say "Hello from AI Dev Radar!" if you can hear me.'
    }
  ],
  max_tokens: 50
});

const options = {
  hostname: 'api.openai.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const result = JSON.parse(responseData);
      const message = result.choices[0].message.content;
      console.log('\n✅ Success! OpenAI is working!');
      console.log('🤖 Response:', message);
      console.log('\n✨ Your ChatGPT integration is ready to use!');
    } else {
      console.error('\n❌ Error: API returned status', res.statusCode);
      console.error('Response:', responseData);
      
      if (res.statusCode === 401) {
        console.log('\n🔑 Your API key appears to be invalid.');
        console.log('Get a new one from: https://platform.openai.com/api-keys');
      } else if (res.statusCode === 429) {
        console.log('\n⏰ Rate limit or quota exceeded.');
        console.log('Check your usage at: https://platform.openai.com/usage');
      }
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ Network error:', error.message);
});

req.write(data);
req.end();


