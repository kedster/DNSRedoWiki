// Main site script (extracted from inline code)
// Features: theme toggle, navigation, search, mobile menu

(function () {
    'use strict';

    // Toggle theme and persist preference
    function toggleTheme() {
        const body = document.body;
        const themeIcon = document.getElementById('themeIcon');
        if (!themeIcon) return;

        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.textContent = 'Theme';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = 'Theme';
            localStorage.setItem('theme', 'dark');
        }
    }

    // Apply saved theme on load
    function applySavedTheme() {
        const saved = localStorage.getItem('theme');
        const themeIcon = document.getElementById('themeIcon');
        if (!themeIcon) return;
        if (saved === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = 'Theme';
        } else {
            document.body.removeAttribute('data-theme');
            themeIcon.textContent = 'Theme';
        }
    }

    // Navigation: wire up sidebar items and section switching
    function initNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-section]');
        const contentSections = document.querySelectorAll('.content-section');

        if (!navItems.length || !contentSections.length) return;

        function activateSection(sectionId, navToActivate) {
            navItems.forEach(n => n.classList.toggle('active', n === navToActivate));
            contentSections.forEach(s => s.classList.toggle('active', s.id === sectionId));
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        navItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.getAttribute('data-section');
                if (!target) return;
                activateSection(target, this);
            });
        });

        // If hash present on load, activate that section
        if (window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const nav = document.querySelector(`.nav-item[data-section="${id}"]`);
            if (nav) activateSection(id, nav);
        }
    }

    // Simple debounce helper
    function debounce(fn, wait) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    // Remove emoji characters from text nodes and from common icon spans
    function removeEmojisFromDOM() {
        // Unicode property escape for Emoji (ES2018+). Fallback to a conservative regex if not supported.
        let emojiRegex;
        try {
            emojiRegex = /\p{Extended_Pictographic}/gu;
        } catch (err) {
            // Fallback: a basic set of common emoji ranges (may be incomplete)
            emojiRegex = /[\u2600-\u26FF\u2700-\u27BF\u1F300-\u1F6FF\u1F900-\u1F9FF]/g;
        }

        // Remove from specific elements like themeIcon, search-icon, and any element with class 'icon'
        const selectors = ['#themeIcon', '.search-icon', '.icon', '.badge'];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (!el) return;
                el.textContent = el.textContent.replace(emojiRegex, '').trim();
            });
        });

        // Traverse text nodes to remove emoji characters (includes code/pre now)
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(n => {
            // Skip script/style content
            if (!n || !n.parentNode) return;
            const parentTag = n.parentNode.tagName && n.parentNode.tagName.toLowerCase();
            if (parentTag === 'script' || parentTag === 'style') return;
            const newText = n.nodeValue.replace(emojiRegex, '');
            if (newText !== n.nodeValue) n.nodeValue = newText;
        });
    }

    // Search: find sections containing term and highlight nav; optionally activate first match
    function initSearch() {
        const input = document.getElementById('searchInput');
        const sections = Array.from(document.querySelectorAll('.content-section'));
        if (!input || !sections.length) return;

        function clearHighlights() {
            document.querySelectorAll('.nav-item[data-section]').forEach(item => {
                item.style.background = '';
            });
        }

        function doSearch() {
            const term = input.value.trim().toLowerCase();
            clearHighlights();
            if (!term) return;

            const matches = [];
            sections.forEach(section => {
                if (section.textContent.toLowerCase().includes(term)) {
                    const id = section.id;
                    const navItem = document.querySelector(`.nav-item[data-section=\"${id}\"]`);
                    if (navItem) navItem.style.background = 'rgba(37, 99, 235, 0.1)';
                    matches.push({ section, navItem });
                }
            });

            // Activate first match for convenience
            if (matches.length) {
                const first = matches[0];
                if (first && first.section && first.section.id) {
                    document.querySelectorAll('.nav-item[data-section]').forEach(n => n.classList.remove('active'));
                    if (first.navItem) first.navItem.classList.add('active');
                    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
                    first.section.classList.add('active');
                    first.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        input.addEventListener('input', debounce(doSearch, 200));
        input.addEventListener('blur', () => setTimeout(clearHighlights, 100));
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;
        sidebar.classList.toggle('mobile-open');
        // Add a class to the body so we can apply docking styles to header/content
        document.body.classList.toggle('sidebar-open', sidebar.classList.contains('mobile-open'));
    }

    // Desktop sidebar toggle
    function toggleDesktopSidebar() {
        document.body.classList.toggle('sidebar-collapsed');
    }

    // Add mobile menu button (created once)
    function ensureMobileMenuButton() {
        const header = document.querySelector('.header');
        if (!header) return;
        if (document.querySelector('.mobile-menu-btn')) return;

        const btn = document.createElement('button');
        btn.textContent = 'Menu';
        btn.className = 'mobile-menu-btn';
        btn.setAttribute('aria-label', 'Toggle menu');
        btn.style.cssText = `background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 8px 12px; color: var(--text-primary); cursor: pointer; font-size: 16px;`;
        btn.addEventListener('click', toggleMobileMenu);
        header.insertBefore(btn, header.firstChild);
    }

    // Add desktop menu button (created once)
    function ensureDesktopMenuButton() {
        const header = document.querySelector('.header');
        if (!header) return;
        if (document.querySelector('.desktop-menu-btn')) return;

        const btn = document.createElement('button');
        btn.textContent = '☰';
        btn.className = 'desktop-menu-btn';
        btn.setAttribute('aria-label', 'Toggle sidebar');
        btn.addEventListener('click', toggleDesktopSidebar);
        header.insertBefore(btn, header.firstChild);
    }

    // Initialize all features on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function () {
        // Remove emoji characters/icons from the page text and select attributes
        // This keeps the HTML unchanged but removes visual icons at runtime.
        try {
            removeEmojisFromDOM();
        } catch (e) {
            // If the regex or traversal isn't supported, fail silently.
            // Browsers without Unicode property escapes will skip this.
            console.warn('Emoji removal skipped:', e && e.message);
        }

        applySavedTheme();
        initNavigation();
        initSearch();
        ensureMobileMenuButton();
        ensureDesktopMenuButton();

        // Wire theme toggle button to the global function used in HTML
        const themeBtn = document.querySelector('.theme-toggle');
        if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

        // Expose functions for any inline use
        window.toggleMobileMenu = toggleMobileMenu;
        window.toggleDesktopSidebar = toggleDesktopSidebar;
        window.toggleTheme = toggleTheme;
    });

})();
