#!/bin/bash

# Test script for Vercel-deployed Payload Printer Service
# Usage: ./test-vercel.sh [your-vercel-url]

if [ -z "$1" ]; then
    echo "Usage: $0 <vercel-url>"
    echo "Example: $0 https://payload-printer.vercel.app"
    exit 1
fi

BASE_URL="$1"

echo "🧪 Testing Payload Printer Service on Vercel"
echo "URL: $BASE_URL"
echo "================================================"

echo ""
echo "1. Testing basic endpoint..."
curl -X POST "$BASE_URL/test" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Vercel test!", "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}' \
  -w "\n\n"

echo ""
echo "2. Testing SNAP access token endpoint..."
curl -X POST "$BASE_URL/snap/v1.0/access-token/b2b" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: vercel-test" \
  -d '{"grant_type": "client_credentials", "client_id": "vercel_test", "client_secret": "test_secret"}' \
  -w "\n\n"

echo ""
echo "3. Testing with query parameters..."
curl -X GET "$BASE_URL/api/test?deployed=vercel&timestamp=$(date +%s)" \
  -w "\n\n"

echo ""
echo "4. Testing form data..."
curl -X POST "$BASE_URL/form-test" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "platform=vercel&test=successful&deployed=$(date +%Y%m%d)" \
  -w "\n\n"

echo ""
echo "✅ Vercel deployment test completed!"
echo ""
echo "💡 Tips:"
echo "- Check Vercel dashboard for function logs"
echo "- Console.log output appears in Vercel function logs"
echo "- Use 'vercel logs' command to view logs via CLI"
