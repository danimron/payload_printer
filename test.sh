#!/bin/bash

# Test script for the Payload Printer Service
# Usage: ./test.sh [port]

PORT=${1:-3001}
BASE_URL="http://localhost:$PORT"

echo "🧪 Testing Payload Printer Service on port $PORT"
echo "================================================"

echo ""
echo "1. Testing JSON payload..."
curl -X POST "$BASE_URL/webhook" \
  -H "Content-Type: application/json" \
  -d '{"message": "Test JSON", "user": {"id": 123, "name": "Alice"}, "data": [1,2,3]}' \
  -w "\n\n"

echo ""
echo "2. Testing form data..."
curl -X POST "$BASE_URL/form" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=secret123&remember=true" \
  -w "\n\n"

echo ""
echo "3. Testing query parameters..."
curl -X GET "$BASE_URL/api/users?page=2&limit=10&sort=name&filter=active" \
  -w "\n\n"

echo ""
echo "4. Testing plain text..."
curl -X POST "$BASE_URL/text" \
  -H "Content-Type: text/plain" \
  -d "This is a plain text message for testing purposes." \
  -w "\n\n"

echo ""
echo "5. Testing custom headers..."
curl -X PUT "$BASE_URL/api/update" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: abc123xyz" \
  -H "X-Request-ID: req-$(date +%s)" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" \
  -d '{"id": 456, "status": "updated", "metadata": {"version": "1.2.3"}}' \
  -w "\n\n"

echo ""
echo "6. Testing SNAP access token endpoint..."
curl -X POST "$BASE_URL/snap/v1.0/access-token/b2b" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test123" \
  -d '{"grant_type": "client_credentials", "client_id": "test_client", "client_secret": "test_secret"}' \
  -w "\n\n"

echo ""
echo "7. Testing different HTTP methods..."
curl -X DELETE "$BASE_URL/api/delete/123" \
  -H "X-Reason: cleanup" \
  -w "\n\n"

echo ""
echo "✅ Test completed! Check the service console for printed payloads."
