import { AppDataSource } from "../config/configDB.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}

export async function findUserByEmail(email) {
  return await userRepository.findOneBy({ email });
}

export async function updateUser(userId, data) {
  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
  } else {
    delete data.password; 
  }

  const id = Number(userId);
  const result = await userRepository.update({ id }, data);

  const updatedUser = await userRepository.findOneBy({ id });
  if (updatedUser) {
    delete updatedUser.password;
  }
  return updatedUser;
}

export async function deleteUser(userId) {
  const id = Number(userId);
  const result = await userRepository.delete({ id });
  return result.affected > 0;
}