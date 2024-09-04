import { APIClass } from 'aws-amplify';
import store from '../redux/store';
import { MM_BACKEND_URL } from './const';

export const generateHeaders = () => {
  const { jwt } = store.getState().auth;
  const authHeader = jwt ? { Token: jwt } : {};
  return { 'Content-Type': 'application/json', ...authHeader } as HeadersInit_;
};

class Api {
  #origin: string;
  #prefix?: string;

  constructor(origin: string, prefix?: string) {
    this.#origin = origin;
    this.#prefix = prefix;
  }

  async get(endpoint: string) {
    const url = `${this.#origin}${this.#prefix ?? ''}${endpoint}`;
    const headers = generateHeaders();
    const response = await fetch(url, { headers });
    const { message, status, ...err } = await response.json();
    if (!status) throw new Error((err.detail?.msg ?? err.detail) + `\n${url}`);
    if (status !== 'Success') throw new Error(message + `\n${url}`);
    return message;
  }

  async post(endpoint: string, data?: Record<string, any>) {
    const url = `${this.#origin}${this.#prefix ?? ''}${endpoint}`;
    const headers = generateHeaders();
    const body = data ? JSON.stringify({ ...data }) : undefined;
    const response = await fetch(url, { method: 'POST', body, headers });
    const { message, status, ...err } = await response.json();
    if (!status) throw new Error((err.detail?.msg ?? err.detail) + `\n${url}`);
    if (status !== 'Success') throw new Error(message + `\n${url}`);
    return message;
  }
}

class Router {
  event: Api;
  user: Api;
  poap: Api;

  constructor(origin: string) {
    this.event = new Api(origin, '/event');
    this.user = new Api(origin, '/user');
    this.poap = new Api(origin, '/poap');
  }
}

export default new Router(`${MM_BACKEND_URL}/api`);
