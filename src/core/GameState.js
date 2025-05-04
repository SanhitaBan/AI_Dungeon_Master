import localforage from 'localforage';

export class GameState {
  constructor() {
    this.currentScene = 'intro';
    this.player = {
      health: 100,
      gold: 0,
      inventory: [],
      reputation: 0
    };
    this.flags = {};
    this.worldState = {
      time: 'morning',
      weather: 'clear',
      crimeRate: 0
    };
    this.history = [];

    this.storage = localforage.createInstance({
      name: 'ai-dungeon-master'
    });

    this.load();
  }

  async load() {
    try {
      const savedState = await this.storage.getItem('gameState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        Object.assign(this, parsedState);
      }
    } catch (error) {
      console.error('Error loading game state:', error);
      // Reset to default state if loading fails
      this.reset();
    }
  }

  async save() {
    try {
      const stateToSave = {
        currentScene: this.currentScene,
        player: this.player,
        flags: this.flags,
        worldState: this.worldState,
        history: this.history
      };
      await this.storage.setItem('gameState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }

  async reset() {
    try {
      await this.storage.clear();
      this.currentScene = 'intro';
      this.player = {
        health: 100,
        gold: 0,
        inventory: [],
        reputation: 0
      };
      this.flags = {};
      this.worldState = {
        time: 'morning',
        weather: 'clear',
        crimeRate: 0
      };
      this.history = [];
    } catch (error) {
      console.error('Error resetting game state:', error);
    }
    this.save();
  }

  changeScene(sceneId) {
    this.currentScene = sceneId;
    this.history.push({
      scene: sceneId,
      timestamp: new Date().toISOString()
    });
  }

  updatePlayerStats(stats) {
    Object.assign(this.player, stats);
  }

  addItem(itemId) {
    if (!this.player.inventory.includes(itemId)) {
      this.player.inventory.push(itemId);
    }
  }

  removeItem(itemId) {
    const index = this.player.inventory.indexOf(itemId);
    if (index !== -1) {
      this.player.inventory.splice(index, 1);
    }
  }

  setFlag(flag, value) {
    this.flags[flag] = value;
  }

  getFlag(flag) {
    return this.flags[flag];
  }

  updateWorldState(state) {
    Object.assign(this.worldState, state);
  }

  addToHistory(event) {
    this.history.push({
      ...event,
      timestamp: new Date().toISOString()
    });
  }

  getState() {
    return { ...this };
  }
}

export default GameState; 