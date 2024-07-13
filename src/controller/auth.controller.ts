import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

import { AppDataSource } from '@/database/datasource';
import { User } from '@/domain/user/user.entity';
import { AuthDto } from '@/dtos/auth.dto';
import { HttpStatusCode } from '@/enum/http-status-cose.enum';
import { AuthService } from '@/services/auth.service';

const queryRunner = AppDataSource.createQueryRunner();
export const registerUser = async (req: Request, res: Response) => {
  try {
    await queryRunner.startTransaction();
    const user = plainToClass(User, req.body);
    const errors = await validate(user);
    if (errors.length > 0) {
      return res
        .status(HttpStatusCode.BadRequest)
        .json(errors.map((item) => item.constraints));
    }
    const authService = new AuthService(queryRunner);
    const response = await authService.register(user);
    if (response.error) {
      return res.status(HttpStatusCode.BadRequest).json(response.error);
    }
    await queryRunner.commitTransaction();
    return res.json(response.result);
  } catch (error: any) {
    return res.status(HttpStatusCode.InternalServerError).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = plainToClass(AuthDto, req.body);
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log('Im here1');
      return res
        .status(HttpStatusCode.BadRequest)
        .json(errors.map((item) => item.constraints));
    }
    console.log(user);
    const authService = new AuthService(queryRunner);
    const response = await authService.login(user);
    if (response.error) {
      return res.status(HttpStatusCode.BadRequest).json(response.error);
    }
    return res.json(response.result);
  } catch (error: any) {
    console.log('Im here');
    return res.status(HttpStatusCode.InternalServerError).json(error);
  }
};
