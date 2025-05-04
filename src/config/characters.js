export const characters = {
    player: {
        id: 'player',
        name: 'Adventurer',
        type: 'player',
        description: 'A brave soul seeking adventure and fortune.',
        stats: {
            health: 100,
            gold: 0,
            reputation: 0
        }
    },
    cloaked_figure: {
        id: 'cloaked_figure',
        name: 'Mysterious Figure',
        type: 'npc',
        description: 'A shadowy figure wearing a dark cloak. Their identity is unknown.',
        location: 'alley',
        dialogue: {
            default: 'The figure remains silent, watching you carefully.',
            friendly: 'The figure nods slightly in acknowledgment.',
            hostile: 'The figure draws a dagger and prepares to attack.'
        }
    },
    merchant: {
        id: 'merchant',
        name: 'Market Merchant',
        type: 'npc',
        description: 'A shrewd merchant with a wide variety of goods for sale.',
        location: 'market',
        dialogue: {
            default: 'Welcome to my stall! What can I interest you in today?',
            friendly: 'For you, my friend, I have special prices!',
            hostile: 'If you\'re not buying, please move along.'
        },
        inventory: ['health_potion', 'torch', 'cloak', 'dagger']
    },
    barkeep: {
        id: 'barkeep',
        name: 'Tavern Keeper',
        type: 'npc',
        description: 'A friendly barkeep who knows all the local gossip.',
        location: 'tavern',
        dialogue: {
            default: 'What\'ll it be, stranger?',
            friendly: 'Ah, you\'re back! The usual?',
            hostile: 'I don\'t serve trouble-makers here.'
        }
    },
    bard: {
        id: 'bard',
        name: 'Traveling Bard',
        type: 'npc',
        description: 'A talented musician who entertains the tavern patrons.',
        location: 'tavern',
        dialogue: {
            default: 'Would you like to hear a song?',
            friendly: 'For you, I\'ll play my best ballad!',
            hostile: 'I don\'t perform for those who don\'t appreciate music.'
        }
    },
    guard: {
        id: 'guard',
        name: 'Town Guard',
        type: 'npc',
        description: 'A vigilant guard keeping watch over the town.',
        location: 'intro',
        dialogue: {
            default: 'Move along, citizen.',
            friendly: 'Everything seems quiet today.',
            hostile: 'You\'re causing a disturbance!'
        }
    },
    blacksmith: {
        id: 'blacksmith',
        name: 'Village Blacksmith',
        type: 'npc',
        description: 'A skilled craftsman who forges weapons and armor.',
        location: 'market',
        dialogue: {
            default: 'Need something forged?',
            friendly: 'I\'ve got some new pieces you might like.',
            hostile: 'I don\'t have time for idle chatter.'
        },
        inventory: ['dagger', 'cloak']
    },
    beggar: {
        id: 'beggar',
        name: 'Town Beggar',
        type: 'npc',
        description: 'A poor soul seeking alms from passersby.',
        location: 'intro',
        dialogue: {
            default: 'Spare a coin for a hungry man?',
            friendly: 'Bless you, kind soul!',
            hostile: 'You\'ll regret this!'
        }
    }
}; 