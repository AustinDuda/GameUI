// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  skills: object
}

let skills = [
  {name:'woodcutting', xp: 1000},
  {name:'mining', xp: 0},
  {name:'fishing', xp: 0},
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const newSkillsData = req.body;

    if (newSkillsData.length > 0) {
      skills = JSON.parse(newSkillsData);
    }
    res.status(201).json(newSkillsData);
  } else {
    res.status(200).json({skills})
  }
}

