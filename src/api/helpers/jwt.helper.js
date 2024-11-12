const { default: base64url } = require('base64url');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const process = require('node:process');
const fs = require('fs');

const getPrivateKey = () => {
  const privateKeyDecoded = base64url.decode(
    process.env.PRIVATE_KEY_BASE64_SAFE
  );
  if (!privateKeyDecoded) return;
  return privateKeyDecoded;
};

const getPublicKey = () => {
  const publicKeyDecoded = base64url.decode(process.env.PUBLIC_KEY_BASE64_SAFE);
  if (!publicKeyDecoded) return;
  return publicKeyDecoded;
};

const encodeSafePemFileToBase64 = (path) => {
  const encoded = base64url.encode(fs.readFileSync(path));
  if (!encoded) return;
  return encoded;
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, getPrivateKey(), {
    algorithm: 'RS256',
    expiresIn: 15 * 60,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, getPrivateKey(), {
    algorithm: 'RS256',
    expiresIn: '7d',
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  getPublicKey,
  encodeSafePemFileToBase64,
};
