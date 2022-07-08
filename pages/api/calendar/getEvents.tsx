import clientPromise from "../../../utils/mongodb/database";

export default async (req: any, res: any) => {
  const client = await clientPromise;

  const db = client.db("senjin-solutions");
  const collection = db.collection("calendar_events");
  let events: any[] = [];
  const eventRequest = await collection
    .find({ user_id: req.body.user_id })
    .forEach((e: any) => {
      events.push({
        id: e._id,
        title: e.title,
        allDay: true,
        start: new Date(e.start),
        end: new Date(e.start),
      });
    });
  return res.status(200).send({ message: events });
};
