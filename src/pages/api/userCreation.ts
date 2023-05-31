/* Imports */
import{ realtimeDb } from '@/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';


/* Variable assignment */
const skillsCreationData = [
    {name: 'woodcutting', xp: 0},
    {name: 'mining', xp: 0},
    {name: 'fishing', xp: 0}
]


/* Post */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;

    try {
        const userRef = realtimeDb.ref(`users/${body.uid}`);
        const snapshot = await userRef.once('value');
        const userExists = snapshot.exists();

        if (!userExists) {
            await userRef.set({
                gold: 99,
                bank: [],
                skills: skillsCreationData
            });
            return { message: 'User created successfully' }
        } else {
            return {message: 'User already exists' }
        }
    } catch (error) {
        return {message: error }
    }
}


/* Handler */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method } = req;

    switch (method) {
        case "POST":
            const postStatus = handlePost(req, res);
            res.send(postStatus);
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

