// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PLAYERDATATYPES } from '@/configs/enums';
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
  equipment: Array<object>;
  stats: Array<object>
}

let playerData = {
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
    {name: 'shrimp', quantity: 1600}
  ]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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

