import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { Review } from './reviews.entity';
import { User } from './users.entity';
import { Rating } from './ratings.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column({ default: '' })
  public title: string;

  @Column({ default: '' })
  public author: string;

  @Column({ default: '' })
  public year: string;

  @Column({ type: 'boolean', default: true })
  public freeToBorrow: boolean;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @OneToMany(type => Rating, review => review.book)
  public rating: number;

  @OneToMany(type => Review, review => review.book)
  public reviews: Promise<Review[]>;

  @ManyToOne(type => User, user => user.borrowedBooks)
  public borrowedBy: Promise<User>;

}
