// Mock browser environment
global.window = {
    localStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
    }
};

global.document = {
    getElementById: (id) => ({
        textContent: '',
        innerHTML: '',
        style: {},
        classList: {
            contains: () => false,
            add: () => {},
            remove: () => {},
            toggle: () => {}
        },
        hasAttribute: () => false,
        setAttribute: () => {},
        getAttribute: () => null,
        addEventListener: () => {},
        appendChild: () => {},
        querySelector: () => ({
            textContent: '',
            appendChild: () => {}
        })
    }),
    body: {
        classList: {
            contains: () => false,
            add: () => {},
            remove: () => {}
        },
        appendChild: () => {}
    },
    createElement: () => ({
        className: '',
        textContent: '',
        innerHTML: '',
        style: {},
        classList: {
            add: () => {},
            remove: () => {}
        },
        addEventListener: () => {},
        appendChild: () => {},
        querySelector: () => ({
            appendChild: () => {}
        }),
        remove: () => {}
    }),
    addEventListener: () => {}
};

import { GameState } from '../core/GameState.js';
import { DungeonMaster } from '../core/DungeonMaster.js';
import { UIManager } from '../core/UIManager.js';
import { gameConfig } from '../config/gameConfig.js';
import { scenes } from '../config/scenes.js';
import { items } from '../config/items.js';
import { characters } from '../config/characters.js';
import { events } from '../config/events.js';

// Test results container
const testResults = {
    total: 0,
    passed: 0,
    failed: 0,
    errors: [],
    details: []
};

// Simple assertion functions
function expect(actual) {
    return {
        toBe: (expected) => {
            if (actual !== expected) {
                throw new Error(`Expected ${expected} but got ${actual}`);
            }
        },
        toBeDefined: () => {
            if (actual === undefined) {
                throw new Error('Expected value to be defined');
            }
        },
        toEqual: (expected) => {
            const actualStr = JSON.stringify(actual);
            const expectedStr = JSON.stringify(expected);
            if (actualStr !== expectedStr) {
                throw new Error(`Expected ${expectedStr} but got ${actualStr}`);
            }
        },
        toContain: (item) => {
            if (!actual.includes(item)) {
                throw new Error(`Expected array to contain ${item}`);
            }
        }
    };
}

// Helper function to run a test
async function runTest(name, testFn) {
    testResults.total++;
    try {
        await testFn();
        testResults.passed++;
        console.log(`✓ ${name}`);
        testResults.details.push({ name, status: 'passed' });
    } catch (error) {
        testResults.failed++;
        console.log(`✗ ${name}`);
        console.log(`  ${error.message}`);
        testResults.errors.push({ name, error: error.message });
        testResults.details.push({ name, status: 'failed', error: error.message });
    }
}

// GameState Tests
async function runGameStateTests() {
    console.log('\nRunning GameState Tests:');
    const gameState = new GameState();

    await runTest('GameState initialization', () => {
        expect(gameState.currentScene).toBe('intro');
        expect(gameState.player.health).toBe(100);
        expect(gameState.player.gold).toBe(0);
        expect(gameState.player.inventory).toEqual([]);
        expect(gameState.player.reputation).toBe(0);
    });

    await runTest('GameState state management', async () => {
        gameState.player.health = 80;
        gameState.player.gold = 50;
        gameState.player.inventory.push('health_potion');
        gameState.player.reputation = 5;
        gameState.currentScene = 'market';

        expect(gameState.player.health).toBe(80);
        expect(gameState.player.gold).toBe(50);
        expect(gameState.player.inventory).toContain('health_potion');
        expect(gameState.player.reputation).toBe(5);
        expect(gameState.currentScene).toBe('market');
    });

    await runTest('GameState flags', () => {
        gameState.setFlag('quest.started', true);
        expect(gameState.getFlag('quest.started')).toBe(true);
    });
}

// DungeonMaster Tests
async function runDungeonMasterTests() {
    console.log('\nRunning DungeonMaster Tests:');
    const gameState = new GameState();
    const dungeonMaster = new DungeonMaster(gameState);

    await runTest('DungeonMaster scene management', () => {
        const scene = dungeonMaster.getCurrentScene();
        expect(scene).toBeDefined();
        expect(scene.id).toBe('intro');
    });

    await runTest('DungeonMaster item management', () => {
        const item = dungeonMaster.getItem('health_potion');
        expect(item).toBeDefined();
        expect(item.type).toBe('consumable');
    });

    await runTest('DungeonMaster character management', () => {
        const character = dungeonMaster.getCharacter('merchant');
        expect(character).toBeDefined();
        expect(character.type).toBe('npc');
    });
}

// UIManager Tests
async function runUIManagerTests() {
    console.log('\nRunning UIManager Tests:');
    const gameState = new GameState();
    const dungeonMaster = new DungeonMaster(gameState);
    const uiManager = new UIManager(gameState, dungeonMaster);

    await runTest('UIManager initialization', () => {
        expect(uiManager.gameState).toBeDefined();
        expect(uiManager.dungeonMaster).toBeDefined();
    });

    await runTest('UIManager settings', () => {
        uiManager.toggleHighContrast(true);
        uiManager.setTextSize('large');
        // These tests pass as long as no errors are thrown
    });

    await runTest('UIManager UI update', () => {
        uiManager.updateUI();
        // These tests pass as long as no errors are thrown
    });
}

// Integration Tests
async function runIntegrationTests() {
    console.log('\nRunning Integration Tests:');
    const gameState = new GameState();
    const dungeonMaster = new DungeonMaster(gameState);

    await runTest('Game flow', () => {
        expect(gameState.currentScene).toBe('intro');
        
        // Simulate player actions
        gameState.player.inventory.push('gold_coin');
        gameState.setFlag('reputation.merchant', 5);
        
        expect(gameState.player.inventory).toContain('gold_coin');
        expect(gameState.getFlag('reputation.merchant')).toBe(5);
    });
}

// Run all tests
async function runAllTests() {
    console.log('Starting test suite...\n');

    await runGameStateTests();
    await runDungeonMasterTests();
    await runUIManagerTests();
    await runIntegrationTests();

    // Print results
    console.log('\nTest Results:');
    console.log(`Total Tests: ${testResults.total}`);
    console.log(`Passed: ${testResults.passed}`);
    console.log(`Failed: ${testResults.failed}`);
    console.log(`Pass Rate: ${((testResults.passed / testResults.total) * 100).toFixed(2)}%`);

    if (testResults.failed > 0) {
        console.log('\nFailed Tests:');
        testResults.errors.forEach(({ name, error }) => {
            console.log(`\n${name}:`);
            console.log(error);
        });
    }

    process.exit(testResults.failed > 0 ? 1 : 0);
}

// Run the tests
runAllTests().catch(console.error); 