import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { Book } from './books.entity';

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('int', { default: 0 } )
    public votes: number;

    @Column({ type: 'boolean', default: false })
    public isDeleted: boolean;

    @ManyToOne(type => User, user => user.ratings)
    public user: Promise<User>;

    @ManyToOne(type => Book, book => book.rating)
    public book: Promise<Book>;
}
