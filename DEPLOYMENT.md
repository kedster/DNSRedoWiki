# Cloudflare Deployment Setup Guide

This guide walks through the complete setup process for deploying the DNSRedo Knowledge Base to Cloudflare Pages.

## Prerequisites

✅ **Completed:**
- Node.js v20+ installed
- Repository configured with deployment files
- GitHub Actions workflow ready

⚠️ **Manual Setup Required:**

### 1. Cloudflare Account Setup

1. **Create/Login to Cloudflare Account**
   - Visit [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Note your Account ID (found in the right sidebar)

2. **Generate API Token**
   - Go to "My Profile" → "API Tokens"
   - Click "Create Token"
   - Use "Pages:Edit" permissions
   - Save the token securely

### 2. GitHub Repository Secrets

Add these secrets in your GitHub repository settings (`Settings` → `Secrets and variables` → `Actions`):

```
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

### 3. Cloudflare Pages Project

**Option A: Automatic (via GitHub Actions)**
- Push to `main` branch
- GitHub Actions will automatically create and deploy

**Option B: Manual Setup**
1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect to GitHub repository: `kedster/DNSRedoWiki`
4. Configure build settings:
   - **Project name**: `dnsredo-knowledge-base`
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `/`
   - **Root directory**: `/`

### 4. Domain Configuration (Optional)

1. **Custom Domain Setup**
   - In Cloudflare Pages → Custom domains
   - Add your domain (e.g., `docs.dnsredo.com`)
   - Update DNS records as instructed

2. **SSL/TLS Settings**
   - Automatic HTTPS is enabled by default
   - Certificate provisioning handled automatically

### 5. Performance Optimization

**Already configured:**
- Security headers via `_headers` file
- Redirect rules via `_redirects` file
- SEO optimization with meta tags
- Performance-optimized static assets

## Verification Steps

1. **Check Deployment Status**
   ```bash
   # View deployment logs in GitHub Actions
   # Visit: https://github.com/kedster/DNSRedoWiki/actions
   ```

2. **Test Live Site**
   - Visit: `https://dnsredo-knowledge-base.pages.dev`
   - Test navigation, search, and theme switching
   - Verify mobile responsiveness

3. **Performance Testing**
   ```bash
   # Optional: Use Lighthouse for performance audit
   npx lighthouse https://dnsredo-knowledge-base.pages.dev
   ```

## Deployment Architecture

```
GitHub Repository (kedster/DNSRedoWiki)
    ↓ (Push to main)
GitHub Actions Workflow (.github/workflows/deploy.yml)
    ↓ (npm run build)
Cloudflare Pages (Global CDN)
    ↓ (Custom domain optional)
Live Site: https://dnsredo-knowledge-base.pages.dev
```

## File Overview

| File | Purpose |
|------|---------|
| `package.json` | Node.js project configuration |
| `.github/workflows/deploy.yml` | Automated deployment pipeline |
| `wrangler.toml` | Cloudflare Workers/Pages configuration |
| `_headers` | Security headers for Cloudflare Pages |
| `_redirects` | URL redirects and rewrites |
| `.gitignore` | Exclude build artifacts and dependencies |
| `README.md` | Project documentation |

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Ensure Node.js v20+ in GitHub Actions
   - Check `npm run build` works locally

2. **Deployment Fails**
   - Verify API token has correct permissions
   - Check Account ID is correct
   - Ensure project name is unique

3. **Custom Domain Issues**
   - Verify DNS records point to Cloudflare
   - Allow up to 48 hours for DNS propagation

### Support Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Project Issues](https://github.com/kedster/DNSRedoWiki/issues)

## Next Steps: Backend Integration

For future backend functionality:

1. **Cloudflare Workers**
   ```bash
   # Deploy serverless functions
   npx wrangler deploy
   ```

2. **Database Options**
   - Cloudflare D1 (SQLite)
   - Cloudflare KV (Key-Value)
   - Cloudflare R2 (Object Storage)

3. **Authentication**
   - Cloudflare Access
   - Third-party providers (Google, GitHub)

---

**Status**: ✅ Ready for deployment
**Estimated Setup Time**: 10-15 minutes
**Maintenance**: Automatic via GitHub Actions