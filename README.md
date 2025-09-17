# DNSRedo Knowledge Base

Enterprise DNS Orchestration & Protection Platform Documentation

## 🚀 Live Demo

Visit the live documentation: [DNSRedo Knowledge Base](https://dnsredo-knowledge-base.pages.dev)

## 📋 Overview

This is the comprehensive documentation site for DNSRedo, an enterprise DNS management platform featuring:

- **AI-Powered DNS Protection** - Intelligent monitoring and threat detection
- **Multi-Provider Support** - Cloudflare, AWS Route53, DigitalOcean, Namecheap
- **Real-Time Analytics** - Performance insights and detailed reporting
- **Automated Backups** - One-click backup and restore capabilities
- **Health Monitoring** - DNS propagation status and validation checks

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Cloudflare Pages
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions

## 🚀 Cloudflare Deployment

This application is deployed using Cloudflare Pages with automated CI/CD from GitHub.

### Prerequisites

- Node.js v20+ (for development)
- Cloudflare account
- GitHub repository access

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/kedster/DNSRedoWiki.git
   cd DNSRedoWiki
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Local development**
   ```bash
   npm run dev
   ```
   Open http://localhost:8000 to view the site.

4. **Deploy to Cloudflare Pages**
   
   **Option A: Automatic Deployment (Recommended)**
   - Push to `main` branch triggers automatic deployment via GitHub Actions
   - Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets in GitHub

   **Option B: Manual Deployment**
   ```bash
   npx wrangler pages deploy . --project-name=dnsredo-knowledge-base
   ```

### Environment Variables

Configure these secrets in your GitHub repository settings:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages:Edit permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

### Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `./` (root directory for static files)
- **Node Version**: 20.x

## 📁 Project Structure

```
DNSRedoWiki/
├── index.html          # Main documentation page
├── styles.css          # Stylesheet with light/dark themes
├── script.js           # Interactive functionality
├── notes.md           # Development notes and features
├── package.json       # Node.js dependencies and scripts
├── wrangler.toml      # Cloudflare Workers configuration
├── .github/
│   └── workflows/
│       └── deploy.yml # Cloudflare Pages deployment workflow
└── README.md          # This file
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build for production (static site)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run linting checks

### Features

- **Responsive Design** - Mobile-friendly interface
- **Dark/Light Theme** - Toggle between themes
- **Search Functionality** - Search through documentation
- **Navigation** - Smooth scrolling and section switching
- **Performance** - Optimized for fast loading

## 🌐 Cloudflare Features Used

- **Cloudflare Pages** - Static site hosting with global CDN
- **GitHub Integration** - Automatic deployments from Git
- **Custom Domains** - Support for custom domain configuration
- **SSL/TLS** - Automatic HTTPS encryption
- **Analytics** - Built-in web analytics (configurable)

## 🔮 Future Enhancements

For backend functionality, this setup is ready for:

- **Cloudflare Workers** - Serverless functions for dynamic features
- **Cloudflare D1** - SQLite database for user data
- **Cloudflare R2** - Object storage for file uploads
- **Cloudflare Access** - Authentication and authorization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For technical support or deployment issues:
- Check the [GitHub Issues](https://github.com/kedster/DNSRedoWiki/issues)
- Review Cloudflare Pages [documentation](https://developers.cloudflare.com/pages/)
- Contact the development team