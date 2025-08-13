# Payload Printer Service

A simple HTTP service that receives and prints any payload sent to it. Perfect for debugging webhooks, API calls, or any HTTP requests.

## Features

- 🎯 Accepts any HTTP method (GET, POST, PUT, DELETE, etc.)
- 📝 Prints detailed payload information including headers, query parameters, and body
- 🔄 Handles multiple content types (JSON, form data, raw binary, text)
- 🌐 CORS enabled for cross-origin requests
- 📊 Returns structured response with received data
- 🛡️ Error handling for malformed requests
- 🔐 Special endpoint support (e.g., `/snap/v1.0/access-token/b2b` returns SNAP access token)

## Installation

### Option 1: Local Installation

1. Install dependencies:
```bash
npm install
```

### Option 2: Docker

1. Build and run with Docker:
```bash
# Build the image
docker build -t payload-printer .

# Run the container
docker run -p 3000:3000 payload-printer
```

2. Or use Docker Compose:
```bash
docker-compose up
```

### Option 3: Vercel (Serverless)

Deploy to Vercel for serverless hosting:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the one-click deploy button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/payload_printer)

📖 **See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for detailed Vercel deployment instructions**

## Usage

### Start the service

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The service will start on port 3000 by default (or the port specified in the `PORT` environment variable).

### Send requests

The service accepts requests to any endpoint. Examples:

```bash
# JSON payload
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World", "timestamp": "2024-01-01T00:00:00Z"}'

# Form data
curl -X POST http://localhost:3000/form \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=John&email=john@example.com"

# Query parameters
curl -X GET "http://localhost:3000/test?param1=value1&param2=value2"

# Raw text
curl -X POST http://localhost:3000/text \
  -H "Content-Type: text/plain" \
  -d "This is raw text data"

# Binary data
curl -X POST http://localhost:3000/binary \
  -H "Content-Type: application/octet-stream" \
  --data-binary @some-file.bin
```

### Output Format

When a payload is received, the service prints detailed information to the console:

```
============================================================
PAYLOAD RECEIVED - 2024-01-01T12:00:00.000Z
============================================================
Method: POST
URL: /webhook
Headers: {
  "content-type": "application/json",
  "user-agent": "curl/7.64.1",
  "accept": "*/*",
  "content-length": "45"
}
Content-Type: application/json
Body (JSON): {
  "message": "Hello World",
  "timestamp": "2024-01-01T00:00:00Z"
}
============================================================
```

### Response Format

The service responds with a JSON object containing:

```json
{
  "success": true,
  "message": "Payload received and printed",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "method": "POST",
  "path": "/webhook",
  "receivedPayload": {
    "headers": { /* request headers */ },
    "query": { /* query parameters */ },
    "body": { /* request body */ }
  }
}
```

## Special Endpoints

### SNAP Access Token Endpoint

The service includes a special endpoint that mimics the SNAP (Indonesian payment gateway) access token API:

**Endpoint**: `POST /snap/v1.0/access-token/b2b`

**Response**:
```json
{
  "responseCode": "2007300",
  "responseMessage": "Successful", 
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1QjhXRGtYSzVBMWpyeFVrckMyWnB4NFN4XzVBRUlhMVpjM1NsOVZobUtJIn0...",
  "tokenType": "Bearer",
  "expiresIn": "300",
  "additionalInfo": null
}
```

This endpoint still logs the received payload but returns the specific SNAP-formatted response for testing purposes.

## Configuration

- **Port**: Set the `PORT` environment variable to change the listening port
- **Payload Size**: Maximum payload size is set to 10MB by default

## Use Cases

- 🔍 Debugging webhooks from third-party services
- 🧪 Testing API integrations
- 📡 Inspecting HTTP requests during development
- 🎯 Creating a simple request logger
- 🔧 Troubleshooting payload formatting issues

## License

MIT
