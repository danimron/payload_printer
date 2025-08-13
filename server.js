const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON payloads
app.use(express.json({ limit: '10mb' }));

// Middleware to parse URL-encoded payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to parse raw payloads (for binary data)
app.use(express.raw({ type: '*/*', limit: '10mb' }));

// Function to format and print payload information
function printPayload(req, label = 'PAYLOAD') {
  const timestamp = new Date().toISOString();
  const separator = '='.repeat(60);
  
  console.log(`\n${separator}`);
  console.log(`${label} RECEIVED - ${timestamp}`);
  console.log(`${separator}`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log(`Headers:`, JSON.stringify(req.headers, null, 2));
  
  if (req.query && Object.keys(req.query).length > 0) {
    console.log(`Query Parameters:`, JSON.stringify(req.query, null, 2));
  }
  
  // Handle different content types
  const contentType = req.get('Content-Type') || 'unknown';
  console.log(`Content-Type: ${contentType}`);
  
  if (req.body) {
    if (Buffer.isBuffer(req.body)) {
      console.log(`Body (Buffer - ${req.body.length} bytes):`, req.body.toString('hex'));
      // Try to display as text if it's printable
      const text = req.body.toString('utf8');
      if (text.match(/^[\x20-\x7E\s]*$/)) {
        console.log(`Body (as text):`, text);
      }
    } else if (typeof req.body === 'string') {
      console.log(`Body (string):`, req.body);
    } else {
      console.log(`Body (JSON):`, JSON.stringify(req.body, null, 2));
    }
  } else {
    console.log('Body: (empty)');
  }
  
  console.log(`${separator}\n`);
}

// Special route for the specific endpoint
app.all('/snap/v1.0/access-token/b2b', (req, res) => {
  printPayload(req, 'SNAP ACCESS TOKEN REQUEST');
  
  // Return the specific response for this endpoint
  res.status(200).json({
    "responseCode": "2007300",
    "responseMessage": "Successful",
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1QjhXRGtYSzVBMWpyeFVrckMyWnB4NFN4XzVBRUlhMVpjM1NsOVZobUtJIn0.eyJleHAiOjE3NTUwNTcwMjMsImlhdCI6MTc1NTA1NjcyMywianRpIjoiMGFmZDgyZGYtMTU0NC00ZDNhLWJlYzItZDUzMTJmODNjMDI5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay11YXQuYXN0cmFwYXkuY29tL2F1dGgvcmVhbG1zL2FzdHJhcGF5LWJ1c2luZXNzIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU4ODE4NTczLTY0OWUtNDRjOC04NGU0LWU5MjVlYTY1OTMxMyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFjMTA5ODRmLTZmYmUtNGM1Ny05MDg5LTFhYzhiNjgwMDRjNSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWFzdHJhcGF5LWJ1c2luZXNzIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImNsaWVudElkIjoiYWMxMDk4NGYtNmZiZS00YzU3LTkwODktMWFjOGI2ODAwNGM1IiwiY2xpZW50SG9zdCI6IjM0LjEwMS4yMTYuMTY4IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtYWMxMDk4NGYtNmZiZS00YzU3LTkwODktMWFjOGI2ODAwNGM1IiwiY2xpZW50QWRkcmVzcyI6IjM0LjEwMS4yMTYuMTY4In0.BSRN4moQQk6y38uKlxsQ8U7Xwcn9ovvpnu6F__syNvQlh1yw2LObXn1Pl-hwpPSsLETwESr9L7pRc_10QsFXtBrWPf9dp2cBm0IvyZrGJZocCyWyJbBr29aPCoocGCp71QrdAjgEiZN2E3kCc_exIx3IQubDucdBObosd6YUN4wiLxzx93LROc_6CkSx9QuHdAQy20GDKkx0gS3e6YSXwaxJghNzKtJl__vpohYqKdoEVCeYFK4yJXqMQzj309N5UNvoZPTmjmvf2usAMYmJo5QqTk3hw8sxDW5rJ4viMoJj_qOLrEebDmOi4SqpE2IlQcTaJNXoUEBpU9ymarX2Hg",
    "tokenType": "Bearer",
    "expiresIn": "300",
    "additionalInfo": null
  });
});

// Catch-all route for any HTTP method and path
app.all('*', (req, res) => {
  printPayload(req);
  
  // Send a response back
  res.status(200).json({
    success: true,
    message: 'Payload received and printed',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    receivedPayload: {
      headers: req.headers,
      query: req.query,
      body: req.body
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  printPayload(req, 'ERROR PAYLOAD');
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Payload Printer Service started on port ${PORT}`);
  console.log(`📡 Ready to receive and print payloads at http://localhost:${PORT}`);
  console.log(`📝 Send any HTTP request to any endpoint to see the payload printed`);
  console.log(`\nExample usage:`);
  console.log(`  curl -X POST http://localhost:${PORT}/webhook -H "Content-Type: application/json" -d '{"test": "data"}'`);
  console.log(`  curl -X GET http://localhost:${PORT}/test?param1=value1&param2=value2`);
});

module.exports = app;
