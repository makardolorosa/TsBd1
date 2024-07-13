export interface CustomTokenOptions {
  userId: string;
  payload: CustomPayLoad;
  expiry: string;
  secrete: string;
}

export interface CustomPayLoad {
  userId: string;
  email: string;
}
