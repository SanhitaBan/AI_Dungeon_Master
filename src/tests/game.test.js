import { GameState } from '../core/GameState.js';
import { DungeonMaster } from '../core/DungeonMaster.js';
import { UIManager } from '../core/UIManager.js';
import { gameConfig } from '../config/gameConfig.js';
import { scenes } from '../config/scenes.js';
import { items } from '../config/items.js';
import { characters } from '../config/characters.js';
import { events } from '../config/events.js';

describe('Game Core Tests', () => {
    let gameState;
    let dungeonMaster;
    let uiManager;

    beforeEach(() => {
        // Reset localStorage before each test
        localStorage.clear();
        
        // Initialize game components
        gameState = new GameState();
        dungeonMaster = new DungeonMaster(gameState);
        uiManager = new UIManager(gameState, dungeonMaster);
    });

    describe('GameState Tests', () => {
        test('should initialize with default values', () => {
            expect(gameState.currentScene).toBe('intro');
            expect(gameState.player.health).toBe(100);
            expect(gameState.player.gold).toBe(0);
            expect(gameState.player.inventory).toEqual([]);
            expect(gameState.player.reputation).toBe(0);
        });

        test('should save and load game state', async () => {
            // Modify state
            gameState.player.health = 80;
            gameState.player.gold = 50;
            gameState.player.inventory.push('health_potion');
            gameState.player.reputation = 5;
            gameState.currentScene = 'market';

            // Save state
            await gameState.save();

            // Create new instance and load
            const newGameState = new GameState();
            await newGameState.load();

            // Verify loaded state
            expect(newGameState.player.health).toBe(80);
            expect(newGameState.player.gold).toBe(50);
            expect(newGameState.player.inventory).toContain('health_potion');
            expect(newGameState.player.reputation).toBe(5);
            expect(newGameState.currentScene).toBe('market');
        });

        test('should reset game state', async () => {
            // Modify state
            gameState.player.health = 50;
            gameState.player.gold = 100;
            gameState.currentScene = 'market';

            // Reset state
            await gameState.reset();

            // Verify reset values
            expect(gameState.player.health).toBe(100);
            expect(gameState.player.gold).toBe(0);
            expect(gameState.currentScene).toBe('intro');
        });
    });

    describe('DungeonMaster Tests', () => {
        test('should get current scene', () => {
            const scene = dungeonMaster.getCurrentScene();
            expect(scene).toBeDefined();
            expect(scene.id).toBe('intro');
        });

        test('should check requirements correctly', () => {
            const requirements = {
                stats: { health: 50 },
                items: ['health_potion'],
                reputation: { tavern: 2 }
            };

            // Test with insufficient stats
            expect(dungeonMaster.checkRequirements(requirements)).toBe(false);

            // Test with sufficient stats
            gameState.player.health = 60;
            gameState.player.inventory.push('health_potion');
            gameState.setFlag('reputation.tavern', 3);
            expect(dungeonMaster.checkRequirements(requirements)).toBe(true);
        });

        test('should apply effects correctly', () => {
            const effects = {
                health: 10,
                gold: 50,
                reputation: { tavern: 2 }
            };

            dungeonMaster.applyEffects(effects);

            expect(gameState.player.health).toBe(110);
            expect(gameState.player.gold).toBe(50);
            expect(gameState.getFlag('reputation.tavern')).toBe(2);
        });

        test('should process choices correctly', () => {
            const choiceId = 'approach_barkeep';
            const result = dungeonMaster.processChoice(choiceId);

            expect(result).toBe(true);
            expect(gameState.currentScene).toBe('barkeep_dialogue');
            expect(gameState.getFlag('reputation.tavern')).toBe(5);
        });
    });

    describe('UIManager Tests', () => {
        test('should update UI with current scene', () => {
            uiManager.updateUI();

            const narrativeContainer = document.getElementById('narrative-container');
            const choicesContainer = document.getElementById('choices-container');

            expect(narrativeContainer).toBeDefined();
            expect(choicesContainer).toBeDefined();
            expect(narrativeContainer.textContent).toContain('tavern');
        });

        test('should handle settings toggles', () => {
            // Test high contrast toggle
            uiManager.toggleHighContrast(true);
            expect(document.body.classList.contains('high-contrast')).toBe(true);

            // Test text size toggle
            uiManager.setTextSize('large');
            expect(document.body.classList.contains('text-large')).toBe(true);
        });

        test('should show and hide loading screen', () => {
            uiManager.showLoading();
            expect(document.getElementById('loading-screen').classList.contains('hidden')).toBe(false);

            uiManager.hideLoading();
            expect(document.getElementById('loading-screen').classList.contains('hidden')).toBe(true);
        });
    });

    describe('Integration Tests', () => {
        test('should handle complete game flow', async () => {
            // Start game
            expect(gameState.currentScene).toBe('intro');

            // Make a choice
            dungeonMaster.processChoice('approach_barkeep');
            expect(gameState.currentScene).toBe('barkeep_dialogue');
            expect(gameState.getFlag('reputation.tavern')).toBe(5);

            // Save game
            await gameState.save();

            // Load game
            const newGameState = new GameState();
            await newGameState.load();

            // Verify loaded state
            expect(newGameState.currentScene).toBe('barkeep_dialogue');
            expect(newGameState.getFlag('reputation.tavern')).toBe(5);
        });
    });
}); 