import { useContext, useEffect, useState } from "react";
import { CustomContext } from "@/context/customContext";
import { lootTable } from "../../public/config/gameData";

export const useBankHandler = () => {
    const { PlayerBankContext } = useContext(CustomContext);

    const getItemFromLootTable = async (id: string, quantity: number) => {
      const itemName = ''//itemDatabase.find(item => item.id === id)?.name || null;

      let roll = Math.floor(Math.random() * 10000);
      let picked = null;
      for (let i = 0, len = lootTable.OakTree.length; i < len; ++i) {
          const loot = lootTable.OakTree[i];
          const {chance} = loot;
          if (roll < chance) {
              picked = loot;
              break;
          }
          roll -= chance;
      }

      try {
        PlayerBankContext.setBank(prevBank => {
          const existingItemInBank = prevBank.find(obj => obj.id === id);

          if (existingItemInBank) {
            return prevBank.map(obj => {
              if (obj.id === id) {
                return { ...obj, quantity: obj.quantity + quantity };
              }
              return obj;
            });
          }
          
          if (itemName == null) { return [...prevBank] }
          return [...prevBank, { id: id, name: itemName, quantity: quantity }];
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    return {getItemFromLootTable}
}