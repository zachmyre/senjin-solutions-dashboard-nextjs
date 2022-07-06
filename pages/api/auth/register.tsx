import clientPromise from "../../../utils/mongodb/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY: any = process.env.JWT_SECRET;
const API_SECRET_KEY: any = process.env.JWT_API_SECRET;

export default async (req: any, res: any) => {
  const saltRounds = 12;
  const client = await clientPromise;

  const options = { upsert: true, new: true };

  const db = client.db("senjin-solutions");
  const collection = db.collection("users");
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (!err) {
      collection
        .insertOne(
          {
            email: req.body.email,
            name: req.body.name,
            password: hash,
            createdAt: new Date(),
          },
          options
        )
        .then((user: any) => {
          let tokenData = jwt.sign(
            {
              _id: user.insertedId.toString(),
              email: req.body.email,
              name: req.body.name,
            },
            SECRET_KEY,
            {
              expiresIn: "7d",
            }
          );
          return res.status(200).send({ message: tokenData });
        });
    } else {
      res.status(400).send({ message: err });
    }
  });
};
