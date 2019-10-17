import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Book } from './books.entity';
import { Vote } from './votes.entity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('nvarchar', { default: '' } )
    public content: string;

    @OneToMany(type => Vote, votes => votes.review)
    
    public votes: Promise<Vote[]>;

    @Column({ type: 'boolean', default: false })
    public isDeleted: boolean;

    @CreateDateColumn({type: 'timestamp'})
    public createdOn: Date;

    @ManyToOne(type => User, user => user.reviews)
    public user: Promise<User>;

    @ManyToOne(type => Book, book => book.reviews)
    public book: Promise<Book>;
}
