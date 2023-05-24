/* imports */
import { realtimeDb } from '@/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next'


/* Update player gold data */
const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  
  try {
    if (body.data == 0) {
      const snapshot = await realtimeDb.ref(`users/${body.uid}`).once('value');
      const currentPlayerGold = snapshot.val().gold;
      
      return { gold: currentPlayerGold};
    } 
  } catch (error) {
    return { gold: error};
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
