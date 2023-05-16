/* imports */
import { PLAYERDATATYPES } from '@/configs/enums';
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from '@/firebase/admin';
const db = admin.firestore();


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


/* update Gold */
const updateGoldValue = async (res: NextApiResponse, body: any) => {
  let newGoldValue: number = 0;
  const snapshot: {data: any} = await db.collection("users").doc('1D8WV2tMq1MQ7wylIEAsHZYGpKv2').get();
  
  try {
    newGoldValue = snapshot?.data().gold + body.data;

    await db
      .collection("users")
      .doc('1D8WV2tMq1MQ7wylIEAsHZYGpKv2')
      .update({
        gold: newGoldValue,
      });
  } catch (error) {
    console.log(`There was an error when adding gold: ${error}`);
  }

  res.send({ gold: newGoldValue });
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
        updateGoldValue(res, body);
        break;
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

  } else {
    res.status(200).json(playerData)
  }
}

