import { useContext, useEffect, useState } from "react";
import { CustomContext } from "@/context/customContext";
import itemDatabase from "@/configs/itemDatabase.json";


export const useBankHandler = () => {
    const { PlayerBankContext } = useContext(CustomContext);

    const updatePlayerBank = async (id: string, quantity: number) => {
      const itemName = itemDatabase.find(item => item.id === id)?.name || null;

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

    return {updatePlayerBank}
}