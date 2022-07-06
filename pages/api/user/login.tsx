import clientPromise from "../../../utils/mongodb/database";
import bcrypt from "bcryptjs";

export default async (req: any, res: any) => {
  const client = await clientPromise;

  const db = client.db("senjin-solutions");
  const collection = db.collection("users");
  collection.findOne({ email: req.body.email }).then((user: any) => {
    if (!user) {
      res.status(400).send({ message: "User does not exist!" });
      return;
    }

    bcrypt.compare(req.body.password, user.password, (err, data) => {
      if (err) {
        res.status(400).send({ message: err });
        return;
      }

      if (data) {
        res.status(200).send({ message: user });
        return;
      } else {
        res.status(401).send({ message: "Invalid credentials." });
        return;
      }
    });
  });
};
