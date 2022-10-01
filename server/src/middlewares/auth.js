import jwt from "jsonwebtoken";
import { TOKEN_TYPES, TOKEN_SECRETS } from "../constants";

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
    throw new Error("Invalid Token");
  }
}
/**
 * Middleware: Verifies the token and adds user field to the req object.
 * @returns
 */
export async function authenticateRequest(req, res, next) {
  try {
    const {
      headers: { authorization = "" },
    } = req;

    if (!authorization) {
      return next(new Error("No Authorization Token"));
    }

    const [tokenTag = "", token = ""] = authorization.split(" ").filter(Boolean);

    if (tokenTag === "Bearer") {
      if (!token) {
        return next(new Error("No Authorization Token"));
      }

      const user = getPayloadFromToken(token);
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
}

export default authenticateRequest;
