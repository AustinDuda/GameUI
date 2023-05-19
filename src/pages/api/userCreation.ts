/* Imports */
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from '@/firebase/admin';


/* Set Varibles */
const db = admin.firestore();


/* Check if user exists */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;

    const snapshot: { data: any } = await db.collection("users").doc(body.id).get();

    if (!snapshot.data()) {
        await db.collection("users").doc(body.id).set({gold: 99})
        await db.collection("users").doc(body.id).collection("bank").add({})
    }
}


/* */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { method } = req;

    switch (method) {
        case "POST":
            handlePost(req, res);
            res.status(200).send({success: true})
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

