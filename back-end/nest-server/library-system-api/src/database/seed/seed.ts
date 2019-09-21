import { createConnection } from 'typeorm';
import { UserRole } from '../../users/enums/user-roles.enum';
import { Role } from '../entities/roles.entity';
import { User } from '../entities/users.entity';

const main = async () => {

  const connection = await createConnection();
  const roleRepo = connection.getRepository(Role);
  const userRepo = connection.getRepository(User);

  const admin = roleRepo.create({
    name: UserRole[UserRole.Admin],
  });
  const adminRole = await roleRepo.save(admin);
  const basic = await roleRepo.create({
    name: UserRole[UserRole.Basic],
  });
  const basicRole = await roleRepo.save(basic);

  const firstAdmin = new User();
  firstAdmin.username = 'John',
  firstAdmin.password = 'test';
  firstAdmin.roles = await Promise.resolve([adminRole, basicRole]);
  firstAdmin.reviews =  Promise.resolve([]);
  firstAdmin.borrowedBooks = Promise.resolve([]);
  firstAdmin.returnedBooks = Promise.resolve([]);

  userRepo.create(firstAdmin);
  await userRepo.save(firstAdmin);

  await connection.close();

  console.log(`Data seeded successfully`);

};

main()
  .catch(console.log);
