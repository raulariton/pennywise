import { User } from '@entities/User';
import { Repository } from 'typeorm';
import dataSource from '@config/database';
import bcrypt from 'bcrypt';

export class UserController {
  // static async createUser(req: any, res: any) {}

  static async getUserByID(userID: string): Promise<User | null> {
    const userRepository: Repository<User> = dataSource.getRepository(User);

    try {
      // find user by ID
      const user = await userRepository.findOneBy({ id: userID });

      // return user if found, otherwise null
      return user || null;
    } catch (error) {
      // in case of any error such as database connection issues
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const userRepository: Repository<User> = dataSource.getRepository(User);

    try {
      // find user by email
      const user = await userRepository.findOneBy({ email: email });

      // return user if found, otherwise null
      return user || null;
    } catch (error) {
      // in case of any error such as database connection issues
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  static async createUser(user: User): Promise<User | null> {
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // update user password to hashed version
    user.password = hashedPassword;

    const userRepository: Repository<User> = dataSource.getRepository(User);

    try {
      // save the user to the database
      user = await userRepository.save(user);
      return user;
    } catch (error) {
      // in case of any error such as database connection issues
      console.error('Error creating user:', error);
      return null;
    }
  }

  static async authenticateUser(email: string, plainTextPassword: string): Promise<User | null> {
    // find user by email
    const user = await this.getUserByEmail(email);

    // check if user exists
    if (!user) {
      console.error('User not found');
      return null;
    }

    // compare the provided password with the stored hashed password
    if (!(await bcrypt.compare(plainTextPassword, user.password))) {
      console.error('Invalid password');
      return null;
    }

    // password matches, return user
    return user;
  }
}
