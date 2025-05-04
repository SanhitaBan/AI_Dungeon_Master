# AI Dungeon Master

A modular, client-side emergent RPG with AI-driven narrative. This game features dynamic storytelling, accessibility options, and a rich world to explore.

## Features

- Dynamic storytelling with branching narratives
- Client-side operation with no server requirements
- Accessibility features including:
  - High contrast mode
  - Adjustable text size
  - Keyboard navigation
  - Screen reader support
- Progress saving using localStorage
- Responsive design for mobile devices
- Modular architecture for easy expansion

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-dungeon-master.git
   cd ai-dungeon-master
   ```

2. Open `index.html` in your web browser to start playing.

## Project Structure

```
ai-dungeon-master/
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

## Development

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

## Recent UI Improvements

- The Game Settings panel is now always fixed to the top-right corner for easier access.
- Duplicate event modals are prevented; only one set of event choices will appear at a time.

## Troubleshooting

### CORS or file:// Errors
If you see errors about CORS or resources not loading when opening the game with `file://`, you need to use a local development server. This is required for modern JavaScript modules and browser security.

**Recommended ways to run locally:**
- **Vite (recommended, already in devDependencies):**
  ```sh
  npx vite
  ```
  Then open the provided http://localhost:5173 URL in your browser.
- **Python SimpleHTTPServer:**
  ```sh
  python3 -m http.server 8000
  ```
  Then open http://localhost:8000 in your browser.
- **Node http-server:**
  ```sh
  npm install -g http-server
  http-server .
  ```

## Accessibility

The game is designed with accessibility in mind:

- Semantic HTML structure
- ARIA attributes for screen readers
- Keyboard navigation support
- High contrast mode
- Adjustable text size
- Reduced motion options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic text-based adventure games
- Built with modern web technologies
- Thanks to all contributors who have helped shape this project 