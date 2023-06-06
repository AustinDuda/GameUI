import itemDatabase from "@/configs/itemDatabase.json";
import { useContext, useEffect, useState } from "react";
import { lootTable } from "../../public/config/gameData";

export const useLootHandler = () => {
    
    const getItemFromLootTable = (lootTableKey: string) => {
        const getLootTableFromData = lootTable[lootTableKey as keyof typeof lootTable];
        const roll = Math.floor(Math.random() * getLootTableFromData.rarity);
        const loot = getLootTableFromData.table.find(({ chance }) => roll < chance);
        const picked = loot ? loot.id : null;

        return picked;
    }

    return { getItemFromLootTable }
}