export const gameConfig = {
    title: 'AI Dungeon Master',
    version: '1.0.0',
    author: 'AI Dungeon Master Contributors',
    description: 'A modular, client-side emergent RPG with AI-driven narrative',
    defaultScene: 'intro',
    maxHealth: 100,
    startingGold: 0,
    startingReputation: 0,
    saveInterval: 5 * 60 * 1000, // 5 minutes
    themes: {
        dark: {
            primary: '#2c2c2e', // macOS dark foreground
            secondary: '#3a3a3c', // macOS dark secondary
            accent: '#0a84ff', // macOS blue accent
            text: '#f5f5f7', // macOS light text
            background: '#1e1e1e' // macOS dark background
        },
        light: {
            primary: '#ffffff', // macOS light foreground
            secondary: '#e5e5ea', // macOS light secondary
            accent: '#0a84ff', // macOS blue accent
            text: '#1e1e1e', // macOS dark text
            background: '#f5f5f7' // macOS light background
        },
        highContrast: {
            primary: '#000000',
            secondary: '#333333',
            accent: '#ffffff',
            text: '#ffffff',
            background: '#000000'
        }
    },
    textSizes: {
        small: {
            sm: '0.75rem',
            md: '0.875rem',
            lg: '1rem',
            xl: '1.25rem'
        },
        medium: {
            sm: '0.875rem',
            md: '1rem',
            lg: '1.25rem',
            xl: '1.5rem'
        },
        large: {
            sm: '1rem',
            md: '1.25rem',
            lg: '1.5rem',
            xl: '2rem'
        }
    },
    accessibility: {
        keyboardNavigation: true,
        screenReaderSupport: true,
        reducedMotion: true,
        highContrast: false,
        textSize: 'medium'
    }
}; 