import { createConnection } from 'typeorm';
import { UserRole } from '../../users/enums/user-roles.enum';
import { Role } from '../entities/roles.entity';
import { User } from '../entities/users.entity';
import { Book } from '../entities/books.entity';
import { Review } from '../entities/reviews.entity';
import bcrypt from 'bcryptjs';

const main = async () => {

  const connection = await createConnection();
  const roleRepo = connection.getRepository(Role);
  const userRepo = connection.getRepository(User);
  const bookRepo = connection.getRepository(Book);
  const reviewRepo = connection.getRepository(Review);

  const admin = roleRepo.create({
    name: UserRole[UserRole.Admin],
  });
  const adminRole = await roleRepo.save(admin);
  const basic = roleRepo.create({
    name: UserRole[UserRole.Basic],
  });
  const basicRole = await roleRepo.save(basic);

  const firstAdmin = new User();
  firstAdmin.username = 'John',
  firstAdmin.password = await bcrypt.hash('test', 10);
  firstAdmin.roles = [adminRole, basicRole];
  firstAdmin.reviews =  Promise.resolve([]);
  firstAdmin.borrowedBooks = Promise.resolve([]);
  firstAdmin.returnedBooks = Promise.resolve([]);

  userRepo.create(firstAdmin);
  const user = await userRepo.save(firstAdmin);

  const book = bookRepo.create({
    title: 'Liber Primus',
    author: 'Cicada',
    year: '2005'
  });
  book.reviews = Promise.resolve([]);
  book.borrowedBy = Promise.resolve(user);
  const savedBook = await bookRepo.save(book);

  user.borrowedBooks = Promise.resolve([savedBook]);
  const saveduser = await userRepo.save(user);

  const review = reviewRepo.create({
    content: 'Very good book'
  });

  review.book = Promise.resolve(savedBook);
  review.user = Promise.resolve(saveduser);

  const savedReview = await reviewRepo.save(review);

  await connection.close();

  console.log(`Data seeded successfully`);

};

main()
  .catch(console.log);
