import { Request, Response } from 'express';
import { QueryRunner } from 'typeorm';

import { AppDataSource } from '@/database/datasource';
import { HttpStatusCode } from '@/enum/http-status-cose.enum';

import { User } from './user.entity';
import { UserService } from './user.service';

const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

const userService: UserService = new UserService(queryRunner);

export const all = async (request: Request, response: Response) => {
  try {
    const users = await userService.getUsers();
    return response.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    return response.status(HttpStatusCode.InternalServerError).json(error);
  }
};

export const one = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const user = await userService.getUserById(id);
    return response.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    return response.status(HttpStatusCode.InternalServerError).json(error);
  }
};

export const save = async (request: Request, response: Response) => {
  try {
    const { id, email, password } = request.body;
    const user = Object.assign(new User(), {
      id,
      email,
      password,
    });
    const result = await userService.createUser(user);
    return response.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    return response.status(HttpStatusCode.InternalServerError).json(error);
  }
};
export const remove = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const user = await userService.remove(id);
    return response.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    return response.status(HttpStatusCode.InternalServerError).json(error);
  }
};
