import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SHORT_SIGN_OPTION = {
  expiresIn: "1h"
};

const DEFAULT_LONG_SIGN_OPTION = {
  expiresIn: "2h"
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SHORT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  const accessToken = jwt.sign(payload, secret_key!, options);

  return accessToken;
}

export function signJwtRefreshToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_LONG_SIGN_OPTION
) {
  const secret_key = process.env.RESFRESH_SECRET_KEY;
  const refreshToken = jwt.sign(payload, secret_key!, options);

  return refreshToken;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token.split(" ")[1], secret_key!);

    return decoded as JwtPayload;
  } catch (error) {
    return false;
  }
}
