// Game state management
class GameState {
    constructor() {
        this.currentScene = 'start';
        this.playerState = {
            health: 5,
            inventory: [],
            flags: {}
        };
        this.dmState = {
            mood: 'neutral',
            suspicion: 0
        };
        this.history = [];
    }

    save() {
        const saveData = {
            currentScene: this.currentScene,
            playerState: this.playerState,
            dmState: this.dmState,
            history: this.history,
            version: '1.0.0',
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('AIDungeonMaster_Save', JSON.stringify(saveData));
    }

    load() {
        const saveData = localStorage.getItem('AIDungeonMaster_Save');
        if (saveData) {
            const parsed = JSON.parse(saveData);
            this.currentScene = parsed.currentScene;
            this.playerState = parsed.playerState;
            this.dmState = parsed.dmState;
            this.history = parsed.history;
            return true;
        }
        return false;
    }

    reset() {
        this.currentScene = 'start';
        this.playerState = {
            health: 5,
            inventory: [],
            flags: {}
        };
        this.dmState = {
            mood: 'neutral',
            suspicion: 0
        };
        this.history = [];
        localStorage.removeItem('AIDungeonMaster_Save');
    }
}

// Dungeon Master AI logic
class DungeonMaster {
    constructor() {
        this.scenes = {
            start: {
                text: "You find yourself in a dimly lit chamber. The walls are covered in strange runes that pulse with a faint blue light. A single door stands before you, slightly ajar.",
                choices: [
                    { text: "Examine the runes", next: "examine_runes" },
                    { text: "Approach the door", next: "door_approach" },
                    { text: "Search the chamber", next: "search_chamber" }
                ]
            },
            examine_runes: {
                text: "As you study the runes, they begin to shift and change. A pattern emerges - it seems to be a warning about something beyond the door.",
                choices: [
                    { text: "Proceed through the door anyway", next: "door_approach" },
                    { text: "Look for more clues", next: "search_chamber" }
                ]
            },
            // Add more scenes here
        };
    }

    getScene(sceneId) {
        return this.scenes[sceneId] || this.scenes.start;
    }

    updateDMState(playerChoice) {
        // Simple state update logic - can be expanded
        if (playerChoice.includes('aggressive')) {
            this.dmState.suspicion += 1;
        } else if (playerChoice.includes('cautious')) {
            this.dmState.suspicion -= 1;
        }
    }
}

// UI Manager
class UIManager {
    constructor() {
        this.narrativeContainer = document.getElementById('narrative-container');
        this.choicesContainer = document.getElementById('choices-container');
        this.settingsToggle = document.getElementById('settings-toggle');
        this.settingsPanel = document.getElementById('settings-panel');
        this.highContrastToggle = document.getElementById('high-contrast-toggle');
        this.textSizeToggle = document.getElementById('text-size-toggle');
        this.resetButton = document.getElementById('reset-game');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.settingsToggle.addEventListener('click', () => {
            const isExpanded = this.settingsPanel.hidden;
            this.settingsPanel.hidden = !isExpanded;
            this.settingsToggle.setAttribute('aria-expanded', isExpanded);
        });

        this.highContrastToggle.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });

        this.textSizeToggle.addEventListener('click', () => {
            document.body.classList.toggle('large-text');
        });

        this.resetButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
                gameState.reset();
                this.displayScene(gameState.currentScene);
            }
        });
    }

    displayScene(sceneId) {
        const scene = dungeonMaster.getScene(sceneId);
        
        // Update narrative
        this.narrativeContainer.textContent = scene.text;
        
        // Clear and update choices
        this.choicesContainer.innerHTML = '';
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.addEventListener('click', () => this.handleChoice(choice));
            this.choicesContainer.appendChild(button);
        });

        // Focus first choice for keyboard navigation
        const firstChoice = this.choicesContainer.querySelector('.choice-button');
        if (firstChoice) {
            firstChoice.focus();
        }
    }

    handleChoice(choice) {
        gameState.history.push({
            scene: gameState.currentScene,
            choice: choice.text
        });
        
        gameState.currentScene = choice.next;
        dungeonMaster.updateDMState(choice.text);
        gameState.save();
        
        this.displayScene(gameState.currentScene);
    }
}

// Initialize the game
const gameState = new GameState();
const dungeonMaster = new DungeonMaster();
const uiManager = new UIManager();

// Load saved game or start new
if (!gameState.load()) {
    gameState.save();
}

// Display initial scene
uiManager.displayScene(gameState.currentScene); 