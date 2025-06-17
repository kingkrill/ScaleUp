class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }

    init() {
        // Initialize theme
        this.applyTheme(this.currentTheme);
        
        // Setup event listeners
        this.setupThemeToggle();
        this.listenToSystemChanges();
        this.setupThemeTransitions();
        
        // Initialize color schemes
        this.initializeColorSchemes();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcons();
        this.updateColors();
        this.updateMetaThemeColor();
    }

    setupThemeToggle() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
                this.applyTheme(this.currentTheme);
                this.animateThemeTransition();
            });
        }
    }

    listenToSystemChanges() {
        this.systemPreference.addEventListener('change', (e) => {
            if (localStorage.getItem('theme-preference') !== 'manual') {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.currentTheme);
            }
        });
    }

    updateThemeIcons() {
        const toggleBtns = document.querySelectorAll('.theme-toggle');
        toggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (this.currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
                btn.setAttribute('title', 'Switch to Light Mode');
            } else {
                icon.className = 'fas fa-moon';
                btn.setAttribute('title', 'Switch to Dark Mode');
            }
        });
    }

    setupThemeTransitions() {
        const css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = `
            * {
                transition: background-color 0.3s ease,
                            color 0.3s ease,
                            border-color 0.3s ease,
                            box-shadow 0.3s ease !important;
            }
        `;
        document.head.appendChild(css);
    }

    animateThemeTransition() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${this.currentTheme === 'dark' ? '#0f172a' : '#ffffff'};
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 9999;
        `;

        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
            overlay.style.opacity = '0.5';
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }, 200);
        });
    }

    updateColors() {
        const root = document.documentElement;
        const colors = this.currentTheme === 'dark' ? {
            '--bg-primary': '#0f172a',
            '--bg-secondary': '#1e293b',
            '--bg-card': '#1e293b',
            '--text-primary': '#f8fafc',
            '--text-secondary': '#e2e8f0',
            '--border-light': '#334155',
            '--shadow-color': 'rgba(0, 0, 0, 0.3)',
            '--card-hover-bg': '#2d3748'
        } : {
            '--bg-primary': '#ffffff',
            '--bg-secondary': '#f8fafc',
            '--bg-card': '#ffffff',
            '--text-primary': '#1e293b',
            '--text-secondary': '#475569',
            '--border-light': '#e2e8f0',
            '--shadow-color': 'rgba(0, 0, 0, 0.1)',
            '--card-hover-bg': '#f8fafc'
        };

        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }

    updateMetaThemeColor() {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute(
                'content',
                this.currentTheme === 'dark' ? '#0f172a' : '#ffffff'
            );
        }
    }

    initializeColorSchemes() {
        const lightScheme = {
            primary: '#4f46e5',
            secondary: '#64748b',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#06b6d4'
        };

        const darkScheme = {
            primary: '#818cf8',
            secondary: '#94a3b8',
            success: '#34d399',
            warning: '#fbbf24',
            danger: '#f87171',
            info: '#22d3ee'
        };

        const scheme = this.currentTheme === 'dark' ? darkScheme : lightScheme;
        Object.entries(scheme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    }

    // Public methods
    getTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.currentTheme = theme;
            this.applyTheme(theme);
            localStorage.setItem('theme-preference', 'manual');
        }
    }

    resetToSystemPreference() {
        localStorage.removeItem('theme-preference');
        this.currentTheme = this.systemPreference.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();
export default themeManager;