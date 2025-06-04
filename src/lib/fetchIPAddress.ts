import axios from 'axios';

export const fetchPublicIP = async (): Promise<string | null> => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    return null;
  }
};
