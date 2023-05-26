/* imports */
import { realtimeDb } from '@/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next'


const itemLocalizedDatabase = {
  '0001': {name: "Oak Log"},
  '0002': {name: "Shrimp"},
  '0003': {name: "Tin Ore"}
}

/* Update player gold data */
const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  
  try {
      const snapshot = await realtimeDb.ref(`users/${body.uid}`).once('value');
      const currentPlayerGold = snapshot.val().bank;

      return { bank: currentPlayerGold};
  } catch (error) {
    return { gold: error};
  }
}


/* Handle methods */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      //const patchResponse = await handlePatch(req, res);
      res.send({});
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
