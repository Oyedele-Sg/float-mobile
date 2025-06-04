// @ts-ignore
import aes256 from 'aes-everywhere';

3
const PUBLIC_KEY = 'jiC55Cp9R8MOC8YX7pKAQBcSiZ2JEflovcUsfgghghk';
// const PUBLIC_KEY = `${process.env.EXPO_PUBLIC_ENCRYPTION_KEY}`;

// Function to generate a random 15-character string
export const generateNonce = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 15; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
};

// Function to encrypt data
export const encryptData = (data: string): string => aes256.encrypt(data, PUBLIC_KEY);
