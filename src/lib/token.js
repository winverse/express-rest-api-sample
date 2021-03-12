const jwt = require('jsonwebtoken');

const { User } = require('database/models');

const { SECRET_KEY, CLIENT_HOST, API_HOST } = process.env;

if (!SECRET_KEY || !CLIENT_HOST || !API_HOST) {
  throw new Error('MISSING_ENVAR');
}

const generateToken = (payload, options) => {
  const jwtOptions = {
    issure: API_HOST,
    expiresIn: '30d',
    ...options,
  };

  if (!jwtOptions.expiresIn) {
    // removes expiresIn when expiresIn is given as undefined
    delete jwtOptions.expiresIn;
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, jwtOptions, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const decodeToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

const setTokenCookie = (res, tokens) => {
  const { accessToken, refreshToken } = tokens;

  const isDev = process.env.NODE_ENV !== 'production';

  res.cookie('accsess_token', accessToken, {
    httpOnly: true,
    domain: !isDev ? CLIENT_HOST : undefined,
    expires: 1000 * 60 * 60 * 1, // 1hour
    secure: !isDev,
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    domain: !isDev ? CLIENT_HOST : undefined,
    expires: 1000 * 60 * 60 * 24 * 30, // 30day
    secure: !isDev,
  });

  res.sendStatus(200);
};

const refresh = async (res, refreshToken) => {
  try {
    const decoded = await decodeToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error('Invalid User error');
    }

    const tokens = await user.refreshUserToken(decoded.exp, refreshToken);
    setTokenCookie(res, tokens);

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const consumeToken = async (req, res, next) => {
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
  } = req.cookies;

  try {
    if (!accessToken) {
      throw new Error('No access token');
    }

    const accessTokenData = await decodeToken(accessToken);

    const { id: userId } = accessTokenData;
    const user = await User.findById(userId);

    req.user = user;

    // refresh token when life < 30mins
    const diff = accessTokenData.exp * 1000 - new Date().getTime();
    if (diff < 1000 * 60 * 30 && refreshToken) {
      await refresh(res, refreshToken);
    }
  } catch (err) {
    if (!refreshToken) return next();
    try {
      // retry...
      const user = await refresh(res, refreshToken);
      req.user = user;
    } catch (e) {
      throw new Error(e);
    }
  }

  return next();
};

module.exports = {
  generateToken,
  decodeToken,
  setTokenCookie,
  consumeToken,
};
