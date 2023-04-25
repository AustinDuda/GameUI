export type ActionTypes = {
    xp: number,
    name: string,
    drops: string,
    levelReq: number,
}

export type SkillDataTypes = {
    actions: ActionTypes
}

export type SkillTypes = {
    [key: string]: SkillDataTypes
}

export const skillData = {
    woodcutting: {
        actions: [
            {name: 'Pine Tree', levelReq: 1, xp: 10, drops: 'Pine Log'},
            {name: 'Oak Tree', levelReq: 5, xp: 10, drops: 'Oak Log'},
        ]
    },
    mining: {
        actions: [
            {name: 'Copper Deposit', levelReq: 1, xp: 10, drops: 'Copper Ore'},
            {name: 'Tin Deposit', levelReq: 1, xp: 10, drops: 'Tin Ore'},
        ]
    },
    fishing: {
        actions: [
            {name: 'Shrimp', levelReq: 1, xp: 10, drops: 'Shrimp'},
            {name: 'Sardine', levelReq: 1, xp: 10, drops: 'Tin Ore'},
        ]
    }
};