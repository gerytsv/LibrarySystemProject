import { createConnection } from 'typeorm';
import { Role } from '../entities/roles.entity';
import { User } from '../entities/users.entity';

const main = async () => {

  const connection = await createConnection();

  const roleRepo = connection.getRepository(Role);
  const userRepo = connection.getRepository(User);

  // Clean all data
  await roleRepo.delete({});
  await userRepo.delete({});

  await connection.close();

  console.log(`Data cleaned successfully!`);

};

main()
  .catch(console.log);
