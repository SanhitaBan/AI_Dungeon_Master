import { gameConfig } from '../config/gameConfig.js';
import { scenes } from '../config/scenes.js';
import { items } from '../config/items.js';
import { characters } from '../config/characters.js';
import { events } from '../config/events.js';

export class DungeonMaster {
    constructor(gameState) {
        this.gameState = gameState;
        this.config = gameConfig;
    }

    getCurrentScene() {
        return this.getScene(this.gameState.currentScene);
    }

    getScene(sceneId) {
        return scenes[sceneId] || null;
    }

    getItem(itemId) {
        return items[itemId] || null;
    }

    getCharacter(characterId) {
        return characters[characterId] || null;
    }

    getEvent(eventId) {
        return events[eventId] || null;
    }

    checkRequirements(requirements) {
        if (!requirements) return true;

        const { stats, items, quests, reputation } = requirements;

        if (stats) {
            for (const [stat, value] of Object.entries(stats)) {
                if (this.gameState.player[stat] < value) return false;
            }
        }

        if (items) {
            for (const itemId of items) {
                if (!this.gameState.player.inventory.includes(itemId)) return false;
            }
        }

        if (quests) {
            for (const questId of quests) {
                if (!this.gameState.flags.completedQuests?.includes(questId)) return false;
            }
        }

        if (reputation) {
            for (const [npcId, minRep] of Object.entries(reputation)) {
                if ((this.gameState.flags.reputation?.[npcId] || 0) < minRep) return false;
            }
        }

        return true;
    }

    applyEffects(effects) {
        if (!effects) return;

        const { health, gold, reputation, quests } = effects;

        if (health) {
            this.gameState.player.health = Math.max(0, 
                Math.min(100, this.gameState.player.health + health)
            );
        }

        if (gold) {
            this.gameState.player.gold = Math.max(0, 
                this.gameState.player.gold + gold
            );
        }

        if (reputation) {
            for (const [npcId, amount] of Object.entries(reputation)) {
                const currentRep = this.gameState.flags.reputation?.[npcId] || 0;
                this.gameState.setFlag(`reputation.${npcId}`, currentRep + amount);
            }
        }

        if (quests) {
            for (const questId of quests) {
                this.gameState.addToHistory({
                    type: 'quest',
                    questId,
                    action: 'completed'
                });
            }
        }
    }

    processChoice(choiceId) {
        const scene = this.getCurrentScene();
        const choice = scene.choices.find(c => c.id === choiceId);

        if (!choice) return false;

        if (!this.checkRequirements(choice.requirements)) {
            return false;
        }

        this.applyEffects(choice.effects);

        if (choice.nextScene) {
            this.gameState.changeScene(choice.nextScene);
        }

        return true;
    }

    checkEvents() {
        const activeEvents = [];
        const currentScene = this.getCurrentScene();

        for (const [eventId, event] of Object.entries(events)) {
            if (event.trigger === 'scene' && event.sceneId === currentScene.id) {
                if (this.checkRequirements(event.conditions)) {
                    activeEvents.push(event);
                }
            }
        }

        return activeEvents;
    }

    generateNarrative(sceneId) {
        const scene = this.getScene(sceneId);
        if (!scene || !scene.text || !scene.choices || scene.choices.length === 0) {
            console.warn('[DungeonMaster] Scene missing or empty:', sceneId);
            return {
                text: 'The story seems to have reached an unknown place. Please restart or return to the beginning.',
                background: '',
                music: '',
                choices: [
                    {
                        id: 'restart_game',
                        text: 'Restart Game',
                        available: true
                    }
                ],
                events: []
            };
        }

        const activeEvents = this.checkEvents();
        const narrative = {
            text: scene.text,
            background: scene.background,
            music: scene.music,
            choices: scene.choices.map(choice => ({
                id: choice.id,
                text: choice.text,
                available: this.checkRequirements(choice.requirements)
            })),
            events: activeEvents.map(event => ({
                id: event.id,
                text: event.text,
                choices: event.choices?.map(choice => ({
                    id: choice.id,
                    text: choice.text,
                    available: this.checkRequirements(choice.requirements)
                }))
            }))
        };

        return narrative;
    }
} 