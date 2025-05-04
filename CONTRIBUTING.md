# Contributing to AI Dungeon Master

Thank you for your interest in contributing to AI Dungeon Master! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## How to Contribute

1. **Fork** the repository
2. **Clone** your fork
3. Create a new **branch** for your feature/fix
4. Make your changes
5. **Test** your changes
6. Submit a **Pull Request**

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-dungeon-master.git
   ```

2. Open `index.html` in your browser to test changes

## Project Structure

- `index.html` - Main HTML file
- `css/styles.css` - Stylesheet
- `js/game.js` - Core game logic
- `README.md` - Project documentation
- `CONTRIBUTING.md` - This file

## Coding Standards

### JavaScript

- Use ES6+ features
- Follow the existing code style
- Add comments for complex logic
- Keep functions focused and small
- Use meaningful variable names

### HTML

- Use semantic HTML elements
- Include appropriate ARIA attributes
- Maintain accessibility features
- Keep the structure clean and organized

### CSS

- Use CSS variables for theming
- Follow BEM naming convention
- Keep selectors specific
- Maintain responsive design
- Document complex styles

## Adding New Content

When adding new scenes or narrative content:

1. Add new scenes to the `scenes` object in `DungeonMaster` class
2. Follow the existing scene structure
3. Ensure choices lead to valid scenes
4. Test all possible paths
5. Maintain accessibility

Example scene structure:
```javascript
sceneId: {
    text: "Scene description text",
    choices: [
        { text: "Choice text", next: "nextSceneId" }
    ]
}
```

## Testing

Before submitting a pull request:

1. Test your changes in multiple browsers
2. Verify accessibility features work
3. Test keyboard navigation
4. Check responsive design
5. Ensure localStorage functionality works

## Pull Request Process

1. Update the README.md if needed
2. Document any new features
3. Include tests if applicable
4. Describe your changes in the PR
5. Reference any related issues

## Reporting Issues

When reporting issues:

1. Use the issue template
2. Describe the problem clearly
3. Include steps to reproduce
4. Specify browser and OS
5. Add screenshots if relevant

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

Thank you for helping make AI Dungeon Master better! 