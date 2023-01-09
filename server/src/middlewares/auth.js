import jwt from "jsonwebtoken";
import { TOKEN_TYPES, TOKEN_SECRETS } from "../constants";
import TokenError from "../errors/TokenError";

/**
 * Gets payload/claims from the given token.
 * @param {String} token
 * @param {String} tokenType
 * @returns
 */
function getPayloadFromToken(token, tokenType = TOKEN_TYPES.ACCESS_TOKEN) {
  try {
    var decoded = jwt.verify(token, TOKEN_SECRETS[tokenType]);

    return decoded;
  } catch (err) {
    throw new TokenError("Invalid Token");
  }
}
/**
 * Middleware: Verifies the token and adds user field to the req object.
 * @returns
 */
export async function authenticateRequest(req, res, next) {
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization) {
      return next(new TokenError("No Authorization Token"));
    }

    const [tokenTag, token = ""] = authorization.split(" ").filter(Boolean);

    if (tokenTag === "Bearer") {
      if (!token) {
        return next(new TokenError("No Authorization Token"));
      }

      const user = getPayloadFromToken(token);
      req.user = user;
      next();
    } else {
      next(new TokenError("No Authorization Token"));
    }
  } catch (error) {
    next(error);
  }
}

export default authenticateRequest;
