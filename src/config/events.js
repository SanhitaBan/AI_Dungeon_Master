export const events = {
    intro_event: {
        id: 'intro_event',
        name: 'Town Square Encounter',
        type: 'story',
        trigger: 'scene',
        sceneId: 'intro',
        conditions: {
            firstVisit: true
        },
        text: 'As you take in the sights of the town square, a guard approaches you with a stern look.',
        choices: [
            {
                id: 'greet_guard',
                text: 'Greet the guard politely',
                requirements: null,
                effects: {
                    reputation: 1
                }
            },
            {
                id: 'ignore_guard',
                text: 'Ignore the guard and continue exploring',
                requirements: null,
                effects: {
                    reputation: -1
                }
            }
        ]
    },
    market_day: {
        id: 'market_day',
        name: 'Market Day',
        type: 'world',
        trigger: 'time',
        time: 'morning',
        conditions: {
            location: 'market'
        },
        text: 'It\'s market day! The square is bustling with merchants and shoppers. Prices are lower than usual.',
        effects: {
            merchant_prices: -0.2,
            crowd_density: 'high'
        }
    },
    tavern_fight: {
        id: 'tavern_fight',
        name: 'Tavern Brawl',
        type: 'random',
        trigger: 'scene',
        sceneId: 'tavern',
        conditions: {
            reputation: { guard: -2 }
        },
        text: 'A group of rowdy patrons starts a fight near your table!',
        choices: [
            {
                id: 'join_fight',
                text: 'Join the brawl',
                requirements: null,
                effects: {
                    health: -10,
                    reputation: -2
                }
            },
            {
                id: 'break_up_fight',
                text: 'Try to break up the fight',
                requirements: {
                    reputation: 2
                },
                effects: {
                    health: -5,
                    reputation: 1
                }
            },
            {
                id: 'leave_tavern',
                text: 'Quickly leave the tavern',
                requirements: null,
                effects: null
            }
        ]
    },
    guard_patrol: {
        id: 'guard_patrol',
        name: 'Guard Patrol',
        type: 'periodic',
        trigger: 'time',
        time: 'afternoon',
        conditions: {
            location: 'intro'
        },
        text: 'A squad of guards marches through the square on their regular patrol.',
        effects: {
            crime_rate: -0.1
        }
    },
    quest_available: {
        id: 'quest_available',
        name: 'New Quest',
        type: 'quest',
        trigger: 'reputation',
        npcId: 'barkeep',
        conditions: {
            reputation: { barkeep: 3 }
        },
        text: 'The barkeep motions you over. "I\'ve got a job that might interest you..."',
        choices: [
            {
                id: 'accept_quest',
                text: 'Listen to the job offer',
                requirements: null,
                effects: {
                    quest: 'barkeep_quest'
                }
            },
            {
                id: 'decline_quest',
                text: 'Politely decline',
                requirements: null,
                effects: {
                    reputation: -1
                }
            }
        ]
    }
}; 