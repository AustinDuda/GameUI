// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PLAYERDATATYPES } from '@/configs/enums';
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from '@/firebase/admin';
const storage = admin.storage();
const db = admin.firestore();

type Data = {
  gold: number;
  equipment: Array<{}>;
  stats: Array<{}>;
  bank: Array<{}>
}

let playerData = {
  gold: 1156,
  equipment: [{}],
  stats: [
    {name:'woodcutting', xp: 1000},
    {name:'mining', xp: 0},
    {name:'fishing', xp: 0},
  ],
  bank: [
    {name: 'oak log', quantity: 99},
    {name: 'copper ore', quantity: 76},
    {name: 'sardine', quantity: 608},
    {name: 'tin ore', quantity: 16},
    {name: 'shrimp', quantity: 1600},
    {name: 'golden key', quantity: 1}
  ]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    try {
      const getValues = await db
      .collection("test")
      .doc("1234")
      .get()
      
  
      console.log(getValues.data())
    } catch (error) {
      console.log(error)
    }
    


  if (req.method === 'POST') {
    let newPlayerData = playerData;
    const body = JSON.parse(req.body);

    switch (body.key) {
      case PLAYERDATATYPES.bank: 
        const getItemIndexIfExists = playerData.bank.findIndex(item => item.name === body.data.name)

        getItemIndexIfExists != -1
          ? playerData.bank[getItemIndexIfExists].quantity += body.data.quantity
          : playerData.bank = [...playerData.bank, body.data];
        break;
      case PLAYERDATATYPES.gold: 
        if (typeof body.data === 'number') {
          playerData.gold = body.data += playerData.gold;
        }
        break;
      default:
        if (body.key in playerData) {
          newPlayerData = {...playerData, [body.key]: body.data};
          playerData = newPlayerData;
        }
        break;
    }

    res.status(201).json(playerData);
  } else {
    res.status(200).json(playerData)
  }
}

