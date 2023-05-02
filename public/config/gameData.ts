type ActionTypes = {
    xp: number,
    name: string,
    drops: string,
    levelReq: number,
}

type ItemTypes = {
    name: string,
    speedModifier: number,
}

type SkillDataTypes = {
    actions: ActionTypes[]
    items: ItemTypes[]
}

type SkillTypes = {
    [key: string]: SkillDataTypes
}

export const skillData: SkillTypes = {
    woodcutting: {
        actions: [
            {name: 'Pine Tree', levelReq: 1, xp: 10, drops: 'Pine Log'},
            {name: 'Oak Tree', levelReq: 5, xp: 15, drops: 'Oak Log'},
        ],
        items: [
            {name: 'Bronze Hatchet', speedModifier: 0.8},
            {name: 'Iron Hatchet', speedModifier: 1.2}
        ]
    },
    mining: {
        actions: [
            {name: 'Copper Deposit', levelReq: 1, xp: 10, drops: 'Copper Ore'},
            {name: 'Tin Deposit', levelReq: 1, xp: 15, drops: 'Tin Ore'},
        ],
        items: [
            {name: 'Bronze Pickaxe', speedModifier: 0.8},
            {name: 'Iron Pickaxe', speedModifier: 1.2}
        ]
    },
    fishing: {
        actions: [
            {name: 'Shrimp', levelReq: 1, xp: 10, drops: 'Shrimp'},
            {name: 'Sardine', levelReq: 1, xp: 15, drops: 'Tin Ore'},
        ],
        items: [
            {name: 'Fishing Net', speedModifier: 0.8},
            {name: 'Fishing Rod', speedModifier: 1.2}
        ]
    }
};