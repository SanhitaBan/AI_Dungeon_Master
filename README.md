# AI Dungeon Master

A modular, client-side emergent RPG with AI-driven narrative. This game features dynamic storytelling, accessibility options, and a rich world to explore.

## 🎮 Features

- **Dynamic Storytelling**: AI-driven narrative with branching paths and emergent gameplay
- **Client-Side Operation**: No server requirements, play directly in your browser
- **Accessibility Features**:
  - High contrast mode
  - Adjustable text size
  - Keyboard navigation
  - Screen reader support
- **Progress Saving**: Automatic save using localStorage
- **Responsive Design**: Play on desktop, tablet, or mobile
- **Modular Architecture**: Easy to expand and customize

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/SanhitaBan/AI_Dungeon_Master.git
   cd AI_Dungeon_Master
   ```

2. Open `index.html` in your web browser to start playing.

## 📁 Project Structure

```
AI_Dungeon_Master/
├── src/
│   ├── core/
│   │   ├── GameState.js      # Manages game state and persistence
│   │   ├── DungeonMaster.js  # Handles narrative and game logic
│   │   └── UIManager.js      # Manages user interface
│   ├── config/
│   │   ├── gameConfig.js     # Game settings and configuration
│   │   ├── scenes.js         # Game scenes and choices
│   │   ├── items.js          # Game items and their properties
│   │   ├── characters.js     # NPCs and player character
│   │   └── events.js         # Game events and triggers
│   ├── styles/
│   │   ├── base.css          # Core styles and variables
│   │   ├── components.css    # UI component styles
│   │   └── themes.css        # Theme variations
│   └── main.js               # Game initialization
├── assets/
│   ├── images/              # Game images and backgrounds
│   └── audio/               # Game music and sound effects
├── index.html              # Main HTML file
└── README.md               # Project documentation
```

## 🛠️ Development

### Adding New Content

To add new content to the game, edit the appropriate configuration files:

1. **Scenes**: Add new scenes to `src/config/scenes.js`
2. **Items**: Add new items to `src/config/items.js`
3. **Characters**: Add new characters to `src/config/characters.js`
4. **Events**: Add new events to `src/config/events.js`

### Example Scene Structure

```javascript
{
    id: 'scene_id',
    text: 'Scene description text',
    background: 'path/to/background.jpg',
    music: 'path/to/music.mp3',
    choices: [
        {
            id: 'choice_id',
            text: 'Choice text',
            requirements: {
                // Optional requirements
                stats: { health: 50 },
                items: ['item_id'],
                quests: ['quest_id'],
                reputation: { npc_id: 2 }
            },
            effects: {
                // Optional effects
                health: 10,
                gold: 50,
                reputation: { npc_id: 1 }
            },
            nextScene: 'next_scene_id'
        }
    ]
}
```

## ✨ Recent Updates

- **UI Improvements**:
  - Game Settings panel fixed to top-right corner
  - Prevention of duplicate event modals
  - Enhanced mobile responsiveness
- **Gameplay Enhancements**:
  - Improved AI narrative generation
  - Expanded character interactions
  - New quest system implementation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- Special thanks to the open-source community for their tools and libraries 