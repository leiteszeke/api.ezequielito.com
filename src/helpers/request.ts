import axios from 'axios';

export const HoldedApi = axios.create({
  baseURL: process.env.HOLDED_API_URL,
  headers: {
    'Content-Type': 'application/json',
    key: process.env.HOLDED_API_KEY ?? '',
  },
});
