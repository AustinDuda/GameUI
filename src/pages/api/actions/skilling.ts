/* imports */
import { parseCookies } from 'nookies';
import { firestore, realtimeDb, admin } from '@/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next'


/* Update player gold data */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);

  try {
    const userRef = realtimeDb.ref(`users/${body.uid}/skills`);

    console.log(userRef)
    return { test: 1 };
  } catch (error) {
    console.log(error)
    return { gold: null };
  }
}


/* Handle methods */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const response = await handlePost(req, res);
      res.send( response );
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
