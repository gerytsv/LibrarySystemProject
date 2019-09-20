import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { User } from './users.entity';
import { Book } from './books.entity';

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('int', { default: 0 } )
    public votes: string;

    @ManyToOne(type => User, user => user.ratings)
    public ratingsByUser: Promise<User>;

    @ManyToOne(type => Book, book => book.rating)
    public ratingsOfBook: Promise<Book>;
}
