import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { Book } from './books.entity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('nvarchar', { default: '' } )
    public content: string;

    @ManyToOne(type => User, user => user.reviews)
    public user: Promise<User>;

    @ManyToOne(type => Book, book => book.reviews)
    public book: Promise<Book>;
}
