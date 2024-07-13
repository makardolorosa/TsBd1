import { compare, hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
//import { Hash } from 'crypto';
import * as dotenv from 'dotenv';
import { sign, SignOptions } from 'jsonwebtoken';
import { QueryRunner, Repository } from 'typeorm';

import { User } from '@/domain/user/user.entity';
import { AuthDto } from '@/dtos/auth.dto';
import { HttpStatusCode } from '@/enum/http-status-cose.enum';
import { APIResponce } from '@/interfaces/api.response';
import { AuthResponse } from '@/interfaces/auth.response';
import { CustomTokenOptions } from '@/interfaces/custon-token-options';

dotenv.config();

export class AuthService {
  userRepo: Repository<User> = null;
  constructor(private queryRunner: QueryRunner) {
    this.userRepo = this.queryRunner.manager.getRepository(User);
  }

  async register(userData: User): Promise<APIResponce<User>> {
    const response: APIResponce<User> = {
      result: null,
      error: undefined,
    };

    const user = await this.userRepo.findOne({
      where: {
        email: userData.email,
      },
    });
    //console.log(user);
    if (user) {
      response.error = {
        message: 'This user already exist',
        status: HttpStatusCode.BadRequest,
      };
      return response;
    }

    const newUser = plainToClass(User, userData);
    newUser.password = await hash(newUser.password, parseInt(process.env.SALT));
    console.log(newUser);
    await this.userRepo.save(newUser);
    response.result = newUser;

    return response;
  }

  async login(userData: AuthDto): Promise<APIResponce<AuthResponse>> {
    const response: APIResponce<AuthResponse> = {
      result: null,
      error: undefined,
    };

    const user = await this.userRepo.findOne({
      where: {
        email: userData.email,
      },
    });
    if (!user || !(await compare(userData.password, user.password))) {
      response.error = {
        message: 'Username or password is incorrect',
        status: HttpStatusCode.BadRequest,
      };
    }

    const customToken: CustomTokenOptions = {
      expiry: '1h',
      payload: {
        userId: user.id,
        email: user.email,
      },
      secrete: process.env.SECRET_KEY,
      userId: user.id,
    };

    const result: AuthResponse = {
      user: user,
      accesToken: await this.generateAccessToken(customToken),
    };
    response.result = result;
    return response;
  }

  async generateToken(
    customToken: CustomTokenOptions
  ): Promise<APIResponce<string>> {
    const response: APIResponce<string> = {
      result: null,
      error: undefined,
    };
    const signOption: SignOptions = {
      expiresIn: customToken.expiry,
      audience: customToken.userId,
    };

    if (!customToken.secrete || customToken.secrete === '') {
      throw new Error('secrete key cant be null');
    }
    const token = sign(customToken.payload, customToken.secrete, signOption);
    response.result = token;
    return response;
  }

  async generateAccessToken(customToken: CustomTokenOptions): Promise<string> {
    const response = await this.generateToken(customToken);
    return response.result;
  }
}
