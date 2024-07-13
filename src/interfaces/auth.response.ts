import { User } from '@/domain/user/user.entity';

export interface AuthResponse {
  user: User;
  accesToken: string;
}
