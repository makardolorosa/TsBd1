import { HttpStatusCode } from '@/enum/http-status-cose.enum';

export interface APIError {
  message: string;
  status: HttpStatusCode;
}
