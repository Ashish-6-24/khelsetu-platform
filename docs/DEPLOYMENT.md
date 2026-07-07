# Deployment Guide

**Last Updated:** July 1, 2026 | **Status:** Production Ready

---

## Deployment Overview

KhelSetu frontend is a static SPA (Single Page Application) that can be deployed to any static file hosting service.

**Characteristics:**

- No server-side rendering required
- Builds to static HTML, CSS, JS files
- Can be cached aggressively (content hash in filenames)
- Works on any CDN

---

## Pre-Deployment Checklist

Before deploying to production:

```bash
# 1. Type-check
npm run typecheck

# 2. Lint and format
npm run lint:fix
npm run format

# 3. Run tests
npm run test:run

# 4. Build
npm run build

# 5. Verify build output
ls -lh dist/
du -sh dist/

# 6. Preview locally
npm run preview
```

---

## Environment Configuration

### Development (.env)

```env
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
VITE_APP_ENV=development
VITE_ENABLE_DEBUGGING=true
```

### Production (.env.production)

```env
VITE_API_URL=https://api.khelsetu.com
VITE_WS_URL=wss://api.khelsetu.com
VITE_APP_ENV=production
VITE_ENABLE_DEBUGGING=false
```

---

## Build Process

### Production Build

```bash
npm run build
```

**Output:**

- `dist/index.html` - Main entry point
- `dist/assets/` - Minified JS and CSS
- `dist/sw.js` - Service Worker (PWA support)
- Total size: ~150KB gzipped

**Optimization Steps:**

1. TypeScript compilation
2. Tree-shaking (removing unused code)
3. Minification (removing whitespace)
4. Gzip compression
5. Content-hash filenames (cache busting)

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**

- Zero-config deployment
- Automatic HTTPS
- Built-in CDN
- Automatic deployments on git push

**Steps:**

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Login:

```bash
vercel login
```

3. Deploy:

```bash
cd khelsetu-frontend
vercel --prod
```

4. Configure environment:

```
Dashboard → Settings → Environment Variables
Add: VITE_API_URL, VITE_WS_URL
```

**Vercel Config (optional):**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@api_url",
    "VITE_WS_URL": "@ws_url"
  }
}
```

---

### Option 2: Netlify

**Pros:**

- Git integration
- Automatic builds on push
- Easy rollback

**Steps:**

1. Connect GitHub repo to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Environment variables:
   - `VITE_API_URL`
   - `VITE_WS_URL`
4. Deploy

**netlify.toml:**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[env]
  VITE_API_URL = "https://api.khelsetu.com"
  VITE_WS_URL = "wss://api.khelsetu.com"
```

---

### Option 3: AWS S3 + CloudFront

**Pros:**

- Most control
- Scalable
- Cost-effective at scale

**Steps:**

1. Create S3 bucket:

```bash
aws s3 mb s3://khelsetu-frontend
```

2. Build and upload:

```bash
npm run build
aws s3 sync dist/ s3://khelsetu-frontend --delete
```

3. Create CloudFront distribution:
   - Origin: S3 bucket
   - Default root object: index.html
   - Error pages: 404 → index.html (SPA routing)

4. Set cache headers:

```bash
# Cache everything except index.html for 1 year
aws s3 cp dist/assets/ s3://khelsetu-frontend/assets/ \
  --recursive --cache-control "max-age=31536000"

# Cache index.html for 1 hour
aws s3 cp dist/index.html s3://khelsetu-frontend/index.html \
  --cache-control "max-age=3600"
```

---

### Option 4: Docker

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build and run:**

```bash
docker build -t khelsetu-frontend .
docker run -p 3000:3000 khelsetu-frontend
```

---

## SPA Routing Configuration

Important: Configure server to serve `index.html` for all routes (not just `/`).

### Vercel

- Automatically handled (no config needed)

### Netlify

- Automatically handled (no config needed)

### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx

```nginx
server {
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## Performance Optimization

### Caching Strategy

1. **index.html** - Cache for 1 hour
   - Changes with every build
   - Always check if updated

2. **Assets (with hash)** - Cache for 1 year
   - `app-abc123.js`, `style-def456.css`
   - Hash changes if content changes
   - Browser caches based on filename

3. **Dependencies (node_modules)** - Cache for 30 days
   - `vendor-react-ghi789.js`
   - Only changes if package.json changes

### Compression

Ensure GZIP compression is enabled on your server:

```bash
# Verify gzip on Vercel
curl -I https://khelsetu.vercel.app/ | grep -i encoding

# Should show: content-encoding: gzip
```

### CDN Usage

- Vercel: Built-in global CDN
- Netlify: Built-in CDN
- AWS: CloudFront CDN
- S3: Add CloudFront in front

---

## Monitoring & Logs

### Vercel

```bash
# View deployments
vercel ls

# View logs
vercel logs

# View analytics
# Dashboard → Analytics
```

### Netlify

- Dashboard → Deploys (view history)
- Dashboard → Analytics (performance metrics)

### AWS CloudWatch

```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --dimensions Name=DistributionId,Value=E123456 \
  --start-time 2026-07-01T00:00:00Z \
  --end-time 2026-07-02T00:00:00Z \
  --period 3600 \
  --statistics Sum
```

---

## Error Handling

### 404 Errors (File Not Found)

For SPA routing, server should serve `index.html` so React Router handles the route.

**Vercel:** Automatic
**Netlify:** Automatic
**AWS:** Configure error page

### 5xx Errors (Server Issues)

Typically backend errors (API endpoint down).

Check backend logs:

```bash
# If using Node.js backend
pm2 logs

# If using Docker
docker logs <container-id>
```

---

## Rollback Strategy

### Vercel

```bash
# View previous deployments
vercel ls

# Rollback to previous
vercel rollback
```

### Netlify

- Dashboard → Deploys → Click previous deployment

### AWS S3

```bash
# Sync from previous backup
aws s3 sync s3://khelsetu-backup/previous/ s3://khelsetu-frontend/
```

---

## SSL/HTTPS

### Vercel

- Automatic HTTPS certificate
- Auto-renewal

### Netlify

- Automatic HTTPS certificate via Let's Encrypt
- Auto-renewal

### AWS

- Use ACM (AWS Certificate Manager)
- Add to CloudFront distribution

### Self-hosted

- Use Let's Encrypt (certbot)
- Auto-renewal with cron job

---

## Performance Metrics

Target metrics:

| Metric                         | Target | Tool       |
| ------------------------------ | ------ | ---------- |
| FCP (First Contentful Paint)   | < 1.5s | Lighthouse |
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| CLS (Cumulative Layout Shift)  | < 0.1  | Lighthouse |
| TTI (Time to Interactive)      | < 3.5s | Lighthouse |

Check with:

```bash
npm run preview
# Then use Lighthouse in Chrome DevTools
```

---

## Security Headers

Configure on your server:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

**Vercel:** Automatic secure headers
**Netlify:** Configure in netlify.toml
**AWS:** CloudFront distribution settings

---

## Deployment Checklist

- [ ] Tests passing (`npm run test:run`)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No console errors in build
- [ ] Preview looks good (`npm run preview`)
- [ ] Environment variables set on deployment platform
- [ ] HTTPS enabled
- [ ] Caching headers configured
- [ ] SPA routing configured
- [ ] Monitoring/logs accessible
- [ ] Rollback plan in place
- [ ] Backend API accessible from deployment region

---

**Next:** Deploy to production and monitor performance!
