// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  skills: object
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ 
    skills: {
      woodcutting: {xp: 1000},
      mining: {xp: 0},
      fishing: {xp: 0},
    }
  })
}

/*
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const requestMethod = req.method;
  const body = JSON.parse(req.body);
  switch (requestMethod) {
    case 'POST':
      res.status(200).json({ skills: body })
    default:
      res.status(200).json({ 
        skills: [
          {id:1, title: 'woodcutting', xp: 0},
          {id:2, title: 'mining',xp: 0},
          {id:3, title: 'fishing',xp: 0},
          ]
      })
  }
}*/