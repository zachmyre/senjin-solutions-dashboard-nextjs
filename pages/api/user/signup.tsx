import clientPromise from "../../../utils/mongodb/database";
import bcrypt from "bcryptjs";

export default async (req: any, res: any) => {
  const saltRounds = 12;
  const client = await clientPromise;

  const db = client.db("senjin-solutions");
  const collection = db.collection("users");
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (!err) {
      collection
        .insertOne({
          email: req.body.email,
          name: req.body.name,
          password: hash,
          createdAt: new Date(),
        })
        .then((user: any) => {
          res.status(200).send({ message: "User created successfully!" });
        });
    } else {
      res.status(400).send({ message: err });
    }
  });
};
