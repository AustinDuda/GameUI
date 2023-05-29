/* imports */
import { realtimeDb } from '@/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next'


/* Update player gold data */
const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  
  try {
      const snapshot = await realtimeDb.ref(`users/${body.uid}`).once('value');
      const currentPlayerGold = snapshot.val().skills;

      return { skills: currentPlayerGold};
  } catch (error) {
    return { skills: error};
  }
}


/* Handle methods */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "PATCH":
      const patchResponse = await handlePatch(req, res);
      res.send(patchResponse)
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
