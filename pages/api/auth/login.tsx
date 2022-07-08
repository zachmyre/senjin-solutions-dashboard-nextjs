import clientPromise from "../../../utils/mongodb/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY: any = process.env.JWT_SECRET;
const API_SECRET_KEY: any = process.env.JWT_API_SECRET;

export default async (req: any, res: any) => {
  const client = await clientPromise;

  const db = client.db("senjin-solutions");
  const collection = db.collection("users");
  collection.findOne({ email: req.body.email }).then((user: any) => {
    if (!user) {
      return res.status(400).send({ message: "User does not exist!" });
    }

    bcrypt.compare(req.body.password, user.password, (err, data) => {
      if (err) {
        return res.status(400).send({ message: err });
      }

      if (data) {
        const { _id, email, name } = user;
        let tokenData = jwt.sign({ _id, email, name }, SECRET_KEY, {
          expiresIn: "7 days",
        });
        return res.status(200).send({ message: tokenData });
      } else {
        return res.status(401).send({ message: "Invalid credentials." });
      }
    });
  });
};
