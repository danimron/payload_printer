# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/payload_printer)

## Manual Deployment Steps

### 1. Prerequisites
- Vercel account (free tier available)
- Vercel CLI installed globally: `npm i -g vercel`

### 2. Deploy to Vercel

```bash
# Login to Vercel (if not already logged in)
vercel login

# Deploy from project directory
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: [your account]
# - Link to existing project: N
# - Project name: payload-printer (or your preferred name)
# - Directory: ./
# - Override settings: N
```

### 3. Environment Variables (Optional)

If you need to set environment variables:

```bash
# Set via CLI
vercel env add NODE_ENV production

# Or via Vercel dashboard
# Go to your project → Settings → Environment Variables
```

### 4. Custom Domain (Optional)

```bash
# Add custom domain
vercel domains add your-domain.com

# Add domain to project
vercel domains add your-domain.com --scope your-project
```

## Accessing Your Deployed Service

After deployment, Vercel will provide you with:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: For each deployment

### Example Usage

```bash
# Test the deployed service
curl -X POST https://your-project.vercel.app/webhook \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Vercel!"}'

# Test SNAP endpoint
curl -X POST https://your-project.vercel.app/snap/v1.0/access-token/b2b \
  -H "Content-Type: application/json" \
  -d '{"grant_type": "client_credentials"}'
```

## Viewing Logs

```bash
# View function logs
vercel logs

# View logs for specific deployment
vercel logs [deployment-url]
```

## Important Considerations for Vercel

### Serverless Limitations
- **Cold Starts**: Functions may have slight delay on first request
- **Execution Time**: Maximum 30 seconds per request (configurable)
- **Memory**: 1GB default (upgradeable on paid plans)
- **Concurrency**: Automatic scaling

### Logging Differences
- Console logs appear in Vercel's function logs
- Real-time monitoring via Vercel dashboard
- Log retention based on your plan

### Benefits
- ✅ **Zero Configuration**: Works out of the box
- ✅ **Auto Scaling**: Handles traffic spikes automatically
- ✅ **Global CDN**: Fast response times worldwide
- ✅ **HTTPS**: SSL certificates included
- ✅ **Git Integration**: Auto-deploy on push

## Troubleshooting

### Common Issues

1. **Build Errors**: Ensure `api/index.js` is properly structured
2. **Module Not Found**: Check dependencies in `package.json`
3. **Function Timeout**: Increase `maxDuration` in `vercel.json`

### Getting Help

- Check deployment logs: `vercel logs`
- Vercel documentation: https://vercel.com/docs
- Community support: https://github.com/vercel/vercel/discussions
