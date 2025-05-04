# Start Screen Troubleshooting Guide

This guide helps diagnose and fix common issues when the game's start screen or buttons aren't working properly.

## Quick Checks

1. **Browser Console**
   - Open Developer Tools (F12 or right-click → Inspect)
   - Check Console tab for error messages
   - Common errors to look for:
     - `Uncaught ReferenceError: X is not defined`
     - `Failed to load resource: net::ERR_FILE_NOT_FOUND`
     - `TypeError: Cannot read property 'X' of null`

2. **File Structure**
   - Verify all required files are present:
     ```
     ├── index.html
     ├── css/
     │   └── styles.css
     ├── js/
     │   └── game.js
     ```
   - Check file permissions are correct
   - Ensure files are in the correct directories

3. **HTML Structure**
   - Verify all required elements exist:
     ```html
     <main id="game-container">
       <div id="narrative-container"></div>
       <div id="choices-container"></div>
       <div id="settings-container">
         <button id="settings-toggle"></button>
         <div id="settings-panel"></div>
       </div>
     </main>
     ```
   - Check IDs match exactly with JavaScript references
   - Verify script tag is at the end of body:
     ```html
     <script src="js/game.js" type="module"></script>
     ```

## Common Issues and Solutions

### 1. Buttons Not Responding

**Symptoms:**
- Clicking buttons does nothing
- No console errors
- Buttons appear but are unresponsive

**Solutions:**
1. Check event listeners are properly attached:
   ```javascript
   // In UIManager constructor
   this.setupEventListeners();
   ```

2. Verify button elements exist before adding listeners:
   ```javascript
   if (this.settingsToggle) {
     this.settingsToggle.addEventListener('click', () => {
       // handler code
     });
   }
   ```

3. Check for CSS issues blocking clicks:
   ```css
   /* Ensure buttons are clickable */
   .choice-button {
     cursor: pointer;
     pointer-events: auto;
   }
   ```

### 2. Game Not Starting

**Symptoms:**
- Blank screen
- No initial scene displayed
- Console shows initialization errors

**Solutions:**
1. Verify game initialization:
   ```javascript
   // Check these are called in correct order
   const gameState = new GameState();
   const dungeonMaster = new DungeonMaster();
   const uiManager = new UIManager();
   ```

2. Check localStorage access:
   ```javascript
   try {
     localStorage.setItem('test', 'test');
     localStorage.removeItem('test');
   } catch (e) {
     console.error('localStorage not available:', e);
   }
   ```

3. Verify scene data is loaded:
   ```javascript
   console.log('Initial scene:', gameState.currentScene);
   console.log('Available scenes:', Object.keys(dungeonMaster.scenes));
   ```

### 3. Styling Issues

**Symptoms:**
- Buttons invisible
- Text not displaying
- Layout broken

**Solutions:**
1. Check CSS file loading:
   ```html
   <link rel="stylesheet" href="css/styles.css">
   ```

2. Verify CSS variables are defined:
   ```css
   :root {
     --primary-bg: #1a1a2e;
     --primary-text: #e6e6e6;
     /* other variables */
   }
   ```

3. Check for CSS specificity issues:
   ```css
   /* Use more specific selectors if needed */
   #game-container .choice-button {
     /* styles */
   }
   ```

## Debugging Steps

1. **Add Console Logs**
   ```javascript
   console.log('Game initialized');
   console.log('Current scene:', gameState.currentScene);
   console.log('UI elements:', {
     narrative: this.narrativeContainer,
     choices: this.choicesContainer,
     settings: this.settingsContainer
   });
   ```

2. **Test Event Handlers**
   ```javascript
   // Add test handler
   document.addEventListener('click', (e) => {
     console.log('Click event:', e.target);
   });
   ```

3. **Check State Updates**
   ```javascript
   // Add state change logging
   const originalSave = GameState.prototype.save;
   GameState.prototype.save = function() {
     console.log('Saving state:', this);
     originalSave.call(this);
   };
   ```

## Browser-Specific Issues

### Chrome
- Check for Content Security Policy (CSP) issues
- Verify module loading works with `type="module"`
- Check for CORS issues if loading from file://

### Firefox
- Check for strict mode compliance
- Verify localStorage access
- Check for ES6 module support

### Safari
- Check for private browsing mode (disables localStorage)
- Verify ES6 features support
- Check for file:// protocol restrictions

## Testing Checklist

1. **Basic Functionality**
   - [ ] Game loads without errors
   - [ ] Initial scene displays
   - [ ] Buttons are clickable
   - [ ] Settings panel toggles

2. **State Management**
   - [ ] Progress saves correctly
   - [ ] Game loads saved state
   - [ ] Reset function works

3. **Accessibility**
   - [ ] Keyboard navigation works
   - [ ] Screen reader announces changes
   - [ ] High contrast mode toggles

4. **Responsive Design**
   - [ ] Layout works on mobile
   - [ ] Text remains readable
   - [ ] Buttons are tappable

## Common Fixes

1. **Missing Elements**
   ```javascript
   // Add element existence check
   if (!document.getElementById('game-container')) {
     console.error('Game container not found');
     return;
   }
   ```

2. **Event Binding**
   ```javascript
   // Use event delegation if elements are dynamic
   document.addEventListener('click', (e) => {
     if (e.target.matches('.choice-button')) {
       // handle choice
     }
   });
   ```

3. **State Initialization**
   ```javascript
   // Add state validation
   if (!gameState || !gameState.currentScene) {
     console.error('Invalid game state');
     gameState = new GameState();
   }
   ```

## Getting Help

If issues persist:
1. Check the browser console for specific error messages
2. Verify all files are properly loaded
3. Test in multiple browsers
4. Create a minimal test case
5. Open an issue with:
   - Browser version
   - Error messages
   - Steps to reproduce
   - Screenshots if relevant 