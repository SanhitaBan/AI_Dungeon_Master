import { GameState } from './core/GameState.js';
import { DungeonMaster } from './core/DungeonMaster.js';
import { UIManager } from './core/UIManager.js';

class Game {
  constructor() {
    this.gameState = new GameState();
    this.dungeonMaster = new DungeonMaster(this.gameState);
    this.uiManager = new UIManager(this.gameState, this.dungeonMaster);
  }

  async init() {
    try {
      // Show loading screen
      this.uiManager.showLoading();

      // Load game state
      await this.gameState.load();

      // Initialize UI
      this.uiManager.updateUI();

      // Set up auto-save
      setInterval(() => {
        this.gameState.save();
      }, 5 * 60 * 1000); // Save every 5 minutes

      // Handle errors
      window.addEventListener('error', (event) => {
        this.uiManager.showError('An unexpected error occurred. Please reload the game.');
        console.error('Game error:', event.error);
      });

      // Save on page unload
      window.addEventListener('beforeunload', () => {
        this.gameState.save();
      });
    } catch (error) {
      this.uiManager.showError('Failed to initialize the game. Please reload the page.');
      console.error('Initialization error:', error);
    }
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.init();
}); 