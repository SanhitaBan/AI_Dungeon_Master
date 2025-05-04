export class UIManager {
  constructor(gameState, dungeonMaster) {
    this.gameState = gameState;
    this.dungeonMaster = dungeonMaster;

    // Only initialize DOM elements if we're in a browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.initializeDOMElements();
      this.setupEventListeners();
    }
  }

  initializeDOMElements() {
    // Cache DOM elements
    this.gameContainer = document.getElementById('game-container');
    this.narrativeContainer = document.getElementById('narrative-container');
    this.choicesContainer = document.getElementById('choices-container');
    this.settingsContainer = document.getElementById('settings-container');
    this.settingsPanel = document.getElementById('settings-panel');
    this.settingsToggle = document.getElementById('settings-toggle');
    this.highContrastToggle = document.getElementById('high-contrast-toggle');
    this.textSizeToggle = document.getElementById('text-size-toggle');
    this.resetButton = document.getElementById('reset-button');
    this.loadingScreen = document.getElementById('loading-screen');
    this.errorScreen = document.getElementById('error-screen');
  }

  setupEventListeners() {
    if (!this.settingsToggle) return;

    // Settings toggle
    this.settingsToggle.addEventListener('click', () => this.toggleSettings());

    // High contrast toggle
    this.highContrastToggle.addEventListener('change', (e) => {
      this.toggleHighContrast(e.target.checked);
    });

    // Text size toggle
    this.textSizeToggle.addEventListener('change', (e) => {
      this.setTextSize(e.target.value);
    });

    // Reset button
    this.resetButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
        this.gameState.reset();
        this.updateUI();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.settingsPanel.hasAttribute('aria-hidden')) {
        this.toggleSettings();
      }
    });
  }

  toggleSettings() {
    if (!this.settingsToggle || !this.settingsPanel) return;
    const isExpanded = this.settingsToggle.getAttribute('aria-expanded') === 'true';
    this.settingsToggle.setAttribute('aria-expanded', !isExpanded);
    this.settingsPanel.setAttribute('aria-hidden', isExpanded);
  }

  toggleHighContrast(enabled) {
    if (typeof document === 'undefined') return;
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }

  setTextSize(size) {
    if (typeof document === 'undefined') return;
    document.body.classList.remove('text-small', 'text-large');
    if (size !== 'medium') {
      document.body.classList.add(`text-${size}`);
    }
  }

  showLoading() {
    if (!this.loadingScreen) return;
    this.loadingScreen.classList.remove('hidden');
  }

  hideLoading() {
    if (!this.loadingScreen) return;
    this.loadingScreen.classList.add('hidden');
  }

  showError(message) {
    if (!this.errorScreen) return;
    this.errorScreen.querySelector('p').textContent = message;
    this.errorScreen.classList.remove('hidden');
  }

  hideError() {
    if (!this.errorScreen) return;
    this.errorScreen.classList.add('hidden');
  }

  updateUI() {
    if (typeof document === 'undefined') return;

    const narrative = this.dungeonMaster.generateNarrative(this.gameState.currentScene);
    if (!narrative) {
      this.showError('Failed to load game content');
      return;
    }

    // Update narrative
    if (this.narrativeContainer) {
      this.narrativeContainer.innerHTML = narrative.text;
    }

    // Update choices
    if (this.choicesContainer) {
      this.choicesContainer.innerHTML = '';
      narrative.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.disabled = !choice.available;
        button.addEventListener('click', () => this.handleChoice(choice.id));
        this.choicesContainer.appendChild(button);
      });
    }

    // Update background
    if (this.gameContainer && narrative.background) {
      this.gameContainer.style.backgroundImage = `url(${narrative.background})`;
    }

    // Update music
    if (narrative.music) {
      // Implement music playback logic here
    }

    // Handle events
    if (narrative.events.length > 0) {
      this.handleEvents(narrative.events);
    }

    this.hideLoading();
  }

  handleChoice(choiceId) {
    if (choiceId === 'restart_game') {
      this.gameState.reset();
      this.updateUI();
      return;
    }
    if (this.dungeonMaster.processChoice(choiceId)) {
      this.updateUI();
    }
  }

  handleEvents(events) {
    if (typeof document === 'undefined') return;

    // Remove any existing event modals
    document.querySelectorAll('.event-modal').forEach(modal => modal.remove());

    events.forEach(event => {
      // Create event modal
      const modal = document.createElement('div');
      modal.className = 'event-modal';
      modal.innerHTML = `
        <div class="event-content">
          <h2>${event.text}</h2>
          <div class="event-choices"></div>
        </div>
      `;

      // Add event choices
      const choicesContainer = modal.querySelector('.event-choices');
      event.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.disabled = !choice.available;
        button.addEventListener('click', () => {
          this.handleChoice(choice.id);
          modal.remove();
        });
        choicesContainer.appendChild(button);
      });

      // Add modal to document
      document.body.appendChild(modal);
    });
  }
} 