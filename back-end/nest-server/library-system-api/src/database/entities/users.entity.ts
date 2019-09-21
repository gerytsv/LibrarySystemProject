import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn } from 'typeorm';
import { Role } from './roles.entity';
import { Review } from './reviews.entity';
import { Book } from './books.entity';
import { Rating } from './ratings.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type : 'nvarchar', length: 30, unique: true})
    public username: string;

    @Column({type: 'nvarchar'})
    public password: string;

    @OneToMany(type => Rating, ratings => ratings.user)
    public ratings: Promise<Review[]>;

    @OneToMany(type => Review, review => review.user)
    public reviews: Promise<Review[]>;

    @OneToMany(type => Book, book => book.borrowedBy)
    public borrowedBooks: Promise<Book[]>;

    @CreateDateColumn({type: 'timestamp'})
    public registered: Date;

    @Column({ type: 'boolean', default: false })
    public isDeleted: boolean;

    @ManyToMany(type => Role, { eager: true })
    @JoinTable()
    public roles: Role[];

    @ManyToMany(type => Book)
    @JoinTable()
    public returnedBooks: Promise<Book[]>;
}
