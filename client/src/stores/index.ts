import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
});

export interface BaseStore {
  resetData(): void;
}
