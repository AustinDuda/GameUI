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
    console.log(newSkillsData[0], newSkillsData.length)
    if (newSkillsData.length > 0) {
      console.log('ran')
      skills = JSON.parse(newSkillsData);
    }
    console.log(skills)
    res.status(201).json(newSkillsData);
  } else {
    res.status(200).json({skills})
  }
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