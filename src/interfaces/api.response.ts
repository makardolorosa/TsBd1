import { APIError } from './api.error';

export interface APIResponce<T> {
  result: T;
  error: APIError;
}
