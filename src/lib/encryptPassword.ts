import * as CryptoJS from 'crypto-js';

// export const exes = CryptoJS.AES.decrypt('ciphertext', 'see12412edqwdcret');
// export const bytes = exes.toString(CryptoJS.enc.Utf8);

export const iv = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');

export const passwordHash = (password: string): string => {
  const fixedSalt = 'myFixedSalt';
  const keySize = 256 / 32; // 256-bit key size
  const iterations = 1000;

  const key = CryptoJS.PBKDF2(password, fixedSalt, {
    keySize,
    iterations,
  });

  // Use the derived key for encryption
  return CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  }).toString();
};
