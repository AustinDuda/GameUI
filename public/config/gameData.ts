type ActionTypes = {
    xp: number,
    name: string,
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
            {name: 'Pine Tree', levelReq: 1, xp: 10, lootTableKey: 'pineTree'},
            {name: 'Oak Tree', levelReq: 10, xp: 15, lootTableKey: 'oakTree'},
        ]
    },
    mining: {
        actions: [
            {name: 'Copper Deposit', levelReq: 1, xp: 10, lootTableKey: 'copperOre'},
            {name: 'Tin Deposit', levelReq: 1, xp: 15, lootTableKey: 'tinOre'},
        ]
    },
    fishing: {
        actions: [
            {name: 'Shrimp', levelReq: 1, xp: 10, lootTableKey: 'shrimp'},
            {name: 'Sardine', levelReq: 1, xp: 15, lootTableKey: 'sardine'},
        ]
    }
};


export const lootTable = {
    pineTree: {
        rarity: 10000,
        table: [{id: 'pineLog', chance: 3500}, {id: 'treeSpirit', chance: 100}]
    },
    oakTree: {
        rarity: 10000,
        table: [{id: 'oakLog', chance: 3500}, {id: 'treeSpirit', chance: 100}]
    },
    copperOre: {
        rarity: 10000,
        table: [{id: 'copperOre', chance: 3500}, {id: 'rockSpirit', chance: 100}]
    },
    tinOre: {
        rarity: 10000,
        table: [{id: 'tinOre', chance: 3500}, {id: 'rockSpirit', chance: 100}]
    },
    shrimp: {
        rarity: 10000,
        table: [{id: 'shrimp', chance: 3500}, {id: 'waterSpirit', chance: 100}]
    },
    sardine: {
        rarity: 10000,
        table: [{id: 'sardine', chance: 3500}, {id: 'waterSpirit', chance: 100}]
    },
}