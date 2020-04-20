//port
process.env.PORT = process.env.PORT || 4000;

//jwt expiration
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;

//seed
process.env.SEED = process.env.SEED || "seed-secret";

//client id
process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  "653031729607-3d0esm0q7qcpnb249vdaiv4i6jtrkacr.apps.googleusercontent.com";

// endpoint = '/api';

const config = {
  endpoint: "/api",
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000
};

module.exports = config;
