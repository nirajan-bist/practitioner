import { TOKEN_TYPES } from "../constants";
import { invalidateToken } from "../modals/tokens";
import { signIn, signUp, generateNewAccessToken } from "../services/auth";
import { getPayloadFromToken } from "../utils/auth";

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
    const data = await generateNewAccessToken(req.body);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

export async function logOut(req, res, next) {
  try {
    const user = getPayloadFromToken(req.body.refreshToken, TOKEN_TYPES.REFRESH_TOKEN);
    const data = await invalidateToken(user.id);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
