import { signIn, signUp, generateNewTokens } from "../services/auth";

export async function authenticate(req, res, next) {
  try {
    const data = await signIn(req.body);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

export async function createNewUser(req, res, next) {
  try {
    const data = await signUp(req.body);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

export async function refreshTokens(req, res, next) {
  try {
    const data = await generateNewTokens(req.body);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
