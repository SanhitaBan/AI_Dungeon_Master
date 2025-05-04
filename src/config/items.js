export const items = {
    health_potion: {
        id: 'health_potion',
        name: 'Health Potion',
        description: 'A red potion that restores 20 health points.',
        type: 'consumable',
        value: 50,
        effects: {
            health: 20
        }
    },
    gold_coin: {
        id: 'gold_coin',
        name: 'Gold Coin',
        description: 'A shiny gold coin worth 1 gold piece.',
        type: 'currency',
        value: 1
    },
    mysterious_artifact: {
        id: 'mysterious_artifact',
        name: 'Mysterious Artifact',
        description: 'An ancient artifact with strange markings. Its purpose is unknown.',
        type: 'quest',
        value: 1000
    },
    tavern_key: {
        id: 'tavern_key',
        name: 'Tavern Key',
        description: 'A key to the back room of the tavern.',
        type: 'key',
        value: 0
    },
    merchant_ledger: {
        id: 'merchant_ledger',
        name: 'Merchant Ledger',
        description: 'A book containing the merchant\'s transactions.',
        type: 'quest',
        value: 0
    },
    cloak: {
        id: 'cloak',
        name: 'Cloak',
        description: 'A simple cloak that provides basic protection from the elements.',
        type: 'armor',
        value: 10,
        defense: 1
    },
    dagger: {
        id: 'dagger',
        name: 'Dagger',
        description: 'A small, sharp blade suitable for close combat.',
        type: 'weapon',
        value: 15,
        damage: 5
    },
    torch: {
        id: 'torch',
        name: 'Torch',
        description: 'A wooden torch that provides light in dark places.',
        type: 'tool',
        value: 5
    },
    bread: {
        id: 'bread',
        name: 'Bread',
        description: 'A loaf of fresh bread that restores 5 health points.',
        type: 'consumable',
        value: 2,
        effects: {
            health: 5
        }
    },
    ale: {
        id: 'ale',
        name: 'Ale',
        description: 'A mug of frothy ale that temporarily boosts confidence.',
        type: 'consumable',
        value: 3,
        effects: {
            reputation: 1
        }
    }
}; 