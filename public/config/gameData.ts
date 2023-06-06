type ActionTypes = {
    xp: number,
    name: string,
    drops: string,
    levelReq: number,
    lootTableKey: string,
}

type SkillDataTypes = {
    actions: ActionTypes[]
}

type SkillTypes = {
    [key: string]: SkillDataTypes
}

export const skillData: SkillTypes = {
    woodcutting: {
        actions: [
            {name: 'Pine Tree', levelReq: 1, xp: 10, drops: 'Pine Log', lootTableKey: 'pineTree'},
            {name: 'Oak Tree', levelReq: 10, xp: 15, drops: 'Oak Log', lootTableKey: 'oakTree'},
        ]
    },
    mining: {
        actions: [
            {name: 'Copper Deposit', levelReq: 1, xp: 10, drops: 'Copper Ore', lootTableKey: 'copperOre'},
            {name: 'Tin Deposit', levelReq: 1, xp: 15, drops: 'Tin Ore', lootTableKey: 'tinOre'},
        ]
    },
    fishing: {
        actions: [
            {name: 'Shrimp', levelReq: 1, xp: 10, drops: 'Shrimp', lootTableKey: 'shrimp'},
            {name: 'Sardine', levelReq: 1, xp: 15, drops: 'Tin Ore', lootTableKey: 'sardine'},
        ]
    }
};


export const lootTable = {
    pineTree: {
        rarity: 10000,
        table: [{id: 'PineLog', chance: 3500}, {id: 'TreeSpirit', chance: 100}]
    },
    oakTree: {
        rarity: 10000,
        table: [{id: 'OakLog', chance: 3500}, {id: 'TreeSpirit', chance: 100}]
    },
    copperOre: {
        rarity: 10000,
        table: [{id: 'CopperOre', chance: 3500}, {id: 'RockSpirit', chance: 100}]
    },
    tinOre: {
        rarity: 10000,
        table: [{id: 'TinOre', chance: 3500}, {id: 'RockSpirit', chance: 100}]
    },
    shrimp: {
        rarity: 10000,
        table: [{id: 'Shrimp', chance: 3500}, {id: 'WaterSpirit', chance: 100}]
    },
    sardine: {
        rarity: 10000,
        table: [{id: 'Sardine', chance: 3500}, {id: 'WaterSpirit', chance: 100}]
    },
}