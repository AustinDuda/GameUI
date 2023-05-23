/* imports */
import { firestore, realtimeDb } from '@/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next'


/* Set varibles */
const db = firestore;


const chestLoot = {
    goldenChest: {
        gold: 10,
        keyId: '00002'
    }
}


/* Update player gold data */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);

  const realtimeDataRef = realtimeDb.ref(`users/${body.uid}`);
    realtimeDataRef.once('value', (snapshot) => {
    const realtimeData = snapshot.val();
    console.log(realtimeData.gold)
  });


  /*firestore.collection('users').get().then((snapshot) => {
    console.log(snapshot)
  }).catch((error) => {
    console.error('Firestore error:', error);
  });*/

  /*
  const userRef = await db.collection("users").doc(body.uid);
  const snapshotBankItem = await userRef.collection('bank').doc(chestLoot.goldenChest.keyId).get();

  if (snapshotBankItem.data()) {
    const itemQuantity: number = snapshotBankItem.data()?.quantity;

    if (itemQuantity > 1) {
        await userRef.collection('bank').doc(chestLoot.goldenChest.keyId).update({
            quantity: FieldValue.increment(-1)
        });
    } else {
        await userRef.collection('bank').doc(chestLoot.goldenChest.keyId).delete();
    }

    await userRef.update({
        gold: FieldValue.increment(chestLoot.goldenChest.gold)
    });

    const newContextGoldValue = (await userRef.get()).data()?.gold + chestLoot.goldenChest.gold;
    return {gold: newContextGoldValue}
  }*/
  
  return { gold: null }
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
