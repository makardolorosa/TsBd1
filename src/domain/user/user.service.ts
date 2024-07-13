import { QueryRunner, Repository } from 'typeorm';

import { User } from './user.entity';

export class UserService {
  private userRepository: Repository<User> = null;

  constructor(private queryRunner: QueryRunner) {
    this.userRepository = this.queryRunner.manager.getRepository(User);
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return 'unregistered user';
    }
    return user;
  }

  async createUser(userData: { id: string; email: string; password: string }) {
    const { id, email, password } = userData;

    const user = Object.assign(new User(), {
      id,
      email,
      password,
    });

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user doesn't exist";
    }

    await this.userRepository.remove(userToRemove);

    return 'user has been removed';
  }
}
