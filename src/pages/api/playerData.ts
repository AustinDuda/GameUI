// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  ]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    let newPlayerData = playerData;
    const body = JSON.parse(req.body);

    if (body.key in playerData) {
      newPlayerData = {...playerData, [body.key]: body.data};
      playerData = newPlayerData;
    }

    res.status(201).json(playerData);
  } else {
    res.status(200).json(playerData)
  }
}

