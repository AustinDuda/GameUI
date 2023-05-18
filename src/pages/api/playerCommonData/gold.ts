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

    if (!isNaN(newGoldValue)) {
      await db.collection("users").doc('1D8WV2tMq1MQ7wylIEAsHZYGpKv2').update({
        gold: newGoldValue,
      });
  
      res.status(200).send({gold: newGoldValue});
    }
  } catch (error) {
    console.log(`There was an error when adding gold: ${error}`);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}


/* Get player gold value */
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const snapshot: { data: any } = await db.collection("users").doc('1D8WV2tMq1MQ7wylIEAsHZYGpKv2').get();
    const currentPlayerGold: number = snapshot?.data().gold;

    res.send({ gold: currentPlayerGold });
  } catch (error) {
    console.log(`There was an error when fetching gold: ${error}`);
    res.status(500).send({ error: 'Internal Server Error' });
  }
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
