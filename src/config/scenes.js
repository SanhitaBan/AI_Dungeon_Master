export const scenes = {
    intro: {
        id: 'intro',
        text: 'You find yourself in a bustling town square. The air is filled with the sounds of merchants hawking their wares and townsfolk going about their daily business. A mysterious figure in a dark cloak catches your eye as they slip into a nearby alley.',
        background: 'assets/images/town_square.jpg',
        music: 'assets/audio/town_theme.mp3',
        choices: [
            {
                id: 'follow_cloaked_figure',
                text: 'Follow the cloaked figure into the alley',
                requirements: null,
                effects: null,
                nextScene: 'alley'
            },
            {
                id: 'explore_market',
                text: 'Explore the market square',
                requirements: null,
                effects: null,
                nextScene: 'market'
            },
            {
                id: 'visit_tavern',
                text: 'Visit the local tavern',
                requirements: null,
                effects: null,
                nextScene: 'tavern'
            }
        ]
    },
    alley: {
        id: 'alley',
        text: 'The alley is dimly lit and narrow. The cloaked figure has disappeared, but you notice a small door slightly ajar. A faint light spills out from within.',
        background: 'assets/images/dark_alley.jpg',
        music: 'assets/audio/suspense_theme.mp3',
        choices: [
            {
                id: 'enter_door',
                text: 'Enter through the door',
                requirements: null,
                effects: null,
                nextScene: 'secret_room'
            },
            {
                id: 'return_to_square',
                text: 'Return to the town square',
                requirements: null,
                effects: null,
                nextScene: 'intro'
            }
        ]
    },
    market: {
        id: 'market',
        text: 'The market is alive with activity. Merchants display their goods on colorful stalls. You notice a crowd gathered around a particular stall where a merchant is demonstrating a strange artifact.',
        background: 'assets/images/market.jpg',
        music: 'assets/audio/market_theme.mp3',
        choices: [
            {
                id: 'inspect_artifact',
                text: 'Inspect the strange artifact',
                requirements: null,
                effects: null,
                nextScene: 'artifact_stall'
            },
            {
                id: 'talk_to_merchant',
                text: 'Talk to the merchant',
                requirements: null,
                effects: null,
                nextScene: 'merchant_conversation'
            },
            {
                id: 'return_to_square',
                text: 'Return to the town square',
                requirements: null,
                effects: null,
                nextScene: 'intro'
            }
        ]
    },
    tavern: {
        id: 'tavern',
        text: 'The tavern is warm and inviting, filled with the smell of roasted meat and ale. Patrons laugh and share stories. A bard plays a lively tune in the corner.',
        background: 'assets/images/tavern.jpg',
        music: 'assets/audio/tavern_theme.mp3',
        choices: [
            {
                id: 'talk_to_barkeep',
                text: 'Talk to the barkeep',
                requirements: null,
                effects: null,
                nextScene: 'barkeep_conversation'
            },
            {
                id: 'listen_to_bard',
                text: 'Listen to the bard\'s song',
                requirements: null,
                effects: null,
                nextScene: 'bard_song'
            },
            {
                id: 'return_to_square',
                text: 'Return to the town square',
                requirements: null,
                effects: null,
                nextScene: 'intro'
            }
        ]
    }
}; 