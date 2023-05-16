/* imports */
import admin from '@/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next'


/* Set varibles */
const db = admin.firestore();


/* Update player gold data */
const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  let newGoldValue: number = 0;
  const body = JSON.parse(req.body);
  const snapshot: {data: any} = await db.collection("users").doc('1D8WV2tMq1MQ7wylIEAsHZYGpKv2').get();
  
  try {
    const currentPlayerGold: number = snapshot?.data().gold;
    newGoldValue = currentPlayerGold + body.data;

    await db.collection("users").doc('1D8WV2tMq1MQ7wylIEAsHZYGpKv2').update({
      gold: newGoldValue,
    });
  } catch (error) {
    console.log(`There was an error when adding gold: ${error}`);
  }

  res.send({ gold: newGoldValue });
}


/* Get player gold value */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const snapshot: {data: any} = await db.collection("users").doc('1D8WV2tMq1MQ7wylIEAsHZYGpKv2').get();

  res.send({ gold: snapshot?.data().gold });
}


/* Handle methods */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGet(req, res);
      break;
    case "PATCH":
      handlePatch(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
