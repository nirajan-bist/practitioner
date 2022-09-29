import { Router } from "express";

const app = Router();

import * as User from "../modals/user";

app.post("/signin", async (req, res, next) => {
  const data = req.body;
  //TODO: Proper validation required!
  if (!data?.email && !data?.password) {
    return res.send("Please provide email and password!");
  }

  try {
    const user = await User.fetchByEmailAndPassword(data.email, data.password);

    if (!user) {
      //TODO: Send user not found error
      return res.status(404).send("User not found!");
    }

    res.send({ msg: `Loggeed in: ${user.email}`, user });
  } catch (e) {
    next(e);
  }
});

app.post("/signup", async (req, res, next) => {
  const data = req.body;
  try {
    const user = await User.insert(data);
    res.send({ msg: `Welcome new user: ${user.email}`, user });
  } catch (e) {
    next(e);
  }
});

export default app;
