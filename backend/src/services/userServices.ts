import { User } from '@entities/User';
import { Repository } from 'typeorm';
import dataSource from '@config/database';
import bcrypt from 'bcrypt';

export async function getUserByID(userID: string): Promise<User | null> {
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

export async function getUserByEmail(email: string): Promise<User | null> {
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

export async function createUser(user: User): Promise<User | null> {
  // update user password to hashed version
  user.password = await bcrypt.hash(user.password, 10);

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

export async function authenticateUser(
  email: string,
  plainTextPassword: string,
): Promise<User | null> {
  // NOTE: the row information (the user) is returned by `getUserByEmail`
  //  (if a user with the provided email exists),
  //  and then, using bcrypt, the provided password is compared
  //  with the stored hashed password (no fetching of the password is done here).
  //  either way, frontend receives the same message if the user is not found
  //  or the password is incorrect.

  // find user by email
  const user = await getUserByEmail(email);

  // check if user exists
  if (!user) {
    return null;
  }

  // compare the provided password with the stored hashed password
  if (!(await bcrypt.compare(plainTextPassword, user.password))) {
    return null;
  }

  // password matches, return user
  return user;
}
