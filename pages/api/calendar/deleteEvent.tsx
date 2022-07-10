import { ObjectId } from "mongodb";
import clientPromise from "../../../utils/mongodb/database";

export default async (req: any, res: any) => {
  const client = await clientPromise;

  const db = client.db("senjin-solutions");
  const collection = db.collection("calendar_events");
  const eventRequest = await collection
    .findOneAndDelete({_id: new ObjectId(req.body._id)})
    .then((result: any) => {
      res.status(200).send({ message: result });
    })
    .catch((err: any) => {
      res.status(400).send({ error: err });
    });
};
