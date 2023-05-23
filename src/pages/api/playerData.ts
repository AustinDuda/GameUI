/* imports */
import { PLAYERDATATYPES } from '@/configs/enums';
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '@/firebase/admin';
const db = firestore;


/* Setting types */
type Data = {
  gold: number;
  equipment: Array<{}>;
  stats: Array<{}>;
  bank: Array<{}>
}


/* temp data */
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
    {name: 'shrimp', quantity: 1600},
    {name: 'golden key', quantity: 1}
  ]
}


/* */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    switch (body.key) {
      case PLAYERDATATYPES.gold: 
        //updateGoldValue(res, body);
        break;
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

  } else {
    res.status(200).json(playerData)
  }
}

