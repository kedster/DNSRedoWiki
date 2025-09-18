# DNSRedo Knowledge Base

DNSRedo Knowledge Base is a static HTML/CSS/JavaScript documentation website that serves as a comprehensive wiki for the DNSRedo DNS orchestration and protection platform. The site features responsive design, dark/light theme switching, search functionality, and navigation between documentation sections.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

Bootstrap and run the documentation site locally:
- `cd /home/runner/work/DNSRedoWiki/DNSRedoWiki` (or your repository root)
- `python3 -m http.server 8080` -- starts instantly (< 1 second). Server runs indefinitely until manually stopped.
- Access the site at: `http://localhost:8080`
- Alternative ports if 8080 is busy: `python3 -m http.server 8000` or any available port

Test all core functionality:
- `curl -o /dev/null -s -w "HTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" http://localhost:8080/` -- validates server response
- `curl -s http://localhost:8080/styles.css | wc -c` -- should return `11331` (CSS file size)
- `curl -s http://localhost:8080/script.js | head -5` -- should show JavaScript file header

Stop the development server:
- `pkill -f "python3 -m http.server"` -- immediately terminates the server

## Validation

ALWAYS manually validate any new code by testing the complete user experience:
- **Theme Toggle**: Click the "Theme" button in the header to switch between light and dark modes. Verify localStorage persistence by refreshing the page.
- **Navigation**: Click all sidebar navigation items to ensure smooth section switching and proper highlighting.
- **Search Functionality**: Type "DNS" in the search box and verify search highlighting works correctly.
- **Mobile Responsiveness**: Resize browser window or use mobile view to test responsive design.
- **Complete User Scenarios**: Navigate through Overview → Quick Start Guide → Dashboard → Settings to test full user flow.

Take screenshots after making any visual changes to document the impact:
- Light theme: Verify professional blue-and-white color scheme
- Dark theme: Verify dark background with proper text contrast
- Navigation: Confirm active states and hover effects work correctly

## Project Structure and Key Files

### Repository Root Files:
```
/home/runner/work/DNSRedoWiki/DNSRedoWiki/
├── index.html          # Main HTML file with all content sections
├── styles.css          # Complete CSS with light/dark theme variables
├── script.js           # JavaScript for theme toggle, navigation, search
└── notes.md           # Developer notes and feature documentation
```

### Core Components:

**index.html** (38,168 bytes):
- Single-page application with all documentation content
- Responsive sidebar navigation with sections: Getting Started, Core Features, Tools & Settings, Advanced
- Header with logo, search, and theme toggle
- Content sections: Overview, Quick Start, Target Audience, Dashboard, Domains, Security, Analytics, DNS Tools, Settings, Help, Admin Panel, Pricing, API Reference
- Each section contains detailed tables, feature cards, and step-by-step guides

**styles.css** (11,331 bytes):
- CSS custom properties for theming (`--primary-color`, `--background`, etc.)
- Dark theme overrides using `[data-theme="dark"]` selector
- Responsive design with mobile-first approach
- Professional color scheme: Primary blue (#2563eb), surfaces, borders
- Sidebar width: 280px, mobile breakpoints handled

**script.js** (8,528 bytes):
- Theme toggle with localStorage persistence
- Navigation system with smooth scrolling
- Search functionality with section highlighting
- Mobile menu toggle
- Emoji removal utility for clean presentation
- Debounced search with 300ms delay

## Common Development Tasks

### Adding New Documentation Sections:
1. Add navigation item to `index.html` sidebar with `data-section="new-section"`
2. Create corresponding content section with `id="new-section"` and class `content-section`
3. Test navigation by clicking the new sidebar item
4. Verify section appears and scrolls smoothly into view

### Theme Development:
- Light theme colors defined in `:root` CSS variables
- Dark theme overrides in `[data-theme="dark"]` selector
- Test both themes after any color changes
- Verify localStorage persistence: `localStorage.getItem('theme')`

### Responsive Design:
- Mobile breakpoint: CSS handles responsive behavior automatically
- Test on various screen sizes: desktop (1200px+), tablet (768px+), mobile (480px+)
- Mobile menu automatically appears on smaller screens

## Frequently Referenced Information

### Server Response Time:
- Typical response time: ~0.003 seconds for static files
- CSS file size: 11,331 bytes
- JavaScript file size: 8,528 bytes  
- HTML file size: 38,168 bytes

### Navigation Sections (in order):
**Getting Started:**
- Overview
- Quick Start Guide  
- Who This Is For

**Core Features:**
- Dashboard
- Domain Management
- Security Center
- Analytics

**Tools & Settings:**
- DNS Tools
- Settings
- DNS Help

**Advanced:**
- Admin Panel
- Pricing & Billing
- API Reference

### Key Features Documented:
- Google OAuth authentication
- Multi-provider DNS support (Cloudflare, Route53, DigitalOcean, Namecheap)
- Real-time monitoring with 30-second auto-refresh
- AI-powered DNS assistance
- Automated backups and security monitoring
- Global DNS propagation testing
- Performance analytics and reporting
- Team management and role-based permissions

### Target Audience:
Primary users: DevOps Engineers, System Administrators, Web Developers, IT Consultants, SaaS Companies, Digital Agencies
Secondary users: Technical Founders, Freelance Developers, Small Business Owners

## Timing Expectations

- **Server startup**: < 1 second
- **Page load**: < 0.01 seconds (static files)
- **Theme toggle**: Instant (JavaScript-based)
- **Navigation**: Instant with smooth scroll animation
- **Search response**: ~300ms (debounced)

No build process required - all files are static and served directly by Python's HTTP server.

## Validation Checklist

When making changes, ALWAYS test:
- [ ] Server starts successfully with `python3 -m http.server 8080`
- [ ] Site loads at http://localhost:8080 with no console errors
- [ ] Theme toggle works and persists across page refreshes
- [ ] All navigation items work and highlight correctly
- [ ] Search functionality highlights matching sections
- [ ] Mobile menu appears and functions on narrow screens
- [ ] All content sections display properly
- [ ] CSS and JavaScript files load correctly (check browser dev tools)
- [ ] Take screenshots to document visual changes

The documentation site requires no dependencies, builds, or complex setup - it's a straightforward static website optimized for fast loading and easy maintenance.